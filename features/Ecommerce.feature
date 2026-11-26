Feature: Ecommerce Validation
  @Regression
  Scenario: Placing the order
    Given a login to ecommerce application with "melsherbiny193@gmail.com" and "Kakakaka123@"
    When Add "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Enter valid country " Egypt" and make sure from "melsherbiny193@gmail.com" then place the order
    Then Verify order is present in the orderHistory

  @Validation
  # @foo we can put in one feature more than one tag
  Scenario Outline: Placing the order
    #to make more than one test data u must make outline
    Given a login to ecommerce2 application with "<userName>" and "<Password>"
    Then Verify Error message is displayed
    Examples:
      | userName                 | Password     |
      | melsherbiny193@gmail.com | Kakakaka123@ |
      | abc12@ffsfsfs.com        | adadadr@     |