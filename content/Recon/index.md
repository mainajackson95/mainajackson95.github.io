---
title: "Recon"
---

# Recon

Recon isn't a phase you do once and move on from. It runs alongside your hunting, continuously. The targets that pay best are the ones nobody else has found yet. The forgotten staging server, the internal tool accidentally exposed after a deploy, the acquisition from three years ago still running on the original infrastructure.

If you're only testing what's in the scope document, you're competing with everyone else who read the same document. If you're finding assets the program owner forgot they had, you're competing with almost nobody.

## Recon Pipeline Architecture

A mature recon setup isn't one tool. It's an orchestrated pipeline where each stage feeds the next.

flowchart TD
    subgraph Discovery["1. Asset Discovery"]
        A1["Passive enum: subfinder, crt.sh"]
        A2["Active brute: puredns"]
        A3["Permutation: gotator"]
    end
    subgraph Resolution["2. Resolution"]
        B1["DNS: dnsx, massdns"]
        B2["HTTP probe: httpx"]
        B3["Ports: naabu + nmap"]
    end
    subgraph Analysis["3. Analysis"]
        C1["Screenshots: gowitness"]
        C2["Tech profiling: httpx"]
        C3["Content discovery: ffuf"]
        C4["JS scraping: linkfinder"]
    end
    subgraph Monitoring["4. Continuous"]
        D1["Diff against previous runs"]
        D2["Alert on new assets"]
        D3["Auto-scan with Nuclei"]
    end
    Discovery --> Resolution --> Analysis --> Monitoring
    Monitoring -->|"new assets"| Analysis

## Sections

### Asset Discovery

- **[Subdomain Enumeration](https://bugbounty.info/Recon/Subdomain-Enumeration)** - Passive, active, and permutation-based approaches. Going beyond what subfinder gives you out of the box.
- **[ASN Mapping](https://bugbounty.info/Recon/ASN-Mapping)** - Company name to ASN to CIDR ranges. Finds live IP space that DNS enumeration never reaches.
- **[Certificate Transparency](https://bugbounty.info/Recon/Certificate-Transparency)** - Beyond subdomain enum: cert pivoting by organisation name, expired wildcard history, and internal-named CNs.
- **[Cloud Range Discovery](https://bugbounty.info/Recon/Cloud-Range-Discovery)** - Mapping IP ranges back to cloud providers, finding S3 buckets and Azure blobs.
- **[Monitoring & Diffing](https://bugbounty.info/Recon/Monitoring)** - Running recon on a schedule and alerting on changes. New subdomain or new open port means a target that hasn't been tested yet.

### Enumeration

- **[Port & Service Scanning](https://bugbounty.info/Recon/Port-Scanning)** - Masscan for speed, nmap for accuracy. The combo workflow that covers 65k ports without taking all day.
- **[Content Discovery](https://bugbounty.info/Recon/Content-Discovery)** - Directory bruting, wordlist selection, recursive fuzzing. The wordlist matters more than the tool.
- **[JavaScript Analysis](https://bugbounty.info/Recon/JavaScript-Analysis)** - Extracting endpoints, API routes, secrets, and internal paths from JS bundles. Consistently one of the highest-value things you can do during recon.
- **[API Endpoint Discovery](https://bugbounty.info/Recon/API-Discovery)** - Finding undocumented APIs, GraphQL introspection when it's "disabled," reverse engineering mobile app traffic.
- **[API Documentation Discovery](https://bugbounty.info/Recon/API-Documentation-Discovery)** - Swagger, OpenAPI, Postman, and GraphQL playground endpoints. A full endpoint list handed to you without brute-forcing.
- **[Parameter Discovery](https://bugbounty.info/Recon/Parameter-Discovery)** - Hidden parameters that aren't in the HTML. Arjun, param miner, and the manual approach.
- **[robots.txt, security.txt & sitemap.xml](https://bugbounty.info/Recon/robots-and-security.txt)** - First-touch recon: admin paths from robots.txt, programme details from security.txt, URL map from sitemap.xml.

### Fingerprinting & Intelligence

- **[Shodan, Censys & FOFA](https://bugbounty.info/Recon/Shodan-Censys-Fofa)** - Three internet scan engines, their query syntax, favicon hashing, and when each one wins.
- **[Tech Fingerprinting](https://bugbounty.info/Recon/Tech-Fingerprinting)** - Identifying the stack per host, mapping tech to CVE feeds, and building a triage priority list.
- **[Mobile App Recon](https://bugbounty.info/Recon/Mobile-App-Recon)** - APK and IPA as a recon source: endpoints, hardcoded keys, deep links, and paths the web app never exposes.
- **[SaaS Enumeration](https://bugbounty.info/Recon/SaaS-Enumeration)** - Zendesk, Salesforce Communities, ServiceNow, Atlassian, Okta - the third-party platforms that sit outside the normal security review cycle.

### OSINT

- **[GitHub Dorking](https://bugbounty.info/Recon/GitHub-Dorking)** - Credentials, internal paths, config files, old code. GitHub is an intelligence goldmine if you know what queries to run.
- **[Wayback Machine Mining](https://bugbounty.info/Recon/Wayback-Mining)** - Endpoints that got removed are often still functional. Features "deleted" from the UI but not from the backend.
- **[Acquisitions & Mergers](https://bugbounty.info/Recon/Acquisitions)** - When BigCorp acquires StartupCo, StartupCo's infrastructure often stays on the original stack for years. Nobody patches it, nobody remembers it, it's in scope.
- **[OSINT on Employees](https://bugbounty.info/Recon/OSINT-on-Employees)** - LinkedIn, GitHub profiles, breach databases, and username enumeration. The human attack surface and leaked credentials still in use.
- **[Exposed Git Repositories](https://bugbounty.info/Recon/Exposed-Git)** - `.git/` directories left on web servers. git-dumper, full history mining, SVN and Mercurial variants.

### Automation

- **[Building a Recon Pipeline](https://bugbounty.info/Recon/Pipeline)** - Orchestrating the above into something that runs while you sleep.
- **[Data Management](https://bugbounty.info/Recon/Data-Management)** - Storing, querying, and deduplicating recon output when you're tracking dozens of targets.

## The One Recon Tip That Actually Matters

Everyone focuses on tool selection. "Should I use subfinder or amass?" Doesn't matter. They both pull from the same sources.

What matters is what you do after the tools finish. The gap between "I ran subfinder and got 500 subdomains" and "I found a P1 on an asset nobody else tested" is entirely in the analysis phase. Screenshot everything. Actually look at the screenshots. Notice the staging server running an old version of the app. Notice the admin panel on port 8443. Notice the subdomain that returns a completely different tech stack from everything else.

Recon tools generate data. Hunters generate findings. The gap between those two things is judgment, pattern recognition, and curiosity. None of that can be automated.

23 items under this folder.

- Apr 24, 2026
    
    ### [Subdomain Enumeration](https://bugbounty.info/Recon/Subdomain-Enumeration)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [Tech Fingerprinting](https://bugbounty.info/Recon/Tech-Fingerprinting)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [Wayback Mining](https://bugbounty.info/Recon/Wayback-Mining)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [osint](https://bugbounty.info/tags/osint)
    - [beginner](https://bugbounty.info/tags/beginner)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [robots.txt, security.txt & sitemap.xml](https://bugbounty.info/Recon/robots-and-security.txt)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [beginner](https://bugbounty.info/tags/beginner)
    
- Apr 24, 2026
    
    ### [API Documentation Discovery](https://bugbounty.info/Recon/API-Documentation-Discovery)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [ASN Mapping](https://bugbounty.info/Recon/ASN-Mapping)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [Acquisitions](https://bugbounty.info/Recon/Acquisitions)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [osint](https://bugbounty.info/tags/osint)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    - [advanced](https://bugbounty.info/tags/advanced)
    
- Apr 24, 2026
    
    ### [Certificate Transparency](https://bugbounty.info/Recon/Certificate-Transparency)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [Cloud Range Discovery](https://bugbounty.info/Recon/Cloud-Range-Discovery)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [cloud](https://bugbounty.info/tags/cloud)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [Content Discovery](https://bugbounty.info/Recon/Content-Discovery)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [Data Management](https://bugbounty.info/Recon/Data-Management)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [automation](https://bugbounty.info/tags/automation)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [Exposed Git Repositories](https://bugbounty.info/Recon/Exposed-Git)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [GitHub Dorking](https://bugbounty.info/Recon/GitHub-Dorking)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [osint](https://bugbounty.info/tags/osint)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [JavaScript Analysis](https://bugbounty.info/Recon/JavaScript-Analysis)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    - [advanced](https://bugbounty.info/tags/advanced)
    - [polished](https://bugbounty.info/tags/polished)
    
- Apr 24, 2026
    
    ### [Mobile App Recon](https://bugbounty.info/Recon/Mobile-App-Recon)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [Monitoring](https://bugbounty.info/Recon/Monitoring)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [automation](https://bugbounty.info/tags/automation)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [OSINT on Employees](https://bugbounty.info/Recon/OSINT-on-Employees)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [osint](https://bugbounty.info/tags/osint)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [Parameter Discovery](https://bugbounty.info/Recon/Parameter-Discovery)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [Pipeline](https://bugbounty.info/Recon/Pipeline)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [automation](https://bugbounty.info/tags/automation)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    - [advanced](https://bugbounty.info/tags/advanced)
    
- Apr 24, 2026
    
    ### [Port Scanning](https://bugbounty.info/Recon/Port-Scanning)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [beginner](https://bugbounty.info/tags/beginner)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [SaaS Enumeration](https://bugbounty.info/Recon/SaaS-Enumeration)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    
- Apr 24, 2026
    
    ### [Shodan, Censys & FOFA](https://bugbounty.info/Recon/Shodan-Censys-Fofa)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    - [advanced](https://bugbounty.info/tags/advanced)
    
- Apr 24, 2026
    
    ### [API Discovery](https://bugbounty.info/Recon/API-Discovery)
    
    - [recon](https://bugbounty.info/tags/recon)
    - [api](https://bugbounty.info/tags/api)
    - [intermediate](https://bugbounty.info/tags/intermediate)
    - [advanced](https://bugbounty.info/tags/advanced)

## Explore

- [API Discovery](API-Discovery)
- [API Documentation Discovery](API-Documentation-Discovery)
- [ASN Mapping](ASN-Mapping)
- [Acquisitions](Acquisitions)
- [Certificate Transparency](Certificate-Transparency)
- [Cloud Range Discovery](Cloud-Range-Discovery)
- [Content Discovery](Content-Discovery)
- [Data Management](Data-Management)
- [Exposed Git](Exposed-Git)
- [GitHub Dorking](GitHub-Dorking)
- [JavaScript Analysis](JavaScript-Analysis)
- [Mobile App Recon](Mobile-App-Recon)
- [Monitoring](Monitoring)
- [OSINT on Employees](OSINT-on-Employees)
- [Parameter Discovery](Parameter-Discovery)
- [Pipeline](Pipeline)
- [Port Scanning](Port-Scanning)
- [SaaS Enumeration](SaaS-Enumeration)
- [Shodan, Censys & FOFA](Shodan-Censys-Fofa)
- [Subdomain Enumeration](Subdomain-Enumeration)
- [Tech Fingerprinting](Tech-Fingerprinting)
- [Wayback Mining](Wayback-Mining)
- [robots.txt, security.txt & sitemap.xml](robots-and-security.txt)

---

> 📖 **Source:** This page mirrors **[Griffin's Bug Bounty Playbook](https://bugbounty.info/)** (aussinfosec) — original writing and structure by Griffin, kept here as a study reference. Credit where it's due.
