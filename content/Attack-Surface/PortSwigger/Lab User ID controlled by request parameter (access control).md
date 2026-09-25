

This lab has a horizontal privilege escalation vulnerability on the user account page.

To solve the lab, obtain the API key for the user `carlos` and submit it as the solution.

You can log in to your own account using the following credentials: `wiener:peter`

[  
](https://portswigger.net/academy/labs/launch/cf2d0a74362ee20a8f6ffb1028e3b44fee9ae125f418ed15832e4a8a2073bff9?referrer=%2fweb-security%2faccess-control%2flab-user-id-controlled-by-request-parameter)


# solution:

1. Log in using the supplied credentials and go to your account page.
2. Note that the URL contains your username in the "id" parameter.
3. Send the request to Burp Repeater.
4. Change the "id" parameter to `carlos`.
5. Retrieve and submit the API key for `carlos`.