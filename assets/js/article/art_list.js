$(function(){
    let layer = layui.layer
    let form = layui.form
    var laypage = layui.laypage;
    let data = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())

        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    getListShow()
    initcats()

    function getListShow(){
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:data,
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                console.log(res)
                let htmlstr = template('tpl_table',res)
                $('tbody').html(htmlstr)
                renderpagesize(res.total)
            }
        })
    }

    function initcats(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('res.message')
                }
                let htmlstr = template('tpl_option',res)
                $('[name=cate_id]').html(htmlstr)
                form.render()
            }
        })
    }

    $('[name=form_option').on('submit',function(e){
        e.preventDefault()
        let q_cate_id = $('[name=cate_id]').val()
        let q_state = $('[name=state]').val()
        data.cate_id = q_cate_id
        data.state = q_state
        getListShow()
    })

    function renderpagesize(total){
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: data.pagesize, // 每页显示几条数据
            curr: data.pagenum, // 设置默认被选中的分页'
            limits:[2, 3, 5, 10, 20],
            layout:['count','limit','prev', 'page', 'next','skip','refresh'],
            jump:function(obj,first){
                data.pagenum = obj.curr
                data.pagesize = obj.limit
                if(!first){
                    getListShow()
                }
            }
        })
    }


    $('tbody').on('click','.btn_Delete',function(){
        let len = $('.btn_Delete').length
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    
                    if(len === 1){
                        data.pagenum = data.pagenum === 1 ? 1 : data.pagenum - 1
                    }
                    getListShow()
                }
            })
            layer.close(index);
          });

    })


})