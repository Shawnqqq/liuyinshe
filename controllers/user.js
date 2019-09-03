const userModels = require('../models/userModels')
const {formatDate} = require('../utils/formatDate');
const {formatTime} = require('../utils/formatDate');
const userClassModels = require('../models/user_classModels')
const paymenyModels = require('../models/paymenyModels')
const user_lessonModels = require('../models/user_lessonModels')
const axios = require('axios');

const userController={
    //增加用户
    insert: async function(req,res,next){
        let name = req.body.name;
        let phone = req.body.phone;
        let sex = req.body.sex;
        let birthday = req.body.birthday;
        let sms_name = req.body.sms_name;
        let sms_phone = req.body.sms_phone;
        if(!name||!phone||!sex||!birthday||!sms_name||!sms_phone){
            res.json({
                code:0, 
                massage:'缺少参数'
            })
            return
        }
        try{
            await userModels.insert({name,phone,sex,birthday,sms_name,sms_phone})
            res.json({
                code:200,
                message:'添加成功'
            })
        }
        catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'添加失败'
            })
        }
    },
    //查找用户 
    single: async function(req,res,next){
        let id = req.params.id;
        console.log(id)
        try{
            let single = await userModels.single(id)
            single.forEach( data => {
                data.birthday = formatDate(data.birthday)
                data.created_at = formatDate(data.created_at)
            })

            let userClass = await userClassModels.where({user_id:id})
            userClass.forEach( data => {
                data.created_at = formatDate(data.created_at)
            })
            

            let paymeny = await paymenyModels.where({user_id:id})
            paymeny.forEach( data => {
                data.created_at = formatDate(data.created_at)
            })

            let lesson = await user_lessonModels.where({user_id:id})
            lesson.forEach( data => {
                data.finish_at ? formatDate(data.finish_at) : ""
            })

            res.json({
                code:200,
                data:single[0],
                user_class: userClass,
                paymeny:paymeny,
                lesson:lesson
            })
        }
        catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'查找失败'
            })
        }
    },
    //查找全部用户 不翻页
    allUser:async function(req,res,next){
        try{
            let allUser = await userModels.whole()
            res.json({
                code:200,
                data:allUser,
            })
        }catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'查找失败'
            })
        }
    },
    //查找全部用户
    all: async function(req,res,next){
        let name = req.query.name;   //查找姓名
        let phone = req.query.phone;   //查找手机
        //查找的每页显示多少数据
        let pageSize = req.query.page_size || 20;
        //查找页数
        let nowPage = req.query.now_page || 1;
        let params ={};
        if(name)params.name = name
        if(phone)params.phone = phone
        try{
            let all = await userModels
                .pagination(pageSize,nowPage,params)
                .orderBy('id','desc');
            all.forEach(data => {
                data.birthday = formatDate(data.birthday)
                data.created_at = formatDate(data.created_at)
            }) 
            let allCount = await userModels.count(params)
            let total = allCount[0].total;
            res.json({
                code:200,
                data:{
                    datas:all,
                    pagination:{
                        total:total,  //总共数据量
                        page_size:pageSize,  //当页数据量
                        now_page:nowPage  //页数
                    }
                }
            })
        }
        catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'查找失败'
            })
        }
    },
    // 修改用户
    update: async function(req,res,next){
        let name = req.body.name;
        let phone = req.body.phone;
        let sex = req.body.sex;
        let birthday = req.body.birthday;
        let sms_name = req.body.sms_name;
        let sms_phone = req.body.sms_phone;
        let id = req.params.id;
        if(!name||!phone||!sex||!birthday||!sms_name||!sms_phone){
            res.json({
                code:0, 
                massage:'缺少参数'
            })
            return
        }
        try{
            await userModels.update(id,{name,phone,sex,birthday,sms_name,sms_phone})
            res.json({
                code:200,
                message:'修改成功'
            })
        }
        catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'修改失败'
            })
        }
    },
    //小程序登录
    wxlogin: async function(req,res,next){
        try{
            let appid = "wx6f1a76f290bcfba7";
            let secret = "54d684e066c5b61100ad8191be8ead27";
            let js_code = req.query.code;

            //获取openid 去数据库比对
            let data = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`);
            let openid = data.data.openid;
            let userOpenId = await userModels.where({openid:openid})
            
            if(userOpenId[0]!=null){
                res.json({
                    code:200,
                    data:userOpenId[0]
                })
                return
            }
            res.json({
                code:0,
                message:'未注册'
            })
        }catch(err){
            console.log(err)
            res.json({code:0, data:'错误'})
        }
    },
    // 小程序注册
    wxlogon: async function(req,res,next){
        try{
            let appid = "wx6f1a76f290bcfba7";
            let secret = "54d684e066c5b61100ad8191be8ead27";
            let js_code = req.query.code;
            let userName = req.query.name;
            let userPhone = req.query.phone 

            //获取openid 
            let data = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`);
            let openid = data.data.openid;

            //数据库查询用户
            let userInfo = await userModels.where({name:userName,phone:userPhone})
            if(userInfo.length===0){
                res.json({
                    code:0,
                    message:'没有该用户'
                })
                return
            }
            let id = userInfo[0].id

            // 存储 openid
            await userModels.update(id,{openid})
            res.json({
                code:200
            })
        }catch(err){
            console.log(err)
            res.json({code:0,data:'错误'})
        }
    }
}

module.exports = userController;