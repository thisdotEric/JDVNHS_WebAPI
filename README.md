# Jose de Villa National High School Web API

#### Step by step local developement setup

1. Download and install latest [NodeJS](https://nodejs.org/en/download/) LTS.
2. Install [VS Code](https://code.visualstudio.com/download) text editor.
3. Install [Git](https://git-scm.com/downloads). Refer to this [video](https://m.youtube.com/watch?v=QqP7YZlZEOo) for further reference.
4. Clone Project in VS Code. Refer to this [video](https://m.youtube.com/watch?v=pVQCJ6sY8AQ).

```
CTRL + Shift + P
Search for Git Clone then paste:

https://github.com/thisdotEric/JDVNHS_WebAPI.git
```

5. Open VS Code terminal and install all dependencies in package.json.

```
npm install
```

6.  Install PostgreSQL Database. Refer to this [video](https://m.youtube.com/watch?v=BLH3s5eTL4Y&t=438s). Take note of your login credentials.
    -   Create database **jdvnhs_db**
7.  Navigate to the root of the project and create a **.env** file. Follow the format of the _.env.example file_ and fill up the database credentials.
8.  Run the project. Open VS Code terminal.

```
npm run dev
```

9. Open Chrome and visit **http://localhost:PORT**. Change the PORT based on **.env** file, defaults to 4000.

#### Github

1. Fork this project on your account.
2. Refer to this [video](https://m.youtube.com/watch?v=_NrSWLQsDL4&t=15s) tutorial.
