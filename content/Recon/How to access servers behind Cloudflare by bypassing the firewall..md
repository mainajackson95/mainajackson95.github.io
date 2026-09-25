#cloudflare #research 

[[research]]

1) Found a sweet hostname but Cloudflare Firewall blocks you? There's a neat trick attackers can use if the origin is misconfigured.

![Image](https://fearsoff.org/uploads/b74a9c52893cca7d0dc47c38868996e4.jpg)

2) Let's say our target is grafana.fearsoff.net, which has this firewall rule:

`(http.host eq "grafana.fearsoff.net" and ip.src ne 1.1.1.1)`

![Image](https://fearsoff.org/uploads/492fbc39a1e2d977bead8e8b97cc6aad.png)

3) This means that if anyone tries to access [https://grafana.fearsoff.net](https://grafana.fearsoff.net/) without using the internal VPN with IP 1.1.1.1, they will get an Access denied message.

![Image](https://fearsoff.org/uploads/aeb5e7bf874a4b768fb4de0d443a7012.png)

4) We discover that **grafana.fearsoff.net** points to IP address **13.214.193.141** on AWS. But this IP is not directly accessible because the AWS security group only allows Cloudflare IP ranges.

![Image](https://fearsoff.org/uploads/2320ef19996ea22cf80bcb8328e3eecf.png)

5) Here's where it gets interesting. To access that Grafana application without the internal VPN **1.1.1.1**, all we need to do is:

Create a DNS A record in a Cloudflare zone we control and point it to **13.214.193.141**.

![Image](https://fearsoff.org/uploads/8562cf6a4cae9356ccd47d6b8fe9fb6b.png)

6) Now, when we access the domain we control (in this case [https://bypass-grafana.fearsoff.org](https://bypass-grafana.fearsoff.org/)) we bypass the Cloudflare Firewall policy. In fact we are reaching the AWS server through Cloudflare's IPs.

![Image](https://fearsoff.org/uploads/c835712e2abe582245c3c2367a895506.png)

7) Even scarier: if multiple servers share the same Cloudflare-only SG, you can point records to them too.

- Misconfigured apps/proxy (nginx, apache, kong, k8s)

- Services trusting **x-forwarded-host**

Lots of attack surface.

8) Important: This is not a Cloudflare product vulnerability. This is a misconfiguration vulnerability at the origin.

9) If you want a pentest from an elite team of ethical hackers, feel free to reach out [@FearsOff](https://fearsoff.org/). Happy bug hunting!

Last updated: Sep 02, 2025