const db = require("../models/database.js")
const orgDataService = require('../services/OrgDataService')
const orgInfoService =  require('../services/OrgInfoService')
const OrgData = new orgDataService(db)
const OrgInfo = new orgInfoService(db)

OrgData.deleteAll()
OrgInfo.deleteAll()