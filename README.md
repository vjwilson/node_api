# node_api

Practice for writing a RESTful API with [Node](https://nodejs.org) and [Express](http://expressjs.com/).

## Getting Started

* Clone the repo
* Switch to the repo directory
* Run `npm install`
* Run the app with `node app.js`

## RESTful Endpoints

Endpoints are in the following forms:

| HTTP Verb | URL | Payload | Description |
| --- | --- | --- | --- |
| POST | /resources | {key: value} | Create a new entity of type _resource_ with the contents in the payload |
| GET |  /resources | | Get all the entites of type _resource_ |
| GET |  /resources/:resourceId | | Get the entity of type _resource_ with the database ID of _:resourceId_ |
| PUT |  /resources/:resourceId | {key: value} | Update the entity of type _resource_ with the database ID of _:resourceId_, using the payload |
| DELETE |  /resources/:resourceId | | Remove the entity of type _resource_ with the database ID of _:resourceId_ |

