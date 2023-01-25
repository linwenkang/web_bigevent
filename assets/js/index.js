$(function(){
    getUserInfo()
})

let layer = layui.layer

$('#btnlogOut').on('click',function(){
    layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
        localStorage.removeItem('token')
        location.href='/login.html'
        layer.close(index);
      });
})

function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            console.log(res.data)
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user){
    let userName = user.nickname||user.username
    $('.welcome').html('欢迎&nbsp&nbsp'+userName)
    
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        let avatarName = userName[0].toUpperCase()
        $('.text-avatar').html(avatarName).show()
    }
}