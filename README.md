# RESTful API Server for Mobile Application Design & Development (MAD&D)

### API Documentation

1. https://madd.mybluemix.net/api-docs

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
