import mysql from 'mysql'

export const db = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b63046b2f41aa5",
    password: "c10065de",
    database: "heroku_9d098381e146e66"
})


