class PaginaInicial {
    // Mapeia os elementos da página inicial
    get titulo() { return cy.get('h1'); }
    get listaDeCompras() { return cy.get('[data-testid="lista-de-compras"]'); }

    // Seleciona o primeiro botão para evitar o erro de múltiplos elementos
    get botaoAdicionarNaLista() { return cy.get('[data-testid="adicionarNaLista"]').first(); }

    // Cria a ação de ir para a lista de compras
    irParaListaDeCompras() {
        this.listaDeCompras.click();
    }
}

export default PaginaInicial;
