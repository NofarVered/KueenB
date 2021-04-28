import pool from './db.js';

class settingsModel {
    static querySettings = async function (param) {
        try {
            console.log('Querying settings for '.concat(param));
            const results = await pool.query(`SELECT value from settings where name = $1`, [param]);
            const value = results.rows[0].value;
            console.log('Query settings result=> ' + param + ': ' + value);
            return value;
        }
        catch(e){
            console.error(e);
            return null;
        }
    };

    static updateSettings = async function () {
        try {
            let result = await pool.query(`UPDATE maxPeople SET numberOfPeople = $1 WHERE ID = $2`, [maxPeople, 1]);
            // const results = await pool.query('SELECT * FROM maxPeople'); \\ todo: it this needed or is it returned in the result above?
            return true
        }
        catch(e){
            console.log(e);
            return false;
        }
    };
}


export default settingsModel;
