/// <reference types="cypress" />

describe('登录', () => {
  const username = 'jane.lane'
  const password = 'password123'

  context('表单测试', () => {

    it('登录成功', () => {
      cy.visit('http://localhost:7077/login')
      cy.get('input[name=username]').type(username)
      cy.get('input[name=password]').type(password)
      const from = cy.get('form')
      from.submit()

      cy.url().should('include', '/dashboard')
      cy.get('h1').should('contain', username)
    })

  })
})
