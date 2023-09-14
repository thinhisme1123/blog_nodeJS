const mongoose = require('mongoose');
//Không dùng localhost thay cho 127.0.0.1 được, phải là 127.0.0.1 thì mới connect được
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/f8_education');
        console.log("Connect successfully !")
    } catch (error) {
        console.log("Connect fail !")
        
    }
}

module.exports = {connect}