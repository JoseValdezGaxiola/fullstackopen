describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti ',
      username: 'username',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login')
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

    })

    it('fails with wrong credentials', function() {
      cy.get('#logout-button').click()
      cy.contains('login')
      cy.wait(4000)
      cy.get('#username').type('username')
      cy.get('#password').type('badpass')
      cy.get('#login-button').click()
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'username', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title: 'blog test cypress',
        author: 'testauthor',
        url: 'https://www.testo.com/',
      })
    })

  })

  describe('and several blogs exist', function () {
    beforeEach(function () {
      cy.login({ username: 'username', password: 'password' })
      cy.createBlog({
        title: 'primer ministro',
        author: 'agustin',
        url: 'https://www.testcy.com/',
      })
      cy.createBlog({
        title: 'segundo ministro',
        author: 'fuente',
        url: 'https://www.test.com/',
      })
      cy.createBlog({
        title: 'tercer ministro',
        author: 'carlos',
        url: 'https://www.testy.com/',
      })
      cy.createBlog({
        title: 'cuarto ministro',
        author: 'octavio',
        url: 'https://www.testco.com/',
      })
    })

    it('blogs can be liked', function () {
      cy.contains('segundo ministro').parent().find('#show-button').click()
      cy.get('#like-button').click()
    })
    it('blogs can be deleted', function () {
      cy.contains('primer ministro').parent().find('#show-button').click()
      cy.get('#delete-button').click()
    })

    it('blog sort function', function () {
      cy.contains('segundo ministro').parent().find('#show-button').click()
      cy.get('#like-button').click().wait(500).click().wait(500).click().wait(500)

      cy.contains('cuarto ministro').parent().find('#show-button').click()
      cy.get('#like-button').click().wait(500)

      cy.get('.blog').eq(0).should('contain', 'most voted')
      cy.get('.blog').eq(1).should('contain', 'second most votes ')
      cy.get('.blog').eq(2).should('contain', 'third')
      cy.get('.blog').eq(3).should('contain', 'fourth')

    })
  })
})