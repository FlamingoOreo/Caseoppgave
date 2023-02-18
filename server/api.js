const express = require('express');
const router = express.Router();
const db = require("./models/database.js")
const orgdataService = require('./services/OrgDataService')
const OrgData = new orgdataService(db)

db.sequelize.sync({ force: false })

router.get("/", async (req,res)=>{
    const results = await OrgData.getAllJoinInfo();  // Gets all the results from the join.
    res.send(results);
})

router.get('/:limit', async (req, res) => {
    const limit = parseInt(req.params.limit);
    const results = await OrgData.getSomeJoinInfo(limit); // Gets some of the result, depending on what the parameter number is set to.
    res.send(results);
  });

module.exports = router;