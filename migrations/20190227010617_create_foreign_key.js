
exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.table('milestones', function(table){
      table.integer("foreign_key_id").unsigned();
      table.foreign("foreign_key_id").references("famous_people.id");
    })
  ])
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.table('milestones', function(t) {
      t.dropForeign('foreign_key_id');
      t.dropColumn('foreign_key_id');
    })
  ])
};
