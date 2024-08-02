describe("Task Management", () => {
  const testUser = {
    username: "testuser",
    password: "password123",
  };

  before(() => {
    // Attempt to create test user before running tests
    cy.request({
      method: "POST",
      url: "http://localhost:8080/auth/register",
      body: testUser,
      failOnStatusCode: false, // This ensures the test doesn't fail if the user already exists
    }).then((response) => {
      if (response.status === 200) {
        cy.log("Test user created successfully");
      } else if (response.status === 409) {
        cy.log("Test user already exists, proceeding with tests");
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    });
  });

  beforeEach(() => {
    cy.visit("/");
    // Simulate login
    cy.get('[data-testid="username-input"]').type(testUser.username);
    cy.get('[data-testid="password-input"]').type(testUser.password);
    cy.get('[data-testid="auth-submit-button"]').click();

    // Wait for login to complete
    cy.contains("Welcome", { timeout: 10000 }).should("be.visible");
  });

  it("allows adding, toggling, and deleting tasks", () => {
    // Add a task
    cy.get('[data-testid="task-input"]').type("E2E Test Task");
    cy.get('[data-testid="add-task-button"]').click();
    cy.contains("E2E Test Task").should("be.visible");

    // Toggle the task
    cy.contains("E2E Test Task")
      .parent()
      .find('[data-testid="toggle-task"]')
      .click();
    cy.contains("E2E Test Task").should("have.class", "line-through");

    // Delete the task
    cy.contains("E2E Test Task")
      .parent()
      .find('[data-testid="delete-task"]')
      .click();
    cy.contains("E2E Test Task").should("not.exist");
  });

  it("persists tasks after page reload", () => {
    cy.get('[data-testid="task-input"]').type("Persistent Task");
    cy.get('[data-testid="add-task-button"]').click();
    cy.reload();
    cy.contains("Persistent Task").should("be.visible");
  });

  it("allows user to log out", () => {
    // Intercept the POST /auth/logout request
    cy.intercept("POST", "/auth/logout").as("logout");

    // Ensure the welcome message is visible before logout
    cy.get('[data-testid="welcome-message"]').should("be.visible");

    // Click the logout button
    cy.get('[data-testid="logout-button"]').should("be.visible").click();

    // Wait for the logout request to complete
    cy.wait("@logout");

    // Ensure the welcome message is no longer visible
    cy.get('[data-testid="welcome-message"]').should("not.exist");

    // Check for login/auth elements that should be visible after logout
    cy.get('[data-testid="auth-submit-button"]').should("be.visible");

    // Additional checks to ensure we're logged out
    cy.get('[data-testid="username-input"]').should("be.visible");
    cy.get('[data-testid="password-input"]').should("be.visible");

    // Check local storage for token removal
    cy.window()
      .its("localStorage")
      .invoke("getItem", "token")
      .should("be.null");
  });

  it("displays error message for invalid task addition", () => {
    cy.get('[data-testid="task-input"]').clear();
    cy.get('[data-testid="task-input"]').type("   ");
    cy.get('[data-testid="add-task-button"]').click();

    // Wait for potential async operations
    cy.wait("@someRequest"); // Wait for a specific request to complete

    // Check for the error message
    cy.contains("Task title cannot be empty").should("be.visible");

    // If the above fails, log more information
    cy.on("fail", (error, runnable) => {
      if (error.message.includes("Task title cannot be empty")) {
        cy.log("Error message not found. Logging current state:");
        cy.get("body").then(($body) => {
          cy.log("Body content:", $body.text());
        });
        throw error;
      }
    });

    // Ensure the task wasn't added
    cy.contains("   ").should("not.exist");
  });

  after(() => {
    // Note: We're not deleting the test user after the tests
    // This ensures the user exists for future test runs
    // If you need to delete the user, you can uncomment the following code:
    /*
    cy.request({
      method: 'DELETE',
      url: `http://localhost:8080/auth/users/${testUser.username}`,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        cy.log('Test user deleted successfully');
      } else {
        cy.log('Failed to delete test user or user not found');
      }
    });
    */
  });
});
