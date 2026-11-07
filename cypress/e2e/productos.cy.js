describe("Productos", () => {
  beforeEach(() => {
    // Empezar limpio y con sesion iniciada
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.clear()
      },
    })
    cy.get("#usuario").type("admin")
    cy.get("#clave").type("1234")
    cy.get("#btn-login").click()
    cy.get("#admin").should("be.visible")
  })

  it("Agrega un producto y aparece en la tabla", () => {
    // El catalogo inicial (productos.csv) trae 5 productos
    cy.get(".fila-producto").should("have.length", 5)

    cy.get("#nombre").type("Laptop")
    cy.get("#precio").type("5000")
    cy.get("#stock").type("3")
    cy.get("#btn-guardar").click()

    // Ahora hay 6 filas y la nueva tiene los datos correctos
    cy.get(".fila-producto").should("have.length", 7)
    cy.get(".fila-producto").last().within(() => {
      cy.get(".col-nombre").should("have.text", "Laptop")
      cy.contains("td", "Q5000")
      cy.contains("td", "3")
    })
    cy.get("#contador-productos").should("have.text", "6")
  })

  it("No permite agregar un producto con precio 0", () => {
    cy.get(".fila-producto").should("have.length", 5)

    cy.get("#nombre").type("Producto gratis")
    cy.get("#precio").type("0")
    cy.get("#stock").type("10")
    cy.get("#btn-guardar").click()

    // Muestra el mensaje de error y la tabla no cambia
    cy.get("#form-msg").should("have.text", "El precio debe ser un numero mayor que 0.")
    cy.get(".fila-producto").should("have.length", 5)
    cy.contains(".col-nombre", "Producto gratis").should("not.exist")
    cy.get("#contador-productos").should("have.text", "5")
  })
})
