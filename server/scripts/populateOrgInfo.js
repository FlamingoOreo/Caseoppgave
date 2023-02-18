const parse = require('csv-parser');
const fs = require('fs');
const db = require("../models/database.js")
const orgInfoService = require('../services/OrgInfoService')
const OrgInfo = new orgInfoService(db)

const csvFilePath = ("./data/orginfo.csv");

const parser = parse({
    delimiter: ',',
    quote: '"',
    escape: '\\',
    trim: true
  });

  fs.createReadStream(csvFilePath)
  .pipe(parser)
  .on('data', async (row) => {
    console.log(row.organisasjonsformkode)
    await OrgInfo.create(row.organisasjonsformkode,row.orgformbeskrivelse);
  })
  .on('error', (err) => {
    console.error(err);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });