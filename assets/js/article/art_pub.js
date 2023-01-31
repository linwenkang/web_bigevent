$(function(){
    let layer = layui.layer
    let form = layui.form
    var laypage = layui.laypage;

    initcats()
    // 初始化富文本编辑器
    initEditor()

    function initcats(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('res.message')
                }
                let htmlstr = template('pub_option',res)
                $('[name=cate_id]').html(htmlstr)
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')
    
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('.btn_feimg').on('click',function(){
        $('#fmfile').click()
    })

    $('#fmfile').on('change',function(e){
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

    
    let cgztstr ='已发布'

    $('.btn_cg').on('click',function(){
        cgztstr ='草稿'
    })

    $('.form_pub').on('submit',function(e){
        e.preventDefault()
        let fd = new FormData($(this)[0])
        fd.append('state',cgztstr)

        $image
        .cropper('getCroppedCanvas', { 
        // 创建一个 Canvas 画布
          width: 400,
          height: 280
        }).toBlob(function(blob) {       
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append('cover_img', blob)
        // 6. 发起 ajax 数据请求
        publishArticle(fd)
        })

        

        // fd.forEach(function(v,k) {
        //     console.log(k,v);
        // })
    })

      // 定义一个发布文章的方法
  function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      // 注意：如果向服务器提交的是 FormData 格式的数据，
      // 必须添加以下两个配置项
      contentType: false,
      processData: false,
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('发布文章失败！')
        }
        layer.msg('发布文章成功！')
        // 发布文章成功后，跳转到文章列表页面
        location.href = '/article/art_list.html'
      }
    })
  }

})