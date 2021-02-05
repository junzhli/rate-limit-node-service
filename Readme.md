Rate limit service written in Node.js    
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[Public endpoint](https://rate-limit-node-service.herokuapp.com)

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Prerequisite](#prerequisite)
- [Building and test](#building-and-test)
- [Run](#run)
- [Test](#test)
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

Test
-----

```bash
$ yarn test
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
