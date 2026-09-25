#commands #js_beautify 

js-beautify

```
js-beautify main-PT7AXPB2.js > main-PT7AXPB2-deobfuscated.js
```

running tool from usr:

```
sudo ln -s /opt/jwt_tool/jwt_tool.py /usr/bin/jwt_tool
```




Once installed, update Kali:

```
sudo apt update && sudo apt full-upgrade -y
sudo apt install kali-linux-headless -y  # Minimal tools
```


1. **Create a virtual environment** in your project directory:
    
    bash
    
    python3 -m venv .venv
    
2. **Activate the virtual environment**:
    
    bash
    
    source .venv/bin/activate


installing deb file:

sudo dpkg -i package-name.deb


amass + postgresql

``### 4. **Post-Scan Steps to View Data**

Once `amass enum` finishes:

1. **Connect to the database**:
    
    bash
    
    sudo -u postgres psql -d amass
    
2. **Check tables**:
    
    sql
    
    \dt  -- Should now show tables like "domains", "subdomains", etc.
    
3. **Query data**:
    
    sql
    
    SELECT * FROM subdomains;  -- View discovered subdomains

Before you run any commands for amass, let’s start the server

sudo service postgresql status

sudo service postgresql start

sudo service postgresql status


### Docker (local build)

[](https://github.com/OWASP/threat-dragon#docker-local-build)

To run Threat Dragon in a docker container that has been built locally, first configure your [environment using dotenv](https://www.threatdragon.com/docs/configure/configure.html) and run from the top directory of the project:

- `docker build -t owasp-threat-dragon:dev .`
- `docker run -it --rm -p 8080:3000 -v $(pwd)/.env:/app/.env owasp-threat-dragon:dev`
- or if using Windows:
- `docker run -it --rm -p 8080:3000 -v %CD%/.env:/app/.env owasp-threat-dragon:dev`

Using http port 8080 and accessing Threat Dragon on `http://localhost:8080/`.