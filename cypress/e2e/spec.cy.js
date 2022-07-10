/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Pekka Puupää',
      username: 'peksi',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('peksi')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Pekka Puupää logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('peksi')
      cy.get('#password').type('vääräsala275sank7a')
      cy.get('#login-button').click()

      cy.get('html').should('not.contain', 'Pekka Puupää logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'peksi', password: 'salasana' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#author').type('Testi Bloggaaja')
      cy.get('#title').type('Testausblogi')
      cy.get('#url').type('www.testi.et')
      cy.get('#save-button').click()
      cy.contains('Testausblogi Testi Bloggaaja')
    })

    it('Created blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#author').type('Testi Bloggaaja')
      cy.get('#title').type('Testausblogi')
      cy.get('#url').type('www.testi.et')
      cy.get('#save-button').click()
      cy.get('#like-button').click()
      cy.contains('Bloggaaja 1')
      cy.get('#like-button').click()
      cy.contains('Bloggaaja 2')
    })

    it('Created blog can be deleted', function() {
      cy.contains('new blog').click()
      cy.get('#author').type('Testi Bloggaaja')
      cy.get('#title').type('Testausblogi')
      cy.get('#url').type('www.testi.et')
      cy.get('#save-button').click()
      setTimeout(5000)
      cy.get('#delete-button').click()
      cy.contains('deleted blog')
    })
  })
})