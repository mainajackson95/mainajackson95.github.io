#access #access_control #privilege #privilege_escalation 
[[target vulnerabilities]]

- who or what is authorized to perform actions or access resources.
- dependent on authentication and session management:
	- **Authentication** confirms that the user is who they say they are.
	- **Session management** identifies which subsequent HTTP requests are being made by that same user.
	- **Access control** determines whether the user is allowed to carry out the action that they are attempting to perform.
- common and often present a critical security vulnerability.
- Design and management is a complex and dynamic problem that applies business, organizational, and legal constraints to a technical implementation.
- have to be made by humans so the potential for errors is high.


### vertical access controls
#vertical_access_controls 

- mechanisms that restrict access to sensitive functionality to specific types of users.
- different types of users have access to different application functions. e.g. *an administrator might be able to modify or delete any user's account, while an ordinary user has no access to these actions.*
- more fine-grained implementations of security models designed to enforce business policies such as separation of duties and least privilege.


### horizontal access controls 
#horizontal_access_controls

- mechanisms that restrict access to resources to specific users.
- different users have access to a subset of resources of the same type. e.g. *a banking application will allow a user to view transactions and make payments from their own accounts, but not the accounts of any other user.*


### context-dependent access controls 
#context_dependent_access_controls 

- restrict access to functionality and resources based upon the state of the application or the user's interaction with it.
- prevent a user performing actions in the wrong order. e.g. *a retail website might prevent users from modifying the contents of their shopping cart after they have made payment.*


### examples

- exist when a user can access resources or perform actions that they are not supposed to be able to.


#### vertical privilege escalation

- If a user can gain access to functionality that they are not permitted to access then this is vertical privilege escalation. e.g. *if a non-administrative user can gain access to an admin page where they can delete user accounts, then this is vertical privilege escalation.*

##### unprotected functionality

- At its most basic, vertical privilege escalation arises where an application does not enforce any protection for sensitive functionality. e.g. *administrative functions might be linked from an administrator's welcome page but not from a user's welcome page.* 
- However, a user might be able to access the administrative functions by browsing to the relevant admin URL. e.g. *a website might host sensitive functionality at the following URL:*

```
https://insecure-website.com/admin
```

- This might be accessible by any user, not only administrative users who have a link to the functionality in their user interface. In some cases, the administrative URL might be disclosed in other locations, such as the `robots.txt` file:

```
https://insecure-website.com/robots.txt
```

Even if the URL isn't disclosed anywhere, an attacker may be able to use a wordlist to brute-force the location of the sensitive functionality.


 Summary

  Access Control Fundamentals:
  - Determines who is authorized to perform actions or access resources
  - Depends on authentication (verifying identity) and session management (tracking user requests)
  - Common vulnerability area with high error potential due to complex business/legal requirements

  Three Types of Access Controls:

  1. Vertical Access Controls - Restrict sensitive functionality by user type (e.g., admin vs. regular user)
  2. Horizontal Access Controls - Restrict resources to specific users of the same type (e.g., users accessing only their own bank accounts)
  3. Context-Dependent Access Controls - Restrict actions based on application state or workflow (e.g., preventing cart modifications after payment)

  Privilege Escalation Examples:

  - Vertical Privilege Escalation - Non-privileged users gaining admin functionality
    - Unprotected Functionality - Sensitive admin pages accessible via direct URL browsing
    - Admin URLs may be discovered through robots.txt or brute-force attacks
    - Example: https://insecure-website.com/admin accessible without proper authorization