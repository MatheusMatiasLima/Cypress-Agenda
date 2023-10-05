
Cypress.Commands.add ('adicionarTarefa', function (NomeDaTarefa) {
    cy.get('input').should('have.attr', 'placeholder', 'Ex. Tomar vacina').type(NomeDaTarefa);
    cy.get('.button').eq(0).click();
    
}) 

Cypress.Commands.add ('clicarIonButton', function (label) {
    cy.contains(label)
    .parent('ion-item')  
    .find('ion-button') 
    .click();
})

Cypress.Commands.add ('clicarOpcaoMenu', function (numeroDaOpcao) {
    cy.contains('Menu')
    .should('be.visible')
    .parent('div')
    .find('button')
    .eq(numeroDaOpcao)
    .click();
    
})

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

