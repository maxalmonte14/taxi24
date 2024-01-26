import * as postgres from 'postgres';

const sql = postgres('postgres://postgres:1234@127.0.0.1:9000/taxi24');

export default sql;
