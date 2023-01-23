$(function(){
    // 点击去注册按钮链接
    $('#link_reg').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 点击去登录按钮链接   
    $('#link_login').on('click',function(){
        $('.reg-box').show()
        $('.login-box').hide()
    })

    // 自定义校验规则
    // 从layui获取form
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ], 
        
        repwd:function(value){
            let repwd = $('.login-box [name=password]').val()
            if(repwd!=value){
                return '两次密码不一致！'
            }
        }
    })

    // 注册接口
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        let username = $('#form_reg [name=username]').val()
        let password = $('#form_reg [name=password]').val()
        $.post('http://www.liulongbin.top:3007/api/reguser',{username:username,password:password},function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#link_login').click()
        })
    })

    $('#form_login').on('submit',function(e){
        e.preventDefault()
        let username = $('#form_login [name=username]').val()
        let password = $('#form_login [name=password]').val()
        console.log('username:'+username);
        console.log('password:'+password);
        $.ajax({
            type:'POST',
            url:'http://www.liulongbin.top:3007/api/login',
            data:{
                username:username,
                password:password 
            },
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败！请核对用户名及密码')
                }
                layer.msg(res.message)
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})