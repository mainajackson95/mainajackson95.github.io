#http #messages #http_messages #request #response #anatomy 

- mechanism used to exchange data between a server and a client in the HTTP protocol.
- types of messages:
	- **requests** sent by the client to trigger an action on the server.
	- **responses**, the answer that the server sends in response to a request.
- Developers rarely, if ever, build HTTP messages from scratch.
- Applications such as a browser, proxy, or web server use software designed to create HTTP messages in a reliable and efficient way.
- messages are created or transformed is controlled via APIs in browsers, configuration files for proxies or servers, or other interfaces.
- HTTP protocol versions up to HTTP/2, messages are text-based, and are relatively straightforward to read and understand after you've familiarized yourself with the format.
- HTTP/2, messages are wrapped in binary framing, which makes them slightly harder to read.
- underlying semantics of the protocol are the same, so you can learn the structure and meaning of HTTP messages based on the text-based format of HTTP/1.x messages, and apply this understanding to HTTP/2 and beyond.


### Anatomy of an HTTP message 

![[Pasted image 20251028182355.png]]

Both requests and responses share a similar structure:

1. A _start-line_ is a single line that describes the HTTP version along with the request method or the outcome of the request.
2. An optional set of _HTTP headers_ containing metadata that describes the message. For example, a request for a resource might include the allowed formats of that resource, while the response might include headers to indicate the actual format returned.
3. empty line indicating the metadata of the message is complete.
4. optional _body_ containing data associated with the message. This might be POST data to send to the server in a request, or some resource returned to the client in a response. Whether a message contains a body or not is determined by the start-line and HTTP headers.

- start-line and headers of the HTTP message are collectively known as the _head_ of the requests, and the part afterwards that contains its content is known as the _body_.

#### HTTP requests

#http_request 

```
POST /users HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 49

name=FirstName+LastName&email=bsmth%40example.com
```



- start-line in HTTP/1.x requests (`POST /users HTTP/1.1` in the example above) is called a "request-line" and is made of three parts:
```
<method> <request-target> <protocol>
```

`<method>`

- (also known as an _HTTP verb_) is one of a set of defined words that describes the meaning of the request and the desired outcome. For example, `GET` indicates that the client would like to receive a resource in return, and `POST` means that the client is sending data to a server.

`<request-target>`

- is usually an absolute or relative [[URL]], and is characterized by the context of the request. The format of the request target depends on the HTTP method used and the request context. It is described in more detail in the [Request targets](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages#request_targets) section below.