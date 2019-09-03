var express = require('express');
var router = express.Router();
//控制表格
const managerController = require('../controllers/manager')
const userController = require('../controllers/user')
const paymentController = require('../controllers/payment')
const courseController = require('../controllers/course')
const classController = require('../controllers/class')
const lessonController = require('../controllers/lesson')
const authController = require('../controllers/auth')
const middleAuth = require('../middleauth/middleAuth')
const miniController = require('../controllers/mini')
const leaveController = require('../controllers/leave')
/* GET users listing. */

// 登录
router.post('/auth/login',authController.login)


// wx登录
router.get('/userLogin',userController.wxlogin)
// wx注册
router.get('/userLogon',userController.wxlogon)
// wx班级
router.get('/mini/class/:user_id',miniController.class)
// wx课程
router.get('/mini/lesson/:class_id/:user_id',miniController.lesson)
// wx请假
router.post('/mini/leave/:id',miniController.leave)

// 请假
router.get('/leave',leaveController.index)
// 补课
router.put('/leave/:id',leaveController.click)


// 新增管理员
router.post('/manager',middleAuth,managerController.insert);
// 查找管理员
router.get('/manager/:id',middleAuth,managerController.single);
// 全部管理员
router.get('/manager',middleAuth, managerController.all);
// 修改管理员
router.put('/manager/:id',middleAuth,managerController.update);
// 删除管理员
router.delete('/manager/:id',middleAuth,managerController.delete);
// 新增用户
router.post('/user',middleAuth,userController.insert);
// 查找用户
router.get('/user/:id',middleAuth,userController.single);
// 全部用户
router.get('/user',middleAuth, userController.all);
// 全部用户 不翻页
router.get('/userAll',middleAuth, userController.allUser);
// 修改用户
router.put('/user/:id',middleAuth,userController.update);
// 新增消费记录
router.post('/payment',middleAuth,paymentController.insert);
// 全部消费记录
router.get('/payment',middleAuth, paymentController.all);
// 新增课程
router.post('/course',middleAuth,courseController.insert);
// 查找课程
router.get('/course/:id',middleAuth,courseController.single);
// 全部课程
router.get('/course',middleAuth, courseController.all);
// 修改课程
router.put('/course/:id',middleAuth,courseController.update);
// 删除课程
router.delete('/course/:id',middleAuth,courseController.delete);
// 新增班级
router.post('/class',middleAuth,classController.insert);
// 全部班级 不翻页
router.get('/classAll',middleAuth, classController.allClass);
// 全部班级
router.get('/class',middleAuth, classController.all);
// 修改班级
router.put('/class/:id',middleAuth,classController.update);
// 查找班级
router.get('/class/:id',middleAuth,classController.single);
// 用户报班
router.post('/class/:id/addUser',middleAuth,classController.addUser);
// 修改课
router.put('/lesson/:id',middleAuth,lessonController.update);
// 查找课详情
router.get('/lesson/:id',middleAuth,lessonController.single);
// 课打卡情况更改
router.put('/lesson/:id/click',middleAuth,lessonController.click);




module.exports = router;