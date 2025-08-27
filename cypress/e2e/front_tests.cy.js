// Importa as classes dos Page Objects
import CadastroPage from '../page_objects/cadastro.js';
import LoginPage from '../page_objects/login.js';
import InicialPage from '../page_objects/inicial.js';

// Cria as instâncias das classes
const cadastroPage = new CadastroPage();
const loginPage = new LoginPage();
const inicialPage = new InicialPage();

describe('Testes de Frontend com usuário compartilhado', () => {

    let emailLogin; //salva o login que será gerado para o novo usuário

    it('Cadastro de novo usuário com sucesso', () => {
        const now = Date.now();
        const nome = `nome${now}`;
        const email = `email${now}@test.com`;

        //salva o email na variável
        emailLogin = email;

        cy.visit('/cadastrarusuarios');
        
        cadastroPage.cadastrarNovoUsuario(nome, email, Cypress.env('ADMIN_PASSWORD'));
        cadastroPage.mensagemSucesso.should('be.visible');
    });

    it('Login com sucesso', () => {
        
        loginPage.fazerLogin(emailLogin, Cypress.env('ADMIN_PASSWORD'));
        inicialPage.titulo.should('contain', 'Serverest');
    });


    it('Adiciona um produto à Lista de Compras', () => {
        
        loginPage.fazerLogin(emailLogin, Cypress.env('ADMIN_PASSWORD'));
        
        inicialPage.titulo.should('contain', 'Serverest');
        inicialPage.irParaListaDeCompras();
        inicialPage.titulo.should('contain', 'Lista de Compras');

        cy.get('[data-testid="home"]').click();
        inicialPage.botaoAdicionarNaLista.click();

        inicialPage.irParaListaDeCompras();
        cy.contains('Total: 1').should('be.visible');
    });
});