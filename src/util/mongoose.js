module.exports = {
    mutipleMongoosesObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toOject())
    },
    mongoosesObject: function (mongoose) {
        return mongoose ? mongoose.toOject() : mongoose
    },
}