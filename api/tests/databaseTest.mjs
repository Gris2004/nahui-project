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

//fetchData
await recordsTest.fetchData('test').then(result => {
    console.log('Data Collection Succesful');
    console.log(result);
}).catch(err => {
    console.log('Error Message: ', err);
});

//describeTable
await recordsTest.describeTable('test').then(result => {
    console.log('Description Succesful');
    console.log(result);
}).catch(err => {
    console.log('Error Message: ', err);
});

//insertRecord
await recordsTest.insertRecord('test', ["test from node js"]).then(result => {
    console.log('Insertion Succeful');
    console.log(result);
}).catch(err => {
    console.log("Error Message: ", err);
});

await recordsTest.deleteRecord('test', 'id_test', 3).then(result => {
    console.log("Delete Succesful");
    console.log(result);
}).catch(err => {
    console.log("Error Message: ", err);
});

await recordsTest.updateRecord('test', ["name_test"], ["updated test from node js"], "id_test", 4).then(result => {
    console.log("Update Succesful");
    console.log(result);
}).catch(err => {
    console.log("Error Message: ", err);
});
