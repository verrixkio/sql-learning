const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : "development",
    password : "development",
    database : 'test1_db'
  }
});
const prompt = process.argv.splice(2)
const first = prompt[0]
const last = prompt[1]
const birthday = prompt[2]

knex('famous_people').insert({first_name: first, last_name: last, birthdate: birthday})
.then( function (result) {
    console.log(result, "this happened")
    knex.destroy()
 })

console.log(prompt)