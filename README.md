A bookshelfjs transport for [winston][0].
Built off of work done by sapher's [mysql-wisnton-transport][1]

## Installation

``` sh
  $ npm install bookshelf
  $ npm install knex
  $ npm install winston
  $ npm install winston-bookshelfjs-transport
```

## Usage

First you must generate your log table migration

``` javascript
var TABLE_NAME = "logs";
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists(TABLE_NAME, function (table){
        table.increments();
        table.string("level");
        table.string("message");
        table.string("meta");

        table.timestamps();
        table.dateTime("deleted_at");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists(TABLE_NAME)
};

```

Then make your log model 
``` javascript
var bookshelf = require('./your-bookshelf-file');
var tableName = "logs";

var instanceMembers = function(){
    var self = this;
    self.tableName = tableName;
};

var staticMembers = function(){
    var self = this;

    self.tableName = tableName;
    self.requiredColumns = [];
};

module.exports = bookshelf.Model.extend(new instanceMembers, new staticMembers);
```

Ready to use

``` js
var winston = require('winston');

// Requiring `winston-bookshelf-transport` will expose `winston.transports.Bookshelf`
require('./modules/log/winston-bookshelf-transport').BookshelfTransport;

options = {
    model: require("./models/Log")
};

var logger = new (winston.Logger)();
logger.add(winston.transports.BookshelfTransport, options);
logger.info("test");
```
[0]: https://github.com/flatiron/winston
[1]: https://www.npmjs.com/package/winston-mysql-transport
