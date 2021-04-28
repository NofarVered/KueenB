import Pool from 'pg'

const pool = new Pool.Pool({
    host: 'localhost', //when we run localy
    //when we want to run with docker we need to change to postgers
    port: 5432,
    user: 'admin',
    password: 'admin',
    database: 'employees'
});

export default pool
