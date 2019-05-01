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
    try {
      const result = await client.query(`${this.sql}`, [this.id]);
      console.log(result.rows);
    } catch (err) {
      console.log(err);
    } finally {
      await client.end();
    }
  }

  async findAll(field) {
    this.field = field;
    this.sql = `SELECT ${this.field} FROM ${this._table}`;
    const client = await pool;
    try {
      const result = await client.query(`${this.sql}`);
      console.log(result.rows);
    } catch (err) {
      console.log(err);
    } finally {
      await client.end();
    }
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

    this.queryText = `INSERT INTO ${this._table} (${this.fieldString}) VALUES (${this.fieldValue})`;
    console.log(this.queryText);
    const client = await pool;
    try {
      const result = await client.query(`${this.queryText}`, this.values);
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      await client.end();
    }
  }

  async update(id, params) {
    this.fieldKey = Object.entries(params);
    this.valueArray = Object.values(params);
    this.x = 1;
    this.id = id;
    this.fieldString = '';
    this.fieldValue = '';
    this.values = [];

    this.fieldKey.forEach(([key, value]) => {
      this.fieldString += `${key} = $${this.x}, `;
      this.x += 1;
      this.values.push(value);
    });

    this.fieldString = this.fieldString.trimEnd().slice(0, -1);
    this.sql = `UPDATE ${this._table} SET ${this.fieldString} WHERE id  = $1`;
    const client = await pool;
    try {
      const result = await client.query(`${this.sql}`, this.values);
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      await client.end();
    }
  }

  static delete(id) {
    this.id = id;

    this.sql = `DELETE FROM ${this._table} WHERE id= $1`;
    console.log(this.sql);
  }
}
export default Model;