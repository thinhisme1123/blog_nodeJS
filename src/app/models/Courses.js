const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Course = new Schema({
    _id: {type:Number},
    name: { type: String, require:true},
    desc: { type: String},
    image: { type: String},
    videoId: {type:String,require:true},
    level: {type:String},
    slug: { type: String, slug: 'name',unique :true}
}, {
    _id: false,
    timestamps:true
});

// add plugin
Course.plugin(AutoIncrement,{ inc_field: '_id' });
Course.plugin(mongooseDelete,{ overrideMethods: 'all' });
mongoose.plugin(slug);
// tham số cuối cùng là tên của collection trong db 
module.exports = mongoose.model('Model', Course, 'courses')