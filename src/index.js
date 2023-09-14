// file index tổng của app
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const methodOverride = require('method-override')
const SortMiddleware = require('./app/middlewares/SortMiddleware')


const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');
const { type } = require('os');

// connect to db
db.connect()

// tạo đường dẫn chính khi / thì nó tự động vào luôn thư mục public 
app.use(express.static(path.join(__dirname, 'public')));
//override lại method khi submit một form mà phương thức đó không được hỗ trợ, PUT, DELETE
app.use(methodOverride('_method'))
// custion middle
app.use(SortMiddleware)

// đóng vai trò như một middle ware để chèn dữ liệu từ form data vào req.body
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// http logger
app.get(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: 'hbs',
        helpers: {
            sum: (a,b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending'
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }

                const icon = icons[sortType]
                const type = types[sortType]

                return `<a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>`
            } 
        }
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//routes
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port https://localhost:${port}`);
});

  
app.post('/api/tour/:id', (req, res) => {
    try {
        Tours.find({_id: req.params.id})
            .then(tour => {
                if(!tour || tour.length === 0) 
                    return res.status(404).json({ error: 'Nothing found !' })
                else
                    res.json({ success: true })
            })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
