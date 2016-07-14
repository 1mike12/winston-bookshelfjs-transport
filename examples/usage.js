var winston = require('winston');

// Requiring `winston-bookshelf-transport` will expose `winston.transports.Bookshelf`
require('./modules/log/winston-bookshelf-transport').BookshelfTransport;

options = {
    model: require("./models/Log")
};

var logger = new (winston.Logger)();
logger.add(winston.transports.BookshelfTransport, options);
logger.info("test");