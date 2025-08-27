describe('API Tests', () => {

    let tokenAdmin; //token de um user admin

    before(() => {
        //gera dados para o novo user
        const now = Date.now();
        const novoAdmin = {
            nome: `User ${now}`,
            email: `user${now}@test.com`,
            password: Cypress.env('ADMIN_PASSWORD'), 
            administrador: 'true'
        };

        //cria o user admin
        cy.request({
            method: 'POST',
            url: Cypress.env('API_URL') + '/usuarios', 
            body: novoAdmin
        }).then((response) => {
            expect(response.status).to.equal(201);

            //login com o novo user para salvar o token
            cy.request({
                method: 'POST',
                url: Cypress.env('API_URL') + '/login',
                body: {
                    email: novoAdmin.email,
                    // Usa a senha do .env aqui
                    password: Cypress.env('ADMIN_PASSWORD') 
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
            url: Cypress.env('API_URL') + '/produtos'
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

        cy.request({
            method: 'POST',
            url: Cypress.env('API_URL') + '/produtos',
            headers: { Authorization: tokenAdmin },
            body: novoProduto
        }).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Cadastro realizado com sucesso');
        });
    });

    it('Procurar produto por ID', () => {
        cy.request('GET', Cypress.env('API_URL') + '/produtos').then((response) => {
            const produtoId = response.body.produtos[0]._id;
            
            cy.request({
                method: 'GET',
                url: `${Cypress.env('API_URL')}/produtos/${produtoId}`
            }).then((respostaProduto) => {
                expect(respostaProduto.status).to.equal(200);
                expect(respostaProduto.body._id).to.equal(produtoId);
            });
        });
    });
});