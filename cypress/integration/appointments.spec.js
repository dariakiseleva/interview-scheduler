describe("Appointments", () => {
  beforeEach(() => {
    //Reset server, visit the page and make sure it has the required day
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");
    cy.contains("Monday");

  });

  it("should book an interview", () => {

    //Click button to add appointment
    cy.get("[alt=Add]").first().click();

    //Type the name of the student
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //Clicks on specific interviewer to make a choice
    cy.get("[alt='Sylvia Palmer']").click();

    //Click the save button
    cy.contains("Save").click();

    //Make sure the correct information is displayed in the Show component
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


  it("should edit an interview", () => {
    //Click the Edit button
    cy.get("[alt=Edit]").first().click({ force: true });
  
    //Type in a new student and choose a new interviewer
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
  
    //Save
    cy.contains("Save").click();
  
    //Make sure the right information displays in the Show component
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  

  it("should cancel an interview", () => {
    //Click the delete button
    cy.get("[alt=Delete]").click({ force: true });
    //Click the confirm button
    cy.contains("Confirm").click();
    //"Deleting" should display and then disappear
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    //The appointment we deleted should not exist anymore
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
  

});