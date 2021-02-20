/// <reference types="cypress" />

context('Registration page', () => {
    before(() => {
      cy.visit('http://localhost:3000/register')
    })
  
    it('the title', () => {
        cy.title().should('include', 'Githobby | Registration')
    })
  
    it('register', () => {
        cy.get('[name="name"]')
            .type('test-username', { delay: 50 })
            .should('have.value', 'test-username')

        cy.get('[name="email"]')
            .type('test@client.com', { delay: 50 })
            .should('have.value', 'test@client.com')

        cy.get('[name="password"]')
            .type('passwordS1@', { delay: 50 })
            .should('have.value', 'passwordS1@')
        
        cy.get('[name="confirm"]')
            .type('passwords1@', { delay: 50 })
            .parent().find('.invalid-feedback')
            .should('have.text', 'The Confirm Password and Password must match.')
            .parent().find('[name="confirm"]')
            .type('{del}{selectall}{backspace}')
            .should('have.value', '')
            .type('passwordS1@', { delay: 50 })
            .parent().find('.invalid-feedback')
            .should('be.empty')

        cy.get('button[type="submit"]').click()

        cy.get('form input').should('have.length', 4).should('be.disabled')
    })
  })
  