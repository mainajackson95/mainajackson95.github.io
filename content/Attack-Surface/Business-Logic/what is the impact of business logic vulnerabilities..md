#business #business_logic #business_logic_vulnerability 

[[business logic vulnerabilities]]

- can be fairly trivial:
	- unintended behavior can lead to a severity bug if an attacker can exploit the application the right way.
- quirky exploits should be patched even if you don't understand how to exploit them.
- impact depends on the functionality tied to the logic flaw. e.g.:
  - authentication mechanism can have serious implications that can lead to privilege escalations or doing a complete bypass leading to PI or PII, bugs which entail majorly on personal and sensitive data, increasing a wider rage of exploits
  - financial transactions leads to massive losses, stealing of bank details and more private details attached to the account.