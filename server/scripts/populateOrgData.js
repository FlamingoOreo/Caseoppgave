const parse = require('csv-parser');
const fs = require('fs');
const db = require("../models/database.js")
const orgdataService = require('../services/OrgDataService')
const OrgData = new orgdataService(db)

const csvFilePath = ("./data/orgdata.csv");

const parser = parse({
    delimiter: ',',
    quote: '"',
    escape: '\\',
    trim: true
  });

  fs.createReadStream(csvFilePath)
  .pipe(parser)
  .on('data', async (row) => {
    await OrgData.create(parseInt(row.organisasjonsnummer),row.navn,row.organisasjonsformkode,row.registreringsdato);
  })
  .on('error', (err) => {
    console.error(err);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });