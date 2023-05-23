// hooks
//Judah added:
//this will not work, bc theres no database and we would have to install pg
//but please edit if syntax is wrong
const Pool = require('pg').Pool
//setting up connection to fake db
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'madeup',
  password: 'something',
  port: 5432,
})
//defining the query
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
//this is what runs in the event listener below
async function displayDate() {
    let now = new Date();
    //first get all endpoints by querying the db
    const endpoints = await getUsers();
    endpoints.forEach(endpoint => {
        let xhttp = new XMLHttpRequest(now); 
        xhttp.open("POST", endpoint, true);
        xhttp.send();
    })
    

}
//this is actually the event listener
document.getElementById("myBtn").addEventListener("click", displayDate);