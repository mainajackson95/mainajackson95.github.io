#ffuf #enumeration 

Enumeration:
1. subdomains 
2. subdirectories

Fuzzing Backend Language

- check what backend language is written in, this can be done through extension fuzzing
- wordlists include:
	- /usr/share/wordlists/seclists/Discovery/Web-Content/web-extensions.txt

```
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/web-extensions.txt:FUZZ -u http://SERVER_IP:PORT/indexFUZZ -ic
```


Fuzzing Subdirectories and Web Pages

- wordlists include:
	- /usr/share/wordlists/seclists/Discovery/Web-Content/
	- under Web-Content
		- directory-list-2.3-small.txt
		- directory-list-2.3-medium.txt
		- directory-list-2.3-big.txt
	- /usr/share/wordlists/dirb/
		- big.txt
		- common.txt
		- small.txt
```
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-big.txt:FUZZ -u http://SERVER_IP:PORT/FUZZ -ic
```

- try with the backend language extension:

```
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-small.txt:FUZZ -u http://SERVER_IP:PORT/FUZZ.php -ic
```


Recursive Fuzzing

- when we have a subdirectory, or multiple subdirectories and pages, within those subdirectories, we can use the recursion flag to recursively fuzz those discovered subdirectories for more pages, we can also set the depth of the recursion with the recursion depth flag. Recursion depth is setting how deep the scan will go when it finds subdirectories, so recursion depth of 1 will just look at the web pages in a subdirectory and a recursion depth of 2 will look for web pages in a subdirectory and the subdirectories of that subdirectory
```
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-small.txt:FUZZ -u "http://SERVER_IP:PORT/FUZZ" -ic -recursion -recursion-depth 1 -e .php
```

```
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-small.txt:FUZZ -w "http://SERVER_IP:PORT/FUZZ" -ic -recursion -recursion-depth 2 -e .php
```

Subdomain Fuzzing

- subdomain is a subset of a domain name that helps organize and navigate different sections of a website.
- subdomain fuzzing requires that a target is using public DNS records.
- wordlists:
	- /usr/share/wordlists/seclists/Discovery/DNS
```
ffuf -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-5000.txt:FUZZ -u https://FUZZ.epicgames.com
```


GET Parameter Fuzzing 

- get parameters are usually tied to some user input like a search feature.
- wordlists:
	- /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt
```
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt:FUZZ -u http://SERVER_IP:PORT/search.php?FUZZ=key -fs xxx
```

- for keys:
```
ffuf -w numbers.txt:fuzz -u http://SERVER_IP:PORT/search.php?secret=FUZZ
```

POST Parameter Fuzzing

- since we don't get url parameters, will us a proxy like burp, will use the following command:
```
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt:FUZZ -u http://SERVER_IP:PORT/login.php -X POST -d 'FUZZ=key' -H 'Content-Type: application/x-www-form-urlencoded' -fs xxx
```

- for the key:
```
ffuf -w true.text:FUZZ -u http://SERVER_IP:PORT/login.php -X POST -d 'admin=FUZZ' -H 'Content-Type: application/x-www-form-urlencoded' -fs xxx
```