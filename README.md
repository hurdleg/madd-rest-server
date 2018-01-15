# RESTful API Server for Mobile Application Design & Development (MAD&D)

## Suported RESTful API

| Title                  | URL                     | Request type | Parameters | Expected Responses         |
|------------------------|:-----------------------:|:------------:|:----------:|:--------------------------:|
| Get list of courses    | /courses                | GET          | n/a        | Success: 200, Failure: 404 |
| Get number of courses  | /courses/count          | GET          | n/a        | Success: 200, Failure: 404 |
| Get course by ID       | /courses/:courseId      | GET          | courseId   | Success: 200, Failure: 404 |
| Create course          | /courses                | POST         |            | Success: 200, Failure: 404 |
| Create course          | /courses/form           | POST         |            | Success: 200, Failure: 404 |
| Update course by ID    | /courses/:courseId      | PUT          | courseId   | Success: 200, Failure: 404 |
| Update course by ID    | /courses/:courseId/form | PUT          | courseId   | Success: 200, Failure: 404 |
| Delete course by ID    | /courses/:courseId      | DELETE       | courseId   | Success: 200, Failure: 404 |

## Installation (Bluemix)
1. build and test app http://localhost:3000
2. add: mainfest.yml
3. edit: ./bin/www > var port = normalizePort(process.env.VCAP_APP_PORT || '3000');
4. edit: package.json > add: cf modules
5. copy: .cfignore
6. cf login # email / pw
7. cf push

Enjoy!

## Installation (localhost)
Grab all of the required node modules for this app.
1. npm install

> This step is done once.

## Usage (Bluemix)
1. Open a browser
   * https://madd.mybluemix.net
   * https://madd.mybluemix.net/courses
   * https://madd.mybluemix.net/courses/{0..4}

## Source Code
Available from GitHub:
https://github.com/hurdleg/madd-rest-server
