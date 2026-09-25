
This lab has an unprotected admin panel. It's located at an unpredictable location, but the location is disclosed somewhere in the application.

Solve the lab by accessing the admin panel, and using it to delete the user `carlos`.

[  
](https://portswigger.net/academy/labs/launch/878a6a3a7bf5ca38441716313e1ad46697052f36b6c82c4a6bda1a98e28f446f?referrer=%2fweb-security%2faccess-control%2flab-unprotected-admin-functionality-with-unpredictable-url)


# solution:

1. Review the lab home page's source using Burp Suite or your web browser's developer tools.
2. Observe that it contains some JavaScript that discloses the URL of the admin panel.
3. Load the admin panel and delete `carlos`.