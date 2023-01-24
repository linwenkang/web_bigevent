$(function(){
    let form = layui.form
    let layer = layui.layer

    form.verify({
        pwd1: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        pwd2:function(value){
            if(value===$('#userpwd').val()){
                return '新旧密码不能相同'
            }
        },

        pwd3:function(value){
            if(value!==$('#new_userpwd').val()){
                return '两次输入的密码不一致！'
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })
})