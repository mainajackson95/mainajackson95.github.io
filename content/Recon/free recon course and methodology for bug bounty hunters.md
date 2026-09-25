#recon #nahamsec #bugbounty #bungbounty_hunter 

[[recon]]

## setup

- using vps from hostinger (KVM)
	- OS - ubuntu
	- panel - good hosting domains.

### installation:

1. ohmzsh:

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```


or

```
apt install zsh

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```


2. go:

- check availability:
```
go
```


- if no available:

```
sudo apt install golang-go
```


3. installing all project discovery tools.
- pdtm

```
go install -v github.com/projectdiscovery/pdtm/cmd/pdtm@latest
```


- setting the go path:
```
nano ~/.zshrc

# go to the bottom of the script and add the following line:

export GOPATH="$HOME/go"
export PATH="$PATH:$GOPATH/bin"

# then refreshing the terminal:

source ~/.zshrc
```


- checking pdtm packages:
```
pdtm

## check help menu:

pdtm -h

## installing single tool:

pdtm -i subfinder

## installing more than one tool:

pdtm -i subfinder, nuclei

## to remove all the different tools installed:

pdtm -ra

## installing all the project discovery tools:

## installing all with -ia, and adding then change the path by giving the go path.

pdtm -ia -igp

## will not install third party tools that they rely on so you also have to do that by manually installing them.


## installing nmap:

sudo apt-get install nmap -y

## installing massdns

## git clone the directory

https://github.com/blechschmidt/massdns.git

cd massdns

## type make

make

## if you get the following error "zsh: command not found: make, means that's not installed you gonna have to install the build-essential"

sudo apt-get install build-essential -y

make

ls bin/massdns

## helps run massdns by just running the command on the terminal

cp ./bin/massdns /usr/bin

sudo apt install -y libpcap-dev

```

### tools:

1. aix.
- export your key from any AI model and it will allow you to work with different models
```
## check the aix help 

aix -h

## example gpt4

aix -g4 -p "hello"
```


## recon main pillars:

1. asset discovery
- goal is to find as many assets that you can hack on this are your:
	- domains
	- subdomains
	- ip addresses
	- port scanning
	1. subfinder

- when using subfinder the best thing is going to the configs:
```
nano ~/.config/subfinder/provider-config.yaml
```  

- and it is highly recommended to added the respective keys because even if you are using a free API key, the chances of getting more subdomains and better data is a lot higher than doing it without.
- do it like this to go through all the sources that are available:
```
subfinder -d domain.com -all
```

	2. shuffledns
- allows you to brute force for the different domains.
- most important thing is to have resolvers, there different tools that have this, e.g. "trickest resolvers" on google for trickest resolvers on github 
![[Pasted image 20251022003118.png]]
- download the latest resolvers and choose the option of raw
![[Pasted image 20251022003209.png]]

![[Pasted image 20251022003237.png]]

![[Pasted image 20251022003321.png]]
- copy the url on the raw data page and use the following command:
```
wget <url>
```

- you'll go further and create a wordlist or use among the many on the internet for example seclist github or the assetnotes wordlist which are really good and it is highly recommended to have them on deck.
![[Pasted image 20251022003554.png]]

![[Pasted image 20251022003753.png]]

![[Pasted image 20251022003821.png]]

- for use for our shuffledns we are going to use:
```
shuffledns -d domain.com -w <ur wordlist> -r resolvers.txt -mode bruteforce


or (if you want to save the results)

shuffledns -d domain.com -w <your wordlist> -r resolvers.txt -mode bruteforce -o domains.txt -silent
```

note:

- so typically what a lot of hackers do is to take all this subdomains and start doing port scanning and directory bruteforcing but there's one more thing that you should do before you move on to the next phase, permutations, these are the different environments in which these applications could exist. so think of these as if you have an app and then maybe it has a QA instance, a dev instance or even some sort of an API or an admin backend attached to it, and what you can do with alterx, allowing these different keywords to be added together to create these different permutations.
- this will be done by taking a different wordlist, give it a list of all the domains that we already have and say hey can you find different combinations of maybe APIs, dev, QA an so on and list all of them and then help resolve and see which one of them actually exist.
	3. alterx
```

# gives you a list of all domans that exist, doesn't necessarily mean that they all exist, just means it came up with all thes different combinations that you can try and see which one of them actually resolve.

cat domains.txt | alterx

# recommended is to add the results to a file using the following command:

cat domains.txt | alterx | tee -a subdomains-dnsx.txt


# something cool that allows you to do:

nano ~/.config/alterx/permutation_v0.0.6.yaml

# contains different configurations, you can add your own custom way for the word combinations especially if you find something that your target does that's different than what they have in the yaml file.

# you can also use there keywords, but you can use the -p and actually allow the application to use your personal wordlist that you have. 

# look at the enrich option, which takes alist of all different wordlists and extracts the words from the input. 
```

	4. dnsx 
- allows to see whether or not the websites resolve.
```
cat subdomains-dnsx.txt | dnsx
```

- here is how you pipe the commands
```
# pipping alterx and dnsx

cat domains.txt | alterx | dnsx

# pipping subfinder | shuffledns | alterx | dnsx

subfinder -all -d domain.com | shuffledns -w <your wordlist> -r resolvers.txt mode bruteforce | alterx | dnsx
```

	5. naabu
- using it to look for open ports on the different machines.

```
# go through the help for naabu

naabu -h

# basic level:

naabu -top-ports 100 -ep 22

## pipping alterx | dnsx | naabu

cat subdomains.txt | alterx | dnsx | naabu -top-ports 100 -ep 22 -o open-ports.txt

## pipping subfinder | shuffledns | alterx | dnsx | naabu

subfinder -all -d domain.com | shuffledns -w <your wordlist> -r resolvers.txt mode bruteforce | alterx | dnsx | naabu -top-ports 100 -ep 22 -o open-ports.txt
```

- next option is to figure out what we want to do next, do you want to do some information gathering or are we just simply go and find content to hack on, we can do both 
	6. httpx
```
# go through the options using -h
httpx -h

# pipping alterx | dnsx | naabu | httpx 

cat open-ports.txt | alterx | dnsx | naabu -top-ports 100 -ep 22 | httpx -title -sc -cl -location -fr 

# or

cat open-ports.txt | alterx | dnsx | naabu -top-ports 100 -ep 22 | httpx -title -sc -cl -location -fr  -o httpx.txt

# so on this stage look for things that look interesting to you, especially those that have a title because it indicates that the website is live, and for thirdparty devices like php myadmin, grafana, jenkins, anything that is developed by somebody else is a really good place to look for CVES or weak credentials
```

2. content discovery
- where you gather information, looking for content hack on, you do google dorking and you as far as brute forcing for files and directories or scraping JavaScript files or just crawling the website with tools like katana
	1. katana
```
# basic
katana -u <url you want to crawl>

# parsing through JavaScript files.
katana -u <url you want to crawl> -jc

# parsing deeper

katana -u <url you want to crawl> -jsl

katana -u <url you want to crawl> -jsl -d 5

# multiple links
cat open-ports.txt | katana -jsl

# recommended way is crawling while you are auntheticated to the application by using the session or how the user is being auntheticated.

katana -u <url you want to crawl> -H cookie: <cookie value> -xhr -jsl -aff

katana -u <url you want to crawl> -H cookie: <cookie value> -xhr -jsl -aff -d 5

# might lead to finding a bug

katana -u <url you want to crawl> -H cookie: <cookie value> -xhr -jsl -aff | httpx -ct -cl -sc 

# when you run the above command may show that it has found some text HTML for example, or it finds some sort of API that is no longer there or maybe its in the JavaScript file where it was removed, when you do crawling, passive recon to get urls it is very helpful to run HTTPX and see which are accessible and what is the content type in them. if some of this api calls come back with the content header or the content type being HTML, We know if we could get some HTML in there we can possible get JavaScript to execute and get XSS at the end of the day.
```

2. urlfinder
```
urlfinder -d domain.com

# go

# then find the results to httpx.
```