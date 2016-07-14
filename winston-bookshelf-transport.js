/*
 * winston-bookshelf-transport - A winston transport for use with bookshelfjs
 *
 * License : Public domain
 * Author: Mike Qin
 */

var util = require('util'),
    winston = require('winston');

//export name here can't be just "bookshelf" because of conflict
var BookshelfTransport = exports.BookshelfTransport = function(options) {

    this.options = options || {};

    if (!options.model)
        throw new Error('A Bookshelf model used for logging is required');

};

// Inherit from `winston.Transport`.
util.inherits(BookshelfTransport, winston.Transport);

// Define a getter so that `winston.transports.Mysql`
// is available and thus backwards compatible.
winston.transports.BookshelfTransport = BookshelfTransport;

// Expose the name of this Transport on the prototype
BookshelfTransport.prototype.name = 'BookshelfTransport';

/**
 *
 * @param level {string} Level at which to log the message.
 * @param  msg {string} Message to log
 * @param meta {Object} **Optional** Additional metadata to attach
 * @param callback
 *
 Core logging method exposed to Winston. Metadata is optional.
 */

BookshelfTransport.prototype.log = function(level, msg, meta, callback) {
    var self = this;
    var model = self.options.model;
    model.forge({level:level, message:msg, meta:meta, created_at: self.getDateTime()})
        .save()
        .then(function(log){
            //can do something with the newly inserted log object here
            self.emit('logged');
            callback(null, true);
        })
        .catch(function(e){
            self.emit('error', e);
            console.log(e)
            return callback(e, null);
        });
};

BookshelfTransport.prototype.getDateTime = function(){
    var now = new Date();
    return now.toUTCString();
};
