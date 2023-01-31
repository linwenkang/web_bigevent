$(function(){

    let layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnsc').on('click',function(){
        $('#file').click()
    })

    $('#file').on('change',function(e){
        let fileList = e.target.files
        if(fileList.length===0){
           return layer.msg('请选择文件')
        }
        let file = e.target.files[0]
        let newImgURL = URL.createObjectURL(file)
        $image
          .cropper('destroy')      // 销毁旧的裁剪区域
          .attr('src', newImgURL)  // 重新设置图片路径
          .cropper(options)        // 重新初始化裁剪区域
    })

    $('#btngg').on('click',function(){
        let dataURL = $image.cropper('getCroppedCanvas', {width: 100,height: 100
        }).toDataURL('image/png')// 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            method:'POST',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL
            },
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                console.log(res);
                window.parent.getUserInfo()
            }
        })
    })


})

