import { db, dbPath, testConnection } from '../db/dbUtils.mjs'

export default class RecordsController{
    constructor(db){
        this.db = db;
    }

    fetchData(tableName){
        const query = `SELECT * FROM ${tableName}`;
        
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }
}


