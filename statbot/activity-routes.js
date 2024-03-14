const express= require('express');
const { getallactivities, addactivity } = require('./activity-controller');

const router=express.Router();

router.get("/",getallactivities);
router.post("/",addactivity);

module.exports=router;

