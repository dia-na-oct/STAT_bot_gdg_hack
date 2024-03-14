const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const activeSchema=new Schema({
    nb_active: {
        type: Number,
        default: true 
    },
    date: {
        type: Date,
        default: Date.now 
    }
});

module.exports=mongoose.model("Activity",activeSchema);

