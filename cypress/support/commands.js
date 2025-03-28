Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: "Nome_Padrão",
    lastName: "SobreNome_Padrão",
    email:'email@gmail.com.padrao',
    Text: 'texto padrão'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.Text)
    cy.get('.button').click();
    
})