$(function(){
    let layer = layui.layer
    let form = layui.form

    initshow()

    function initshow(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('res.message')
                }
                let tpl_tables = template('tpl_table',res)
                $('tbody').html(tpl_tables)
            }
        })
    }

    let indexnum1 = null
    let indexnum2 = null
    $('#btntj').on('click',function(){
        indexnum1 = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content:$('#tpl_table_add').html()
        });  
    })

    $('body').on('submit','#form_table_add',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initshow()
                layer.close(indexnum1)
            }
        })
    })

    $('tbody').on('click','#btnxg',function(e){
        indexnum2 = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content:$('#tpl_table_xg').html()
        })

        let id = $(this).attr('data-id')
        $.ajax({
            method:'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                form.val('form_table_xg',res.data)
            }
        })
    })

    $('body').on('submit','#form_table_xg',function(e){
        console.log($(this).serialize());
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                     return layer.msg(res.message)
                }
                layer.msg(res.message)
                initshow()
                layer.close(indexnum2)
            }
        })
    })

    $('body').on('click','#btnsc',function(){
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    initshow()
                }
            })
            layer.close(index);
          });

    })


})