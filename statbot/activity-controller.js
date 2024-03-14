const Activity= require("./Activity")
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');
const getallactivities = async (req, res, next) => {
    let activities;
    try {
        activities = await Activity.find();
    } catch (err) {
        return next(err);
    }
    if (!activities) {
        return res.status(500).json({ message: "internal server error" });
    }
  activities.forEach(activity => {
    activity.date = activity.date.toISOString().slice(0, 16).replace('T', ' '); // Format: YYYY-MM-DDTHH:MM -> YYYY-MM-DD HH:MM
});

const fields = ['nb_active', 'date'];
const json2csvParser = new Parser({ fields });
const csv = json2csvParser.parse(activities);

const outputDir = path.join(__dirname, '..', 'output');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const filePath = path.join(outputDir, 'activities.csv');
fs.writeFileSync(filePath, csv, 'utf8');

return res.status(200).send(csv);
};

const addactivity = async (req, res, next) => {
    const { nb_active } = req.body;
    try {
        const activity = new Activity({ nb_active, date: Date.now() });
        const savedActivity = await activity.save();
        res.status(201).json({ activity: savedActivity });
    } catch (err) {
        next(err);
    }
};

exports.addactivity = addactivity;
exports.getallactivities=getallactivities;
