/**
 * CourseRepository class deals with persistence
 *
 * References:
 * 1. A simple REST API with Node.js and Express (https://gist.github.com/erichonorez/4750663)
 * 2. Node.js Module Patterns using Simple Example (https://darrenderidder.github.io/talks/ModulePatterns/#/)
 */
var CourseRepository = function () {
    this.courses = require( './courses-data.json' );
    this.nextId = this.courses.length;
}
/**
 * Count the number of courses
 * Returns: number of courses
 */
CourseRepository.prototype.count = function () {
    return this.courses.length;
}
/**
 * Find a course by id
 * Param: id of the course to find
 * Returns: the course corresponding to the specified id
 */
CourseRepository.prototype.find = function (id) {
    var course = this.courses.filter(function(course) {
        return course.courseId == id;
    })[0];
    if (null == course) {
        throw new Error('course not found');
    }
    return course;
}
/**
 * Find the index of a course
 * Param: id of the course to find
 * Returns: the index of the course identified by id
 */
CourseRepository.prototype.findIndex = function (id) {
    var index = null;
    this.courses.forEach(function(course, key) {
        if (course.courseId == id) {
            index = key;
        }
    });
    if (null == index) {
        throw new Error('course not found');
    }
    return index;
}
/**
 * Retrieve all courses
 * Returns: array of courses
 */
CourseRepository.prototype.findAll = function () {
    return this.courses;
}
/**
 * Save a course (create or update)
 * Param: course the course to save
 */
CourseRepository.prototype.save = function (course) {
    if (course.courseId == null || course.courseId == 0) {
        course.courseId = this.nextId;
        this.courses.push(course);
        this.nextId++;
    } else {
        var index = this.findIndex(course.courseId);
        this.courses[index] = course;
    }
}
/**
 * Remove a course
 * Param: id the of the course to remove
 */
CourseRepository.prototype.remove = function (id) {
    var index = this.findIndex(id);
    this.courses.splice(index, 1);
    this.nextId = this.nextId - 1;
}

exports.CourseRepository = new CourseRepository();
