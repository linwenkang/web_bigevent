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
})