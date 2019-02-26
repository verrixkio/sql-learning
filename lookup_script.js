// node-postgres is a collection of node.js modules for interfacing with you PostgreSQL database.
const pg = require('pg');

// Information from the settings.json.
const settings = require('./settings');


// Information concerning where we're connecting, credentials to do so, host, port, sockets
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const prompt = process.argv[2]
let currentPlace = 0
console.log(prompt)

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    
    } else {
      getInfo(result)
    client.end();
    }
  });
});

function getInfo (result) {
  for (names in result.rows) {
    if (result.rows[names].first_name === prompt) {
      currentPlace++
      //Convert Birthday into year.
      let date = new Date(result.rows[names].birthdate);
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
      
      console.log(`- ${currentPlace}: ${result.rows[names].first_name} ${result.rows[names].last_name}, born '${birthdate}'`)
    }
  }
}