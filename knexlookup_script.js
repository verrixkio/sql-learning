// node-postgres is a collection of node.js modules for interfacing with you PostgreSQL database.
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : "development",
    password : "development",
    database : 'test1_db'
  }
});
const prompt = process.argv[2]
let currentPlace = 0

knex('famous_people').select('*').then(function (info) { 
      getInfo(info)
      knex.destroy()
})

function getInfo (result) {
  for (names in result) {
    if (result[names].first_name === prompt) {
      currentPlace++
      //Convert Birthday into yeay
      let date = new Date(result[names].birthdate);
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let dt = date.getDate();
      
      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
      
      let birthdate = (year+'-' + month + '-'+dt);
      
      console.log(`- ${currentPlace}: ${result[names].first_name} ${result[names].last_name}, born '${birthdate}'`)
    }
  }
}