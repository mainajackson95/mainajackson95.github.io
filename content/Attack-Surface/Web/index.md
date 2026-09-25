---
title: "Web"
---

Apr 24, 20262 min read

# Web Applications

Widest attack surface and deepest section of this playbook. Organized by category rather than alphabetically because the categories reflect how you actually think about testing. You test authentication as a system, not individual bugs in isolation.

## Authentication

How users prove who they are. Every auth implementation is custom in ways that matter.

- [Login Bypass Patterns](https://bugbounty.info/Attack-Surface/Web/Authentication/Login-Bypass)- [Password Reset Flows](https://bugbounty.info/Attack-Surface/Web/Authentication/Password-Reset)- [OAuth Misconfigurations](https://bugbounty.info/Attack-Surface/Web/Authentication/OAuth)- [SSO & SAML Attacks](https://bugbounty.info/Attack-Surface/Web/Authentication/SSO)- [MFA Bypass](https://bugbounty.info/Attack-Surface/Web/Authentication/MFA-Bypass)- [Session Management](https://bugbounty.info/Attack-Surface/Web/Authentication/Session-Management)- [JWT Attacks](https://bugbounty.info/Attack-Surface/Web/Authentication/JWT)

## Authorization

How the app decides what you're allowed to do. Most consistently rewarded bug class in my experience.

- [IDOR Patterns](https://bugbounty.info/Attack-Surface/Web/Authorization/IDOR)- [BOLA & BFLA](https://bugbounty.info/Attack-Surface/Web/Authorization/BOLA)- [Privilege Escalation](https://bugbounty.info/Attack-Surface/Web/Authorization/Privilege-Escalation)- [Multi-Tenancy Bugs](https://bugbounty.info/Attack-Surface/Web/Authorization/Multi-Tenancy)

## Injection

Putting data where the application expects instructions.

- [XSS](https://bugbounty.info/Attack-Surface/Web/Injection/XSS/) - Reflected, stored, DOM, mXSS, framework-specific, WAF bypass
- [SQL Injection](https://bugbounty.info/Attack-Surface/Web/Injection/SQLi/) - Error-based, blind, second-order, ORM-specific- [Server-Side Template Injection](https://bugbounty.info/Attack-Surface/Web/Injection/SSTI)- [Host Header Injection](https://bugbounty.info/Attack-Surface/Web/Injection/Host-Header)- [NoSQL Injection](https://bugbounty.info/Attack-Surface/Web/Injection/NoSQLi)- [Deserialization](https://bugbounty.info/Attack-Surface/Web/Injection/Deserialization)- [Command Injection](https://bugbounty.info/Attack-Surface/Web/Injection/Command-Injection)

## SSRF

Making the server send requests on your behalf. Gateway to cloud metadata and internal networks.

- [SSRF](https://bugbounty.info/Attack-Surface/Web/SSRF/) - Full methodology, bypass techniques, blind SSRF, cloud exploitation

## Client-Side

Bugs that execute in the user's browser.

- [CSRF](https://bugbounty.info/Attack-Surface/Web/Client-Side/CSRF)- [postMessage Vulnerabilities](https://bugbounty.info/Attack-Surface/Web/Client-Side/postMessage-Vulnerabilities) - Full methodology, origin bypass, widget exploitation
- [CORS Misconfigurations](https://bugbounty.info/Attack-Surface/Web/Client-Side/CORS)- [WebSocket Security](https://bugbounty.info/Attack-Surface/Web/Client-Side/WebSocket)- [Subdomain Takeover](https://bugbounty.info/Attack-Surface/Web/Client-Side/Subdomain-Takeover)- [Clickjacking](https://bugbounty.info/Attack-Surface/Web/Client-Side/Clickjacking)- [Prototype Pollution](https://bugbounty.info/Attack-Surface/Web/Client-Side/Prototype-Pollution)

## Business Logic

The bugs no scanner will ever find.

- [Race Conditions](https://bugbounty.info/Attack-Surface/Web/Business-Logic/Race-Conditions)- [Price & Quantity Manipulation](https://bugbounty.info/Attack-Surface/Web/Business-Logic/Price-Manipulation)- [State Machine Bugs](https://bugbounty.info/Attack-Surface/Web/Business-Logic/State-Machine)- [Mass Assignment](https://bugbounty.info/Attack-Surface/Web/Business-Logic/Mass-Assignment)

## Infrastructure

Server and proxy layer misconfigurations.

- [Cache Poisoning](https://bugbounty.info/Attack-Surface/Web/Infrastructure/Cache-Poisoning)- [HTTP Request Smuggling](https://bugbounty.info/Attack-Surface/Web/Infrastructure/Request-Smuggling)- [Open Redirect](https://bugbounty.info/Attack-Surface/Web/Infrastructure/Open-Redirect)- [Web Cache Deception](https://bugbounty.info/Attack-Surface/Web/Infrastructure/Web-Cache-Deception)- [2 Attacks](https://bugbounty.info/Attack-Surface/Web/Infrastructure/HTTP2-Attacks)

8 items under this folder.

- Apr 24, 2026
    
    ### [Injection](https://bugbounty.info/Attack-Surface/Web/Injection/)
    
- Apr 24, 2026
    
    ### [SSRF](https://bugbounty.info/Attack-Surface/Web/SSRF/)
    
    - [web](https://bugbounty.info/tags/web)
    - [ssrf](https://bugbounty.info/tags/ssrf)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    - [advanced](https://bugbounty.info/tags/advanced)
    - [high](https://bugbounty.info/tags/high)
    - [critical](https://bugbounty.info/tags/critical)
    - [polished](https://bugbounty.info/tags/polished)
    
- Apr 24, 2026
    
    ### [File-Operations](https://bugbounty.info/Attack-Surface/Web/File-Operations/)
    
- Apr 24, 2026
    
    ### [Infrastructure](https://bugbounty.info/Attack-Surface/Web/Infrastructure/)
    
- Apr 24, 2026
    
    ### [Client-Side](https://bugbounty.info/Attack-Surface/Web/Client-Side/)
    
- Apr 24, 2026
    
    ### [Authorization](https://bugbounty.info/Attack-Surface/Web/Authorization/)
    
- Apr 24, 2026
    
    ### [Business-Logic](https://bugbounty.info/Attack-Surface/Web/Business-Logic/)
    
- Apr 24, 2026
    
    ### [Authentication](https://bugbounty.info/Attack-Surface/Web/Authentication/)

## Explore

- **[SSRF](SSRF/)**

---

> 📖 **Source:** This page mirrors **[Griffin's Bug Bounty Playbook](https://bugbounty.info/)** (aussinfosec) — original writing and structure by Griffin, kept here as a study reference. Credit where it's due.
