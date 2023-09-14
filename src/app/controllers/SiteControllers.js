const Course = require('../models/Courses')
// Đối với phiên bản hiện tại của handlebar thì sẽ không cần viết tool chuyển sang object nữa, 
// cứ truyền thẳng vào
// const {mutipleMongoosesObject} = require('../../util/mongoose')

//chứa function handler
class SiteControllers {
    // [GET] /news
    index(req, res) {
        Course.find({}).lean()
            .then(courses => {
                res.render('home', {
                    courses
                })
            })
            .catch(error => 
                res.status(400).send('Internal Server Error'))
    }
    // [GET] : /search/slug
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteControllers();
