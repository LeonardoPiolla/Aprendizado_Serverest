// describe('Front tests', () => {

//      let emailLogin; //salvará o login que será gerado para novo usuário

//     it('Cadastro de novo usuário com sucesso', () => {

//         //gera nome e email exclusivo
//         const now = Date.now();
//         const nome = `nome${now}`;
//         const email = `email${now}@test.com`;

//         //email gerado salvo para ser utilizado em outros test case
//         emailLogin = email;

//         //acessa a página de criar usuário
//         cy.visit('https://front.serverest.dev/cadastrarusuarios');

//         //cria o login
//         cy.get('[data-testid="nome"]').type(nome);
//         cy.get('[data-testid="email"]').type(email);
//         cy.get('[data-testid="password"]').type('test123');
//         cy.get('[data-testid="cadastrar"]').click();

//         //verifica se a mensagem de cadastro realizado foi exibida
//         cy.contains('Cadastro realizado com sucesso').should('be.visible')
//     });

//     it('Login com sucesso', () => {

//         //acessa a página de login
//         cy.visit('https://front.serverest.dev/login');

//         //faz o login
//         cy.get('[data-testid="email"]').type(emailLogin);
//         cy.get('[data-testid="senha"]').type('test123');
//         cy.get('[data-testid="entrar"]').click();

//         //verifica se foi redirecionado pra página principal, isso significa que o login ocorreu com sucesso
//         cy.get('h1').should('contain', 'Serverest');
//     });

//     it('Deve adicionar um produto à Lista de Compras', () => {

//         cy.visit('https://front.serverest.dev/login');

//         cy.get('[data-testid="email"]').type('test@test.com');
//         cy.get('[data-testid="senha"]').type('test123');
//         cy.get('[data-testid="entrar"]').click();

//         //verifica se foi redirecionado pra página principal.
//         cy.get('h1').should('contain', 'Serverest');

//         //acessa a página da Lista de Compras 
//         cy.get('[data-testid="lista-de-compras"]').click();
//         cy.get('h1').should('contain', 'Lista de Compras');

//         //volta para a página inicial
//         cy.get('[data-testid="home"]').click();

//         //adiciona um item à Lista de Compras
//         cy.get(':nth-child(1) > .card-body > div > [href="/minhaListaDeProdutos"] > [data-testid="adicionarNaLista"]').click();

//         //acessa a página de lista de compras
//         cy.get('[data-testid="lista-de-compras"]').click();

//         cy.contains('Total: 1').should('be.visible')
//     });
// });

//importa as classes
import CadastroPage from '../page_objects/cadastro.js';
import LoginPage from '../page_objects/login.js';
import InicialPage from '../page_objects/inicial.js';

//instancias das classes criadas
const cadastroPage = new CadastroPage();
const loginPage = new LoginPage();
const inicialPage = new InicialPage();

describe('Front tests', () => {

    let emailLogin; //email gerado salvo para ser utilizado em outros test case

    it('Cadastro de novo usuário com sucesso', () => {
        
        //gera nome e email exclusivo
        const now = Date.now();
        const nome = `nome${now}`;
        const email = `email${now}@test.com`;

        //email gerado salvo para ser utilizado em outros test case
        emailLogin = email;

        //acessa a página de criar usuário
        cy.visit('https://front.serverest.dev/cadastrarusuarios');

        cadastroPage.cadastrarNovoUsuario(nome, email, 'test123');

        cadastroPage.mensagemSucesso.should('be.visible');
    });

    it('Login com sucesso', () => {
        loginPage.fazerLogin(emailLogin, 'test123');

        //verifica se foi redirecionado pra página principal, isso significa que o login ocorreu com sucesso
        inicialPage.titulo.should('contain', 'Serverest');
    });

    it('Deve adicionar um produto à Lista de Compras', () => {
        loginPage.fazerLogin('test@test.com', 'test123');
        
        //verifica se foi redirecionado pra página principal
        inicialPage.titulo.should('contain', 'Serverest');

        //acessa a página da Lista de Compras e checa se foi acessada 
        inicialPage.irParaListaDeCompras();
        inicialPage.titulo.should('contain', 'Lista de Compras');

        //volta para a página inicial
        cy.get('[data-testid="home"]').click();

        //adiciona um item à Lista de Compras
        inicialPage.botaoAdicionarNaLista.click();

        //acessa a página de lista de compras e checa se o item foi adicionado
        inicialPage.irParaListaDeCompras();
        cy.contains('Total: 1').should('be.visible');
    });
});