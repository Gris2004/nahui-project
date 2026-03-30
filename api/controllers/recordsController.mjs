import { db, dbPath, testConnection } from '../db/dbUtils.mjs'

export default class RecordsController{
    constructor(db){
        this.db = db;
    }

    /**
     * fetchData
     * @param {string} tableName - the table's name to make a consult*/
    fetchData(tableName){
        const query = `SELECT * FROM ${tableName}`;
        
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    /**
     * describeTable
     * @param {string} tablename - the table's name for do the consult
     * @return {string[]} rows - the fields table*/
    describeTable(tableName){
        const query = `PRAGMA table_info(${tableName})`;

        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if(err) reject(err);
                else {
                    const fields = rows.map(col => col.name);
                    resolve(fields);
                }
            });
        });
    }

    /**
     * insertRecord
     * @param {string} tableName - The table's name for insert record
     * @param {string[]} arrayFields - The fields for insert the table*/
    insertRecord(tableName, arrayFields){
        const fields = arrayFields.join(", ");
        
        const query = ``;
    }

}


