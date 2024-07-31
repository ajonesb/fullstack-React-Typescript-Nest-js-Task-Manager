describe("Task Management", () => {
  beforeEach(() => {
    cy.visit("/");
    // Bypass authentication for E2E tests
    cy.window().its("localStorage").invoke("setItem", "token", "fake-token");
    cy.visit("/");
  });

  it("allows adding, toggling, and deleting tasks", () => {
    // Add a task
    cy.get('[data-testid="task-input"]').type("E2E Test Task");
    cy.contains("Add Task").click();
    cy.contains("E2E Test Task").should("be.visible");

    // Toggle the task
    cy.contains("E2E Test Task")
      .parent()
      .find("button")
      .contains("Toggle")
      .click();
    cy.contains("E2E Test Task").should(
      "have.css",
      "text-decoration",
      "line-through solid rgb(0, 0, 0)"
    );

    // Delete the task
    cy.contains("E2E Test Task")
      .parent()
      .find("button")
      .contains("Delete")
      .click();
    cy.contains("E2E Test Task").should("not.exist");
  });

  it("persists tasks after page reload", () => {
    // Add a task
    cy.get('[data-testid="task-input"]').type("Persistent Task");
    cy.contains("Add Task").click();

    // Reload the page
    cy.reload();

    // Check if the task still exists
    cy.contains("Persistent Task").should("be.visible");
  });

  it("allows user to log out", () => {
    cy.contains("Logout").click();
    cy.contains("Login").should("be.visible");
    cy.contains("Welcome").should("not.exist");
  });

  it("displays error message for invalid task addition", () => {
    cy.get('[data-testid="task-input"]').type("   "); // Only spaces
    cy.contains("Add Task").click();
    cy.contains("Task title cannot be empty").should("be.visible");
  });
});
