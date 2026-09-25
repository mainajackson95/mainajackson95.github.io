#business #business_logic #business_logic_vulnerability 

[[business logic vulnerabilities]]

- developers understanding the business domain
- avoid making implicit assumption for the end user's behavior or part of the application.
- track down all the various assumptions and make sure they match up the server side measure against them to avoid the creeping business logic vulnerabilities.
- writing code as clear as possible and make sure to add comments on sections that might be challenging to the next developer to view the code, this is best for backend since the comments are only visible on the backend but for the frontend it can be used to learn the system so be careful where you add your comments.
- Think about any side effects of dependencies that a malicious actor can use against your product/code.
- Due to the fact that most of this vulnerabilities are human error based, it is always good to analyze why the logic flow exist in the first place and how it is missed by the security/developing team, this can help in easy identification of the weaknesses in your process.