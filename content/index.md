---
title: The Bug Bounty Playbook
---

A living collection of TTPs, methodology, and tradecraft for bug bounty hunting. Built from my own notes between targets — some pages polished, some rough. It grows every time I learn something the hard way.

A finished playbook would mean I stopped learning, so don't hold your breath.

## Who this is for

Hunters who already know the basics. If you need someone to explain what Burp Suite does, start with PortSwigger's Web Security Academy and come back when you've done the practitioner-level labs.

If you're past that and want to find bugs that actually pay, chain findings into crits, and navigate the business side of bounty hunting, you're in the right place.

## Sections

- **[Methodology](./Methodology/)** — Zero to payout
- **[Recon](./Recon/)** — Discovery, enumeration, target mapping
- **[Attack Surface](./Attack-Surface/)** — Web, API, mobile, cloud, CI/CD
- **[Chains](./Chains/)** — Multi-vuln escalation patterns
- **[Tooling](./Tooling)** — Configs, scripts, and automation
- **[Reporting](./Reporting/)** — Reports that get paid, not triaged as informational
- **[Programs](./Programs/)** — Platform strategy, program selection, the meta-game
- **[Business of Bounties](./Business-of-Bounties/)** — The stuff nobody talks about

Open the graph view to see how everything connects. Every technique links to the recon that surfaces it, the chains that escalate it, and the reporting patterns that get it paid.

## Philosophy

**PoC or GTFO.** Every technique page should give you something you can run right now. Theory belongs in a textbook.

**Chain thinking.** A single medium is fine. Two mediums chained into a critical is a career. Every time I find something, I ask what it lets me reach next.

**The report is the product.** You don't get paid for finding bugs. You get paid for convincing triage that what you found matters.

## Tags

Pages are tagged by topic and attack surface. Feedback welcome.

## About

I'm mainajackson95 — bug bounty hunter on HackerOne, hunting web, API, and mobile targets. *(placeholder bio — edit me before going loud)*

This playbook is the methodology I actually use, not the one I'd put in a slide deck.
