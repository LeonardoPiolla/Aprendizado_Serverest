class LoginPage {
    // Mapeia os elementos da página de login
    get email() { return cy.get('[data-testid="email"]'); }
    get password() { return cy.get('[data-testid="senha"]'); }
    get botaoEntrar() { return cy.get('[data-testid="entrar"]'); }

    // Cria a ação de login
    fazerLogin(email, password) {
        cy.visit('/login'); // Agora usa a URL base do cypress.config.js
        this.email.type(email);
        this.password.type(password);
        this.botaoEntrar.click();
    }
}

export default LoginPage;