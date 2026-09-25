#hhtp #headers #http_headers

- let the client and the server pass additional information with a message in a request or response.
- HTTP/1.X, a header is a case-insensitive name followed by a colon, then optional whitespace which will be ignored, and finally by its value (for example: `Allow: POST`).
- HTTP/2 and above, headers are displayed in lowercase when viewed in developer tools (`accept: */*`), and prefixed with a colon for a special group of [[Pseudo-headers]] (`:status: 200`). get more information here. [[HTTP messages]]