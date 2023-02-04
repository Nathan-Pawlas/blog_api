import mysql from 'mysql'

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "BuzzyGok!1",
    database: "blog"
})

