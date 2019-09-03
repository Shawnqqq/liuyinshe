const paymentModels = require('../models/paymenyModels')
const userModels = require('../models/userModels')
const {formatTime} = require('../utils/formatDate');

const paymentController={
    // 增加消费记录
    insert: async function(req,res,next){
        let status = req.body.status;
        let user_id = req.body.user_id;
        let total = req.body.total;
        let remark = req.body.remark;
        if(status==2){
            total = -(total);
        }
        if(!status||!user_id||isNaN(total)){
            res.json({
                code:0, 
                massage:'缺少参数'
            })
            return
        }
        try{
            //增加填写的数据
            await paymentModels.insert({status,user_id,total,remark});
            //更改用户的金额
            await userModels
                .where({id: user_id})
                .increment({balance:total})
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
    //查找全部消费记录
    all: async function(req,res,next){
        let status = req.query.status; // 1 充值 2 消费 3 赠送
        let user_id = req.query.user_id // 查找用户ID
        let pageSize = req.query.page_size || 20; // 显示每页数据量
        let nowPage = req.query.now_page || 1; //显示当前页数
        let startAt = req.query.srart_at;  //查找起始时间
        let endAt = req.query.end_at;      //查找结束时间
        let filterColumn = (startAt&&endAt) ? 'payment.created_at' : '';
        let params = {};
        if(status) params.status = status;
        if(user_id) params.user_id = user_id;
        try{
            let payments = await paymentModels
                .pagination(pageSize,nowPage,params,{
                    column: filterColumn,
                    startAt : startAt,
                    endAt:endAt
                })
                //联表查询，获取用户信息
                //匹配 用户表 和 消费记录表 的ID
                .leftJoin('user','payment.user_id','user.id')
                //获取需要的表内的数据
                .column('payment.id','payment.total','payment.remark','payment.status','payment.user_id','payment.created_at','user.name')
                .orderBy('id', 'desc'); 
            //格式化时间，调整时区效应 
            payments.forEach(data => data.created_at = formatTime(data.created_at));
            let paymentsCount = await paymentModels.count(params,{
                column: filterColumn,
                startAt: startAt,
                endAt: endAt,
            });
            let total= paymentsCount[0].total;
            res.json({
                code:200,
                data:{
                    datas:payments,
                    pagination:{
                        total:total,
                        now_page: nowPage,
                        page_size:pageSize
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
    }
}

module.exports = paymentController;