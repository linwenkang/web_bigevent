$(function(){
    let form = layui.form
    let layer = layui.layer

    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '用户昵称必须在1-6位'
            }
        }
    })

    initUserInfo()

    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('res.message')
                }
                console.log(res.data);
                form.val('formUserInfo',res.data)
            }
        })
    }
    
    $('#btnreset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })

})
