//chứa function handler
const Course =  require('../models/Courses')
const {mongoosesObject} = require('../../util/mongoose')

class CourseControllers {
    // [GET] course/show
    show(req, res) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('courses/show',{course: course.toObject()})
            })
            .catch(error => 
                res.status(400).send('Internal Server Error'))
    }
    // [GET] course/create
    create(req, res,next) {
        res.render('courses/create')
    }
    // [POST] course/stored
    store(req, res,next) {
        const course = new Course(req.body)
        course
            .save()
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }
    // [POST] course/:id/edit
    edit(req, res,next) {
        Course.findById(req.params.id)
            .then(course => {
                res.render('courses/edit',{course: course.toObject()})
            })  
            .catch(next)
    }
    // [PUT] course/:id
    update(req, res,next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/course'))
            .catch(next)

    }
    // [DELETE] course/:id
    delete(req, res,next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] course/:id/force
    forceDelete(req, res,next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] course/:id/restore
    restore(req, res,next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)

    }
    handleFormAction(req, res,next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({message: 'Action is invalid'})
        }

    }
    // [POST] : course/searchResult
    search(req,res,next) {
        Course.find({'name': {'$regex': '^string','$options' : 'i'}})
            .then(course => {
                res.render('courses/showResult', {course : course.toObject()})
            })
    }
}

module.exports = new CourseControllers();
