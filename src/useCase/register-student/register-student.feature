Feature: Register Student

  Scenario: Successfully register a student
    Given a student is not registered yet
    When the student is trying to get registered
    Then the student should be successfully registered

  Scenario: Fails to register a student
    Given a student is not registered yet
    When the student is trying to register
    And he types a wrong email
    Then the student should get an error that there was an error while trying to register

  Scenario: Fails to register a student that doesn't have a firstName
    Given a student is not registered yet
    When the student is trying to register
    And he doesn't type his firstName
    Then the student should get an error that he needs to add his firstName in order to register

  Scenario: Fails to register a student that doesn't have a lastName
    Given a student is not registered yet
    When the student is trying to register
    And he doesn't type his lastName
    Then the student should get an error that he needs to add his lastName in order to register

# Scenario: Fails to create a student
#   Given a student is already registered
#   When the student is trying to register
#   Then the student should get an error that he was already registered