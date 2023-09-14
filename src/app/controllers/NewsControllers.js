//chứa function handler

class NewsControllers {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }
    // [GET] : /news/slug
    education(req, res) {
        res.send('NEWS DETAIwL !!');
    }
}

module.exports = new NewsControllers();
