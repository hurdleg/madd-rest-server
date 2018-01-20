var express = require('express');
var multer = require('multer');						// for parsing multipart/form-dat
var upload = multer();

var coursesDB = require('../data/courses.js').CourseRepository;

var courseRouter = express.Router();

/**
 * HTTP GET /courses
 * Returns: the list of courses in JSON format
 */
courseRouter.route('/')
.get(function (request, response, next) {
    response.json( coursesDB.findAll() );
})

/**
 * HTTP POST /course
 * Create a new course.
 * Param: course JSONObject
 * Returns: the newly created courses in JSON
 * Error: 405 HTTP code if the course cannot be created
 */
.post(function (request, response, next) {
    // Validation rule: mandatory properties
    if ( request.body.code == null ) {
        return response.status( 405 ).json( {message: "Error: missing code (string)"} );
    }
    if ( request.body.name == null ) {
        return response.status( 405 ).json( {message: "Error: missing name (string)"} );
    }
    if ( request.body.description == null ) {
        return response.status( 405 ).json( {message: "Error: missing description (string)"} );
    }
    if ( request.body.level == null ) {
        return response.status( 405 ).json( {message: "Error: missing level (int)"} );
    }

    // Validation rule: force courseId (if exists)
    if ( request.body.courseID != null ) {
        request.body.courseId = 0;
    }

    coursesDB.save( request.body );
    response.json( request.body );
    console.log( 'POST (create) course: ' + request.body.code );
    console.log( request.body );
});

/**
 * HTTP POST /courses/form
 * Create a new course using a multipart form
 * Param: course JSONObject
 * Returns: the newly created course in JSON
 * Error: 405 HTTP code if the course cannot be created
 */
courseRouter.route('/form')
.post(upload.array(), function (request, response, next) {
    // Validation rule: mandatory properties
    if ( request.body.code == null ) {
        return response.status( 405 ).json( {message: "Error: missing code (string)"} );
    }
    if ( request.body.name == null ) {
        return response.status( 405 ).json( {message: "Error: missing name (string)"} );
    }
    if ( request.body.description == null ) {
        return response.status( 405 ).json( {message: "Error: missing description (string)"} );
    }
    if ( request.body.level == null ) {
        return response.status( 405 ).json( {message: "Error: missing level (int)"} );
    }

    // Validation rule: force coursesId (if exists)
    if (request.body.courseId != null) {
        request.body.courseId = 0;
    }

    request.body.level = parseInt(request.body.level);
    if ( (request.body.level < 1) || (request.body.level > 4) ) {
        return response.status( 405 ).json( {message: "Level must be in range 1 to 4 (inclusive)"} );
    }

    coursesDB.save( request.body );
    response.json( request.body );
    console.log( 'POST (form) course: ' + request.body.code );
    console.log( request.body );
});

/**
 * HTTP GET /courses/count
 * Returns: the number of courses
 */
courseRouter.route('/count')
.get(function (request, response, next) {
    response.status(200).json({message: coursesDB.count()});
});

/**
 * HTTP GET /courses/:courseId
 * Param: :courseId is the unique identifier of the course you want to retrieve
 * Returns: the course with the specified :courseId in JSON
 * Error: 404 HTTP code if the course doesn't exist
 */
courseRouter.route('/:courseId')
.get(function (request, response, next) {
    try {
        response.json( coursesDB.find(request.params.courseId) );
    } catch (exception) {
        response.status( 404 )
                .json( {message: "Course with Id " + request.params.courseId + " not found!"} );
    }
})

/**
 * HTTP PUT /courses/:courseId
 * Param: :courseId is the unique identifier of the course you want to update
 * Returns: the updated course in JSON
 * Error: 404 HTTP code if the course doesn't exist
 * Error: 405 HTTP code if the course can't be updated
 */
.put(function (request, response, next) {
    try {
        theCourse = coursesDB.find( request.params.courseId );

        // Validation rule: mandatory properties
        if ( request.body.code == null ) {
            return response.status( 405 ).json( {message: "Error: missing code (string)"} );
        }
        if ( request.body.name == null ) {
            return response.status( 405 ).json( {message: "Error: missing name (string)"} );
        }
        if ( request.body.description == null ) {
            return response.status( 405 ).json( {message: "Error: missing description (string)"} );
        }
        if ( request.body.level == null ) {
            return response.status( 405 ).json( {message: "Error: missing level (int)"} );
        }

        request.body.level = parseInt(request.body.level);
        if ( (request.body.level < 1) || (request.body.level > 4) ) {
            return response.status( 405 ).json( {message: "Level must be in range 1 to 4 (inclusive)"} );
        }    

        // Validation rule: body's courseId must match query param's courseId
        if ( request.body.courseId != null ) {
            if (request.body.courseId != request.params.courseId) {
                return response.status( 405 )
                        .json( {message: "Error: courseId does not match"} );
            }
        }

        theCourse.courseId = parseInt(request.params.courseId);
        theCourse.code = request.body.code;
        theCourse.name = request.body.name;
        theCourse.description = request.body.description;
        theCourse.level = request.body.level;

        coursesDB.save( theCourse );
        response.json( theCourse );
        console.log( 'PUT (update) course: ' + request.body.code );
        console.log( theCourse );

    } catch (expection) {
        console.log( expection );
        response.status( 404 )
                .json( {message: "Course with Id " + request.params.courseId + " not found!"} );
    }
})

/**
 * HTTP DELETE /courses/:courseId
 * Param: :courseId is the unique identifier of the course you want to delete
 * Returns: the course with the specified :courseId in a JSON format
 * Error: 404 HTTP code if the course doesn't exist
 */
.delete(function (request, response, next) {
    try {
        theCourse = coursesDB.find( request.params.courseId );
        var index = coursesDB.findIndex( theCourse.courseId );
        coursesDB.remove( index );
        response.json( theCourse );
        console.log( 'DELETE course Id: ' + theCourse.courseId );
        console.log( JSON.stringify(theCourse) );
    } catch (exception) {
        console.log(exception);
        response.status( 404 )
                .json( {message: "Course with Id " + request.params.courseId + " not found!"} );
    }
});

/**
 * HTTP PUT /courses/:courseId/form
 * Update an existing course using a multipart form
 * Param: :courseId is the unique identifier of the course you want to update
 * Returns: the updated course in JSON
 * Error: 404 HTTP code if the course doesn't exist
 * Error: 405 HTTP code if the course cannot be updated
 */
courseRouter.route('/:courseId/form')
.put(upload.array(), function (request, response, next) {
    try {
        theCourse = coursesDB.find( request.params.courseId );

        // Validation rule: mandatory properties
        if ( request.body.code == null ) {
            return response.status( 405 ).json( {message: "Error: missing code (string)"} );
        }
        if ( request.body.name == null ) {
            return response.status( 405 ).json( {message: "Error: missing name (string)"} );
        }
        if ( request.body.description == null ) {
            return response.status( 405 ).json( {message: "Error: missing description (string)"} );
        }
        if ( request.body.level == null ) {
            return response.status( 405 ).json( {message: "Error: missing level (int)"} );
        }

        request.body.level = parseInt(request.body.level);
        if ( (request.body.level < 1) || (request.body.level > 4) ) {
            return response.status( 405 ).json( {message: "Level must be in range 1 to 4 (inclusive)"} );
        }    

        // Validation rule: body's courseId must match query param's courseId
        if ( request.body.courseId != null ) {
            if (request.body.courseId != request.params.courseId) {
                return response.status( 405 )
                        .json( {message: "Error: courseId does not match"} );
            }
        }

        theCourse.courseId = parseInt(request.params.courseId);
        theCourse.code = request.body.code;
        theCourse.name = request.body.name;
        theCourse.description = request.body.description;
        theCourse.level = request.body.level;

        coursesDB.save( theCourse );
        response.json( theCourse );
        console.log( 'PUT (update) course: ' + request.body.code );
        console.log( theCourse );

    } catch (expection) {
        console.log( expection );
        response.status( 404 )
                .json( {message: "Course with Id " + request.params.courseId + " not found!"} );
    }
});

module.exports = courseRouter;
