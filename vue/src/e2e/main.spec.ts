describe('Main', () => {
  it('should display title text', () => {
    cy.visit('/')
    cy.contains('div.title', 'Go | Vue 3 TSX | Vuex | Mapbox GL | Deck.gl | PostGIS 3 | Docker')
  })
})
