const { Pool } = require('pg');

// set up connection to the bootcampx database (will need to store pw using env vars later)
// client <--> pool - either can be used but pool is preferred 
// pool will manage multiple clinet connections for us 
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// start querying the database
// pool query is a function that accepts an SQL query as a JS string - using backticks can write multi-line string

// write parametrized queries to prevent SQL injection attacks



const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

// write query that returns a promise containing result
pool
.query(queryString, values)
// if promise resolves --> print the response 
.then(res => {
  // prints rows --> array of JS objects 
  // use template literals to create a more powerful query
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`); 
  })
})
// if promise fails (error) --> print error
.catch(err => console.error('query error', err.stack));

// output produces an object 
// rows property contains array of expected results 

// JS produces same data as SQL query h/e JS output givces us JS objects 





