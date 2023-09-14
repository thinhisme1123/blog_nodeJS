const express = require('express');
const router = express.Router();
// khái niệm middaleware: đóng vai trò như một bác bảo vệ để kiếm soát luông đi ra vào
// có thể kiếm tra xem tham số đầu vào có hợp lệ hay không và có thể quyết định được 
// cái đó có được quyền truy cập next() vào funtion tiếp theo hay không
// cái đó hiểu nôm na như một funtion dùng để check các thứ các thứ trước khi cho vào function tiếp theo

const courseControllers = require('../app/controllers/CourseControllers');

router.get('/create',courseControllers.create);
router.post('/store', courseControllers.store);
router.get('/:id/edit', courseControllers.edit);
router.post('/hanlde-form-actions', courseControllers.handleFormAction)
router.patch('/:id/restore', courseControllers.restore);
router.delete('/:id', courseControllers.delete);
router.delete('/:id/force', courseControllers.forceDelete);
router.put('/:id', courseControllers.update);
router.get('/:slug', courseControllers.show);
router.post('/searchResult',courseControllers.search);

module.exports = router;
