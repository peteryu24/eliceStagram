<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> simple social media app


## Install

```sh
npm install
```

## Run tests

```sh
npm run test
```

## gitignore

* **.env**
    * path: `config/script/.env`
    * usage: 
      - database connection details
      - used in `config/database.js`

* **firebaseServiceAccountKey.json**
    * path: `/config/script/firebaseServiceAccountKey.json`
    * usage: 
      - firebase Auth
      - used in `config/firebaseAdmin.js`

