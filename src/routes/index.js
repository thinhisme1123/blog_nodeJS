const newsRoute = require('./news');
const siteRoute = require('./site');
const courseRoute = require('./courses');
const meRoute = require('./me');


function route(app) {
    app.use('/courses', courseRoute);
    app.use('/me', meRoute);
    app.use('/news', newsRoute);
    app.use('/', siteRoute);
    
}

module.exports = route;
// kinh nghiệm rút ra: cần đưa những đường dãn chi tiết lên phía trên ưu tiên hơn, vì chương trình sẽ 
// chạy từ trên xuống dưới nên khi gặp đường dẫn nào match thì nó sẽ render đường dẫn đó luôn và bỏ qua
// các đường dẫn bên dưới