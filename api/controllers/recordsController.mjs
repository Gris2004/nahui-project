export default class RecordsController{
    constructor(db){
        this.db = db;
    }

    /**
     * fetchData
     * @param {string} tableName - the table's name to make a consult*/
    async fetchData(tableName){
        const query = `SELECT * FROM ${tableName}`;
        
        return new Promise((resolve, reject) => {
            this.db.all(query, [], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    /**
     * describeTable
     * @param {string} tablename - the table's name for do the consult
     * @return {string[]} fields - the fields table*/
    async describeTable(tableName){
        const query = `PRAGMA table_info(${tableName})`;

        return new Promise((resolve, reject) => {
            this.db.all(query, [], (err, rows) => {
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
     * @param {string[]} array - The fields for insert the table*/
    async insertRecord(tableName, array){
        //Getting the fields array from the promise of describeTable
        const arrayColumns = await this.describeTable(tableName);
        arrayColumns.splice(0, 1);

        //Joining the arrays in a string
        const columns = arrayColumns.join(", ");
            
        //joining the array in a string called arrayRecord 
        let record = array.map(() => '?').join(', ');
            
        //running the query
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${record})`;
        console.log(record);

        return new Promise((resolve, reject) => {
            this.db.run(query, array, (err) => {
                if(err) reject(err);
                else resolve(query);
            });
        });
    }

}


