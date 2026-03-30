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


    /**
     * erases the table with a table's name and an id of the record
     * @param {string} tableName - the name of the table
     * @param {string} fieldName - the field's name for delete the record
     * @param {string/int} judgement - the criterion for delete the record
     * @return {Promise} [resolve query,reject error] - the query used for drop the table or an error
     * */
    async deleteRecord(tableName, fieldName, judgement) {
        //running the query
        const query = `DELETE FROM ${tableName} WHERE ${fieldName} = ?`;
        
        return new Promise((resolve, reject) => {
            this.db.run(query, judgement, (err) => {
                if(err) reject(err);
                else resolve(query);
            });
        });
    }
 
    /**
     * updates a record
     * @param {string} tableName - The name of the table
     * @param {string[]} keyFields - The names of the fields that you wanna change
     * @param {*[]} fieldValues - The new values of the fields that you wanna change
     * @param {string} idName - the name of the field which contains the idRecord
     * @param {int} idRecord - the identifier of the record 
     * @return {Promise} [resolve query, reject err] - returns a query or an error
     * */
    async updateRecord (tableName, keyFields, fieldValues, idName, idRecord) { 
        if(keyFields.length !== fieldValues.length) 
            throw new Error("Error message: the length of the arrays don't match");

        //contains the strings for set the fiels of the record
        //Example: SET name = gris where id = 1; name belongs to keyFields, gris belongs to fieldValues
        let settersArray = keyFields.map(field =>`${field} = ?`);
        
        //joinning settersArray
        const settersQuery = settersArray.join(', ');
        
        //the complete query using the tableName, the setterQuery and the idName
        const completeQuery = `UPDATE ${tableName} SET ${settersQuery} WHERE ${idName} = ?`; 
        
        const values = [...fieldValues, idRecord];

        return new Promise((resolve, reject) => {
            this.db.run(completeQuery, values, (err) => {
                if(err) reject(err);
                else resolve(completeQuery);
            });
        });
    }
}


