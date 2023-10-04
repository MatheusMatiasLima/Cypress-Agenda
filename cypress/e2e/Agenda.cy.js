describe('Agenda', () => {
  
  beforeEach( () => {
    cy.visit('https://tarefas-fc129.web.app/home')
  })
  
  it('Crair tarefas "Comprar Arroz" e "Comprar Feijão"', () => {

    cy.get('input').should('have.attr', 'placeholder', 'Ex. Tomar vacina').type('Comprar Arroz');
    cy.get('.button').eq(0).click();
    cy.contains('Comprar Arroz').should('be.visible');
    
    cy.get('input').should('have.attr', 'placeholder', 'Ex. Tomar vacina').type('Comprar Feijão');
    cy.get('.button').eq(0).click();
    cy.contains('Comprar Feijão').should('be.visible');
  })
 
  it('Remover tarefa', () => {

    cy.contains('Comprar Feijão')
    .parent('ion-item')  
    .find('ion-button') 
    .click();

    cy.contains('Menu')
      .should('be.visible')
      .parent('div')
      .find('button')
      .eq(2)
      .click();
  })

  it ('Editar tarefa', () => {

    cy.contains('Comprar Arroz')
      .parent('ion-item')
      .find('ion-button')
      .click();

    cy.contains('Menu')
      .should('be.visible')
      .parent('div')
      .find('button')
      .eq(0)
      .click();

    cy.contains('Editar tarefa').should('be.visible');
    
    cy.get('#alert-input-2-0')
      .clear()
      .type('Arroz de risoto');
    
    cy.contains('button','Salvar').click();

    cy.contains('Arroz de risoto').should('be.visible');
  })

  it ('Agendar tarefa',  () => {

    cy.contains('Arroz de risoto')
      .parent('ion-item')
      .find('ion-button')
      .click();

    cy.contains('Menu')
      .should('be.visible')
      .parent('div')
      .find('button')
      .eq(1)
      .click();

    cy.contains('Agendar tarefa').should('be.visible');
    
    cy.get('input[type="date"]').focus();
    cy.realType("12")
    cy.wait(200);

    cy.get('input[type="date"]').focus();
    cy.realType("{rightarrow}");
    
    cy.realType("12");
    cy.wait(200);

    cy.get('input[type="date"]').focus();
    cy.realType("{rightarrow}{rightarrow}");
    cy.realType("2023");

    cy.get('input[type="date"]').invoke('val').should('eq', '2023-12-12');

    cy.contains('button','Salvar').click();
  })

  it('Marcar e desmarcar tarefa', ()=> {

    cy.contains('ion-label','Arroz de risoto')
      .click()
      .should('have.class', 'task-done')
      .click()
      .should('not.have.class', 'task-done');
  })

  it ('Visualizar codigo fonte', () => {
    cy.contains('a', 'Sobre').click();
    cy.contains('a', 'Código fonte').invoke('removeAttr','target', '_blanck').click();
    
    cy.origin('https://github.com', () => {
      cy.contains('Um aplicativo Web simples para gerenciamento de lista de tarefas, desenvolvido para o minicurso oferecido na CompWeek, do DCC/UFLA.')
        .should('be.visible');

    }) 
  })

  it ('Visualizar colaborador Paulo Júnior', () => {
    cy.contains('a', 'Sobre').click();
    cy.contains('a', 'Paulo Júnior').invoke('removeAttr','target', '_blanck').click();
    
    cy.origin('https://github.com', () => {
      cy.contains('Paulo Júnior')
        .should('be.visible');

    })
  })

  it ('Visualizar colaborador Paulo Vieira', () => {
    cy.contains('a', 'Sobre').click();
    cy.contains('a', 'Paulo Vieira').invoke('removeAttr','target', '_blanck').click();
    
    cy.origin('https://github.com', () => {
      cy.contains('paulorsv01')
        .should('exist');
    })
  })


  it ('Excluir todos os iguais', () => {
    
    for (let i=0; i < 5; i++) {
      cy.get('input').should('have.attr', 'placeholder', 'Ex. Tomar vacina').type('item repetido');
      cy.get('.button').eq(0).click();
      cy.contains('item repetido').should('be.visible');
    }

    cy.get('ion-item') 
    .filter(':contains("item repetido")') 
    .find('ion-button')
    .each( ($button) => {
      cy.wrap($button)
      .click();

      cy.contains('Menu')
      .should('be.visible')
      .parent('div')
      .find('button')
      .eq(2)
      .click();
    })
    .should('not.contain', 'item repetido');

  })


  
  it ('Apagar todos os itens', () => {

    cy.get('ion-reorder-group')
    .find('ion-button')
    .each( ($button) => {
      cy.wrap($button)
      .click();

      cy.contains('Menu')
      .should('be.visible')
      .parent('div')
      .find('button')
      .eq(2)
      .click();
    });
    cy.contains('Oba, minha lista de tarefas está vazia!').should('be.visible');
 
  })

  it ('reordenar itens' , () => {
    
    cy.get('input')
      .should('have.attr', 'placeholder', 'Ex. Tomar vacina')
      .type('Item A');
    cy.get('.button')
      .eq(0)
      .click();
    
    cy.contains('Item A').should('be.visible');
    
    cy.get('input')
      .should('have.attr', 'placeholder', 'Ex. Tomar vacina')
      .type('Item B');
    cy.get('.button')
      .eq(0)
      .click();
    
    cy.contains('Item B').should('be.visible');

    cy.get('.button')
      .eq(1)
      .click();
        
    cy.contains('Item A')
    .parent('ion-item')
    .find('ion-buttons')
    .then((ItemA) => {
      cy.contains('Item B')
        .parent('ion-item')
        .find('ion-buttons')
        .drag(ItemA);
    });
  })

})