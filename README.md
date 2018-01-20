# RESTful API Server for Mobile Application Design & Development (MAD&D)

## API Documentation
1. https://madd.mybluemix.net/api-docs

## Installation (localhost)
1. git clone https://github.com/hurdleg/madd-rest-server
2. cd madd-rest-server
3. npm install

> This step is done once.

## Usage (localhost)
1. npm start
2. Open a browser
   * http://localhost:3000
   * http://localhost:3000/courses
   * http://localhost:3000/courses/{0..3}
3. To stop the Express server, type `control-C`

## Error Handling
1. http://localhost:3000/bogus

   404 - Not Found

2. http://localhost:3000/courses/4

   404 - Course with Id 4 not found!

## Installation (Bluemix)
1. build and test app http://localhost:3000
2. add: mainfest.yml
3. edit: ./bin/www > var port = normalizePort(process.env.VCAP_APP_PORT || '3000');
4. edit: package.json > add: cf modules
5. copy: .cfignore
6. cf login # email / pw
7. cf push

## Usage (Bluemix)
1. Open a browser
   * https://madd.mybluemix.net
   * https://madd.mybluemix.net/courses
   * https://madd.mybluemix.net/courses/{0..4}

#### Enjoy!      
*hurdleg*

## Source Code
Available from GitHub:
https://github.com/hurdleg/madd-rest-server
