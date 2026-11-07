describe("Inicio de sesion", () => {
  beforeEach(() => {
    // Empezar limpio: la app guarda la sesion en localStorage
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.clear()
      },
    })
  })

  it("Con admin / 1234 entra y el panel de administracion es visible", () => {
    cy.get("#usuario").type("admin")
    cy.get("#clave").type("1234")
    cy.get("#btn-login").click()

    cy.get("#admin").should("be.visible")
    cy.get("#login").should("not.be.visible")
    cy.contains("h1", "Administracion de Productos").should("be.visible")
  })
})
