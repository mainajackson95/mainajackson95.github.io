#2fa #2fa_broken #2fa_broken_logic #broken #broken_logic #business #business_logic #business_logic_vulnerability 

[[lab 2FA broken logic]]

### **Vulnerability Report Template: 2FA Broken Logic**

**Report ID:** WSAC-2025-002
**Lab Title:** 2FA Broken Logic
**Target:** https://0a02001804d4f16f80470d2a00f4002f.web-security-academy.net/login2
**Severity:** [*e.g., High / Critical*]
**Reporter:** [*Your Name/Handle*]
**Date:** [*Date of Discovery*]

---

#### **1. Summary**
A fundamental flaw in the implementation of the two-factor authentication (2FA) mechanism allows an attacker to bypass the second authentication factor. This vulnerability arises due to broken logic in the application's state management and trust in client-side controls after initial login, compromising the entire security benefit of 2FA.

#### **2. Vulnerability Details**
**Vulnerability Type:** Authentication Bypass / Broken Two-Factor Authentication
**Affected Component:** The login process, specifically the post-credentials 2FA verification step.
**Attack Vector:** [*e.g., Remote, Unauthenticated*]

#### **3. Steps to Reproduce**
**Preconditions:**
*   A valid victim user account: [*e.g., `carlos:montoya`*]
*   [*Any other preconditions, e.g., knowledge of the victim's password*]

**Step-by-Step Exploitation:**
1.  [*Describe the initial step, e.g., "Log in using the victim's credentials on the primary login page."*]
2.  [*Explain what happens next, e.g., "The application redirects to the 2FA verification page (`/login2`)."*]
3.  [*Detail the critical flaw and the manipulation required. Be specific about the request/state that is manipulated.*]
    *   **Manipulated Element:** `[*e.g., a cookie, a GET parameter, a POST parameter, the user session state*]`
    *   **Original Value/State:** `[*Describe the original value or state*]`
    *   **Action Taken:** `[*Describe the exact action, e.g., "Change the `verify` parameter to another user", "Access the 2FA page directly after a different user's login", "Complete the 2FA for a low-privilege user and then manipulate the session to access a high-privilege account"*]`
4.  [*Describe the final request that leads to the bypass and the result.*]
5.  [*Show the final result, proving the 2FA was bypassed and you have access to the victim's account.*]

**Proof of Concept (PoC):**
[*You can include screenshots, Burp Suite request/response pairs, or a video here.*]

**Key Request(s) Demonstrating the Bypass:**
```http
POST /[*2fa-endpoint*] HTTP/1.1
Host: [*vulnerable-host*]
Cookie: [*session-cookie*]
Content-Type: [*e.g., application/x-www-form-urlencoded*]

[*mfa-code-parameter*]=[*0000*]&[*other-critical-parameter*]=[*manipulated_value*]
```

**OR**

```http
GET /[*my-account-page*] HTTP/1.1
Host: [*vulnerable-host*]
Cookie: [*session-cookie-after-bypass*]
```

**Response (Successful Bypass):**
```http
HTTP/1.1 200 OK
...
[*Response body showing access to the victim's account dashboard or sensitive functionality*]
```

#### **4. Impact**
A successful exploitation of this vulnerability allows an attacker to:
*   **Direct Impact:** Completely bypass the two-factor authentication for any user whose primary credentials are known.
*   **Attack Scenario:** An attacker who phishes or otherwise obtains a user's password can gain full access to their account, rendering the 2FA security measure useless.
*   **Business Impact:** This leads to a full compromise of the affected user account, potentially resulting in unauthorized access to sensitive data, financial fraud, and privilege escalation.

#### **5. Mitigation Recommendations**
The core issue is a failure to securely link the 2FA verification state to the initial authentication step on the server-side.

*   **Stateful Session Management:** The server must maintain a secure, server-side state machine for the login process. The state should track that step one (password) is complete and that step two (2FA) is pending for a specific session.
*   **Irrevocable Session Binding:** The session used after 2FA verification must be irrevocably different from the session used before it. A new session token should be issued upon successful 2FA completion.
*   **Strict Server-Side Validation:** The application must validate on every subsequent request that the current session has successfully passed both authentication factors.
*   **Specific Technical Fix:** For the identified flaw:
    1.  [*Describe the specific server-side check that is missing, e.g., "The application must verify that the user completing the 2FA challenge is the same user who initiated the login flow and that their session is in the 'post-password, pre-2FA' state."*]
    2.  [*Describe how to fix the trust issue, e.g., "Do not rely on client-supplied parameters like `verify` to determine which user's 2FA is being validated. This must be inferred from the server-side session state."*]

**Example Secure Server-Side Logic Pseudocode:**
```python
# INSECURE - Trusting client-side input for user context
user_to_verify = request.getParameter("verify")
submitted_code = request.getParameter("mfa-code")

# SECURE - Using server-side session
session = getSession(request.cookies.sessionid)
if session.state != "PASSWORD_VERIFIED":
    return error("Invalid authentication sequence.")
if submitted_code != session.pending_mfa_code:
    return error("Invalid 2FA code.")
# Grant fully authenticated session
session.state = "FULLY_AUTHENTICATED"
session.user = session.user_who_logged_in # Set in step 1
issueNewSessionCookie(session)
```

#### **6. References**
*   OWASP - [Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#implement-proper-authentication)
*   PortSwigger Web Security Academy - [2FA broken logic](https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-broken-logic)

---

### **End of Report**

---
**Instructions for you:** Simply copy the template above, paste it into your preferred text editor, and fill in all the bracketed `[*...*]` sections with the details you gather from exploiting the lab. Good luck