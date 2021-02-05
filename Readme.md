Rate limit service   
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
Rate limit service written in Node.js  
[Public endpoint](https://rate-limit-node-service.herokuapp.com/api-docs)

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Prerequisite](#prerequisite)
- [Building and test](#building-and-test)
- [Run](#run)
- [Available APIs](#available-apis)
- [Author](#author)
- [License](#license)

Prerequisite
-----
* Nodejs >= v12
* Yarn
* Redis >= v5.0

Building and test
-----

* Build
  
```bash
$ yarn install --frozen-lockfile
```

Run
-----

* For development

```bash
$ yarn run dev
```

* For production

```bash
$ yarn start
```

Available APIs
-----

[See swagger page for details](https://rate-limit-node-service.herokuapp.com/api-docs)


Author
-----
Jeremy Li

License
-----
MIT License
