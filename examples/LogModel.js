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