
exports.up = function(knex, Promise) {
  return knex.schema.createTable('yarns', function (table) {
    table.increments();
    table.string('name');
    table.string('colorway');
    table.enum('weight', [
      'thread',
      'cobweb',
      'lace',
      'light fingering',
      'fingering',
      'sport',
      'dk',
      'worsted',
      'aran',
      'bulky',
      'super bulky']);
    table.integer('yardage');
    table.float('ounces');
    table.boolean('discontinued');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('yarns');
};
