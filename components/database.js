const pg = require('pg');

const attributes = [
  'permissions',
  'offices',
  'accounts'
];

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


const clear = async () => {
  const get_tables = `SELECT table_name FROM information_schema.tables WHERE table_schema='public';`
  let names;
  try {
    names = await client.query(get_tables);
  } catch (err) {
    console.error(err);
    return;
  }
  
  for (const name of names.rows) {
    const sql = `
      DROP TABLE IF EXISTS ${name.table_name};
    `;
    try {
      await client.query(sql);
    } catch (err) {
      console.error(err);
      return;
    }
  }
};


const check = async () => {
  let server_table = await client.query("SELECT * FROM pg_catalog.pg_tables WHERE tablename = 'server';");
  server_table = server_table.rows;
  
  if (!server_table.length) {
    console.log('\tcreating table');
    await client.query("CREATE TABLE server (attribute TEXT, json TEXT);");
    
  } 

  for (let attribute of attributes) {
    let row = await client.query(`SELECT * FROM server WHERE attribute = '${attribute}';`);
    if (!row.rows.length) {
      console.log(`\tinserting ${attribute}`);
      
      await client.query(`INSERT INTO server 
VALUES ('${attribute}', '{}');`);
    }
  }
};


const getGlobals = async (attribute) => {
  if (!attributes.includes(attribute)) return 1;
  
  const query = await client.query(`
    SELECT json 
    FROM server 
    WHERE attribute = '${attribute}';
  `);
  return JSON.parse(query.rows[0].json);
}


const setGlobals = async (attribute, globals) => {
  if (!attributes.includes(attribute)) return 1;
  const val = JSON.stringify(globals[attribute]);
  
  await client.query(`
    UPDATE server 
    SET json = '${val}' 
    WHERE attribute = '${attribute}';
  `);
}


const getDB = async () => {
  client.on('error', err => {
    console.log('Database error!', err.stack)
  });
  
  await client.connect();
  await check();
  
  return {
    attributes: attributes,
    client: client,
    clear: clear,
    check: check,
    getGlobals: getGlobals,
    setGlobals: setGlobals,
    
  };
}


module.exports = {getDB};

/*

TABLE Server
TEXT Attribute       TEXT JSON

Perms            role permissions
Offices          list of roles the bot needs to track
                   eg. king, council, etc
Accounts         to keep track of user resources
                   if we implement economy

*/