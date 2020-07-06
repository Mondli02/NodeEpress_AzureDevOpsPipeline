const express = require("express");
const router = express.Router();


const metersConroller = require('../controllers/meters');

//Handle incoimg GET requests to /meters 
router.get("/",metersConroller.meters_get_all);
router.get("/:meterid", metersConroller.get_meterBySerialNumber);
router.post("/", metersConroller.create_meters);
router.delete("/:meterid",metersConroller.delete_metersByID);
module.exports=router;