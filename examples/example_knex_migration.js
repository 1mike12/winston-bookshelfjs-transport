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
