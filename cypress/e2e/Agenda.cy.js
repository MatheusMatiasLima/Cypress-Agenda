describe('Agenda', () => {
  
  beforeEach( () => {
    cy.visit('https://tarefas-fc129.web.app/home');
  })
  
  it ('Crair tarefas "Comprar Arroz" e "Comprar Feijão"', () => {

    cy.adicionarTarefa('Comprar Arroz');
    cy.contains('Comprar Arroz').should('be.visible');
    cy.adicionarTarefa('Comprar Feijão');
    cy.contains('Comprar Feijão').should('be.visible');
  })
 
  it ('Remover tarefa', () => {

    cy.clicarIonButton('Comprar Feijão');
    cy.clicarOpcaoMenu(2);
    cy.contains('Comprar Feijão').should('not.exist');

  })

  it('Editar tarefa', () => {

    cy.clicarIonButton('Comprar Arroz')
    cy.clicarOpcaoMenu(0);
    cy.contains('Editar tarefa').should('be.visible');
    cy.get('#alert-input-2-0')
      .clear()
      .type('Arroz de risoto');
    cy.contains('button','Salvar').click();
    cy.contains('Arroz de risoto').should('be.visible');

  })

  it ('Agendar tarefa',  () => {

    cy.clicarIonButton('Arroz de risoto');
    cy.clicarOpcaoMenu(1);

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
      cy.adicionarTarefa('item repetido');
    }

    cy.get('ion-item') 
    .filter(':contains("item repetido")') 
    .find('ion-button')
    .each( ($button) => {
      cy.wrap($button)
      .click();
      cy.clicarOpcaoMenu(2);
    })
    .should('not.contain', 'item repetido');

  })


  
  it ('Apagar todos os itens', () => {

    cy.get('ion-reorder-group')
    .find('ion-button')
    .each( ($button) => {
      cy.wrap($button)
      .click();

      cy.clicarOpcaoMenu(2);
    });
    cy.contains('Oba, minha lista de tarefas está vazia!').should('be.visible');
 
  })

  it ('reordenar itens' , () => {

    cy.adicionarTarefa('Item A');
    cy.contains('Item A').should('be.visible');
    cy.adicionarTarefa('Item B');
    cy.contains('Item B').should('be.visible');
        
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