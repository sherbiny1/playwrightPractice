Feature: Ecommerce Validation
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