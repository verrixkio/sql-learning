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




client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      console.log(result)
      return console.error("error running query", err);
      
    }
    console.log(result.rows[0].number); //output: 1
    client.end();
  });
});