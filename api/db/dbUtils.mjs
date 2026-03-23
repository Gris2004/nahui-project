import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
//configure dotenv
const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({path: envPath});

/**
 * testConnection: makes a consult for sqlite3 for return a promise
 * @param [sqlite3.Database] db - db for make consults to database
 * @return [Promise] - all tables or an error connection*/
const testConnection = (db) => {
    const query = "SELECT name FROM sqlite_master WHERE type='table';";
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if(err) reject(err);
            else{
                resolve(rows)
            }
        });
    });
};

/**
 *dbPath takes the value from the .env and create an absolute path for open the db
 *@return [path.resolve] dbRoute - the variable for open the database from any directory
*/
const dbPath = path.resolve(__dirname, "./archivo.db");
const db = new sqlite3.Database(dbPath)

//test
export { db, dbPath, testConnection };
