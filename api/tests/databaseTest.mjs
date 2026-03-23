import { db, dbPath, testConnection } from '../db/dbUtils.mjs';
import RecordsController from '../controllers/recordsController.mjs';

//test connection
console.log('starting: testConnection...');

console.log(dbPath);

testConnection(db).then(result => {
    console.log('conexión exitosa');
    console.log(result);
}).catch(err => {
    console.log("error message: ", err);
});
//----------------------------------------------------
//RecordsController
const recordsTest = new RecordsController(db);

//DescribeTable
recordsTest.fetchData('test').then(result => {
    console.log('Description Succesful');
    console.log(result);
}).catch(err => {
    console.log('Error Message: ', err);
});
