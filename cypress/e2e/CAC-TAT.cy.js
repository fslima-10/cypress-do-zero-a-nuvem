describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() =>{
   cy.visit('src/index.html')

   //Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

  }) 
   it('verifica o título da aplicação', () => {
   
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    
  })
  it('preenche os campos obrigatórios e envia o formulário.', () => {
    cy.get('#firstName').type('Fabio')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('fabio@gmail.com')
    cy.get('#phone').type('teste').should('have.value','')
    cy.get('#phone').type('11996969857')
   
    
    cy.get('#open-text-area').type('Testando envio de mensagem', { delay: 50 });
    cy.get('.button').click();
    
    cy.get('.success').should('be.visible','Mensagem enviada com sucesso.')
  })
  it('Telefone não preenchido', () => {
    cy.get('#firstName').type('Fabio')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('fabio@gmail.com')
    cy.get('#open-text-area').type('Testando envio de mensagem', { delay: 50 });
    cy.get('#phone-checkbox').check()
    cy.get('.button').click();

   // cy.get('.error').should('have.text','Valide os campos obrigatórios!')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Fabio')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('fabio.com')
    cy.get('#phone').type('11996969857')
    cy.get('#open-text-area').type('Testando envio de mensagem', { delay: 50 });
    cy.get('.button').click();   
    cy.get('.error').should('be.visible')
    
})
  it('usando a função clear', () => {
    cy.get('#firstName')
    .type('Fabio')
    .should('have.value','Fabio')

    cy.get('#firstName')
    .clear()
    .should('have.value','')
  }) 
  it('envia o formuário com sucesso usando um comando customizado',() => {
    const data = {
      firstName: 'Fabio',
      lastName: 'Lima',
      email: 'fabio@gmail.com',
      Text: 'teste.'
    }
    
    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')
    //cy.get('.success').should('have.text','\n      Mensagem enviada com sucesso.\n    ')

  })
  it('Usando o cy.contains', () => {
    //selecionando campo do tipo combobox
    cy.get('select').select(2)
    cy.get('#product').select(1)
    cy.get('select').select('youtube')
    cy.contains('button','Enviar')

  })
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select')
    .select('YouTube')
    .should('have.value','youtube')
  })
  it('Seleciona um produto (mentoria) pelo seu value', () => {
     cy.get('#product')
    .select('mentoria')
    .should('have.value','mentoria')
  })
  it('Selecionando input radio', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked.value','feedback')
  })
  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .each(arrayElementos => { //each recebe uma função array
      cy.wrap(arrayElementos)//wrap pega cada elemento do array
      .check()
      .should('be.checked')
      
    })
  })
    it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures' , () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
       
        .should(input => {
          //console.log(input)
          console.log(input[0].files[0].name)
          expect(input[0].files[0].name).to.equal('example.json')
          
      })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
      })
    })
  it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alia', () => {
    cy.fixture('example.json').as('exampleFile')
      cy.get('#file-upload')
      .selectFile('@exampleFile')
  })
})