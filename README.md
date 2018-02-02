# Net Neutrality App API
Server / API for a microsite which provides users with a list of politicians and their stance on Net Neutrality.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Must set NODE_PATH env var to src dir.

```
NODE_PATH = /.src
```

To run locally
* MongoDB

### Installing

cd Into root directory

```
cd net-neutrality-server
```

Install dependencies

```
npm install
```

To get server running locally

1) run mongod in a termninal window/tab first

```
tab mongod
```

2) Start gulp tasks to spin up server with nodemon/browser-sync and watch & build scss/css/js

```
gulp
```




## Deployment

To create production build

```
npm build
```

## Built With

* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose.js](http://mongoosejs.com/)

## Authors

* **Mike Schmerbeck** [Portfolio](https://www.mikeschmerbeck.com)
