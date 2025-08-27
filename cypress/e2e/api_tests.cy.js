describe('API Tests', () => {

    let tokenAdmin; //token de um user admin

    before(() => {
        //geração de dados exclusivos para o user admin
        const now = Date.now();
        const novoAdmin = {
            nome: `Admin Test ${now}`,
            email: `admin${now}@test.com`,
            password: 'test123',
            administrador: 'true'
        };

        //cria o user admin
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: novoAdmin
        }).then((response) => {
            expect(response.status).to.equal(201);

            //login com o novo user para salvar o token
            cy.request({
                method: 'POST',
                url: 'https://serverest.dev/login',
                body: {
                    email: novoAdmin.email,
                    password: novoAdmin.password
                }
            }).then((loginResponse) => {
                expect(loginResponse.status).to.equal(200);
                tokenAdmin = loginResponse.body.authorization;
            });
        });
    });

    it('Listagem dos itens cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'https://serverest.dev/produtos'
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.quantidade).to.be.greaterThan(0);
        });
    });

    it('Cadastro de um novo produto', () => {
        const now = Date.now();
        const novoProduto = {
            nome: `Novo Produto ${now}`,
            preco: 123,
            descricao: 'Novo Produto criado para teste',
            quantidade: 12
        };

        //Token salvo será utilizado para a requisição
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/produtos',
            headers: { Authorization: tokenAdmin },
            body: novoProduto
        }).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Cadastro realizado com sucesso');
        });
    });

    it('Procurar produto por ID', () => {
        //lista todos os produtos e busca um ID
        cy.request('GET', 'https://serverest.dev/produtos').then((response) => {
            const produtoId = response.body.produtos[0]._id;
            
            //utiliza o ID para buscar o produto
            cy.request({
                method: 'GET',
                url: `https://serverest.dev/produtos/${produtoId}`
            }).then((respostaProduto) => {
                expect(respostaProduto.status).to.equal(200);
                expect(respostaProduto.body._id).to.equal(produtoId);
            });
        });
    });
});