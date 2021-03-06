/* eslint-disable no-underscore-dangle */
import Db from '../config/connection';

const pool = Db.getInstance();

class Model {
  constructor(table) {
    // eslint-disable-next-line no-underscore-dangle
    this._table = table;
  }

  async findById(id, field) {
    this.field = field;
    this.id = id;

    this.sql = `SELECT  ${this.field} FROM ${this._table} WHERE id = $1`;
    const client = await pool;

    return client.query(`${this.sql}`, [this.id]);
  }

  async find(fieldObject, field = '*') {
    this.fieldArray = Object.keys(fieldObject);
    [this.fieldName] = this.fieldArray;

    this.fieldValue = Object.values(fieldObject);
    this.field = field;


    this.sql = `SELECT ${this.field} FROM ${this.table} WHERE ${this.fieldName} = $1 `;
    const client = await pool;
    return client.query(`${this.sql}`, this.fieldValue);
  }

  async findAll(field) {
    this.field = field;
    this.sql = `SELECT ${this.field} FROM ${this._table}`;
    const client = await pool;

    return client.query(`${this.sql}`);
  }

  async insert(params) {
    this.fieldKey = Object.entries(params);
    this.valueArray = Object.values(params);


    this.fieldString = '';
    this.fieldValue = '';
    this.values = [];

    this.x = 1;
    this.fieldKey.forEach(([key, value]) => {
      this.fieldString += `${key},`;
      this.fieldValue += `$${this.x},`;
      this.values.push(value);
      this.x += 1;
    });

    this.fieldString = this.fieldString.trim().slice(0, -1);
    this.fieldValue = this.fieldValue.trim().slice(0, -1);

    this.queryText = `INSERT INTO ${this._table} (${this.fieldString}) VALUES (${this.fieldValue}) RETURNING *`;

    const client = await pool;

    return client.query(`${this.queryText}`, this.values);
  }

  async update(accountNum, params) {
    this.fieldKey = Object.entries(params);
    this.valueArray = Object.values(params);


    this.x = 1;
    this.accountnum = accountNum;
    this.fieldString = '';
    this.fieldValue = '';
    this.values = [];

    this.fieldKey.forEach(([key, value]) => {
      this.fieldString += `${key} = $${this.x}, `;
      this.x += 1;
      this.values.push(value);
    });

    this.fieldString = this.fieldString.trimEnd().slice(0, -1);
    this.sql = `UPDATE ${this._table} SET ${this.fieldString} WHERE accountnum  = ${this.accountnum} RETURNING *`;

    const client = await pool;

    return client.query(`${this.sql}`, this.values);
  }

  async delete(accountNum) {
    this.accountNum = accountNum;

    this.sql = `DELETE FROM ${this._table} WHERE accountnum= $1 RETURNING *`;
    const client = await pool;

    return client.query(`${this.sql}`, [this.accountNum]);
  }
}
export default Model;
