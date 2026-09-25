#pseudo #pseudo_headers 

- One notable change to messages in HTTP/2 are the use of pseudo-headers.
- HTTP/1.x used the message start-line, HTTP/2 uses special pseudo-header fields beginning with `:`.
- following pseudo-headers:
	- `:method` - the HTTP method.
	- `:scheme` - the scheme portion of the target URI, which is often HTTP(S).
	- `:authority` - the authority portion of the target URI.
	- `:path` - the path and query parts of the target URI.
- there is only one pseudo-header, and that's the `:status` which provides the code of the response.
- We can make a HTTP/2 request using [nghttp](https://github.com/nghttp2/nghttp2) to fetch `example.com`, which will print out the request in a form that's more readable.
- You can make the request using this command where the `-n` option discards the downloaded data and `-v` is for 'verbose' output, showing reception and transmission of frames:
```
nghttp -nv https://www.example.com
```

- If you look down through the output, you'll see the timing for each frame transmitted and received:
```
[  0.123] <send|recv> <frame-type> <frame-details>
```

- We don't have to go into too much detail on this output, but look out for the `HEADERS` frame in the format `[ 0.123] send HEADERS frame ...`. In the lines after the header transmission, you will see the following lines:
```
[  0.447] send HEADERS frame ...
          ...
          :method: GET
          :path: /
          :scheme: https
          :authority: www.example.com
          accept: */*
          accept-encoding: gzip, deflate
          user-agent: nghttp2/1.61.0
```

- This should look familiar if you're already comfortable working with HTTP/1.x and the concepts covered in the earlier section of this guide still apply.
- This is the binary frame with the `GET` request for `example.com`, converted into a readable form by `nghttp`.
- If you look further down the output of the command, you will see the `:status` pseudo-header in one of the streams received from the server:
```
[  0.433] recv (stream_id=13) :status: 200
[  0.433] recv (stream_id=13) content-encoding: gzip
[  0.433] recv (stream_id=13) age: 112721
[  0.433] recv (stream_id=13) cache-control: max-age=604800
[  0.433] recv (stream_id=13) content-type: text/html; charset=UTF-8
[  0.433] recv (stream_id=13) date: Fri, 13 Sep 2024 12:56:07 GMT
[  0.433] recv (stream_id=13) etag: "3147526947+gzip"
...
```

- And if you remove the timing and stream ID from this message, it should be even more familiar:
```
:status: 200
content-encoding: gzip
age: 112721
```
