class CadastroPage {
    // Mapeia os elementos da página de cadastro
    get nome() { return cy.get('[data-testid="nome"]'); }
    get email() { return cy.get('[data-testid="email"]'); }
    get password() { return cy.get('[data-testid="password"]'); }
    get botaoCadastrar() { return cy.get('[data-testid="cadastrar"]'); }
    
    // Mapeia os elementos da mensagem de sucesso
    get mensagemSucesso() { return cy.contains('Cadastro realizado com sucesso'); }

    // Cria a ação de cadastro, usando os elementos mapeados
    cadastrarNovoUsuario(nome, email, password) {
        this.nome.type(nome);
        this.email.type(email);
        this.password.type(password);
        this.botaoCadastrar.click();
    }
}

export default CadastroPage;