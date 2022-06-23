$(function() {
    layer = layui.layer
    form = layui.form
    initArtcateList()
        // 获取文章类别函数
    function initArtcateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res);
                // 调用模板函数 设置一个参数接受
                var htmlStr = template('tpl-table', res)
                    // 渲染body页面
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null
        // 给添加类别按钮点击事件
    $('#btnAddCate').on('click', function() {
        // 使用layer。open
        indexAdd = layer.open({
            // 去掉确定按钮
            type: 1,
            // 制定宽高
            area: ['500px', '250px'],
            title: '添加文章分类',
            // 函数曾内部绘制出表单 在html里添加script
            content: $('#dialog-add').html()
        });
    })

    // 要给函数内form表单绑定submit事件 form不是固定存在的
    // 委托时间
    $('body').on('submit', '#form-add', function(e) {
        // 阻止默认提交
        e.preventDefault()
            // 发起提交
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtcateList()
                layer.msg('新增分类成功！')
                    // 根据索引 关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })


    var indexEdit = null
        // 委托事件 来添加修改按钮事件
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出层
        indexEdit = layer.open({
            // 去掉确定按钮
            type: 1,
            // 制定宽高
            area: ['500px', '250px'],
            title: '修改文章分类',
            // 函数曾内部绘制出表单 在html里添加script
            content: $('#dialog-edit').html()
        });
        // 获取id值
        var id = $(this).attr('data-id')
            // console.log(id);
            // 发起对应的ajax请求
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function(res) {
                // 利用layui的表单属性快速赋值
                form.val('form-edit', res.data)
            }
        })

    })


    // 委托事件 来修改按钮submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改分类失败!')
                }
                layer.msg('修改分类成功!')
                layer.close(indexEdit)
                initArtcateList()
            }
        })
    })

    // 通过代理事件 给删除按添加点击事件
    $('body').on('click', '.btn-delete', function() {
        //    获取点击删除按钮时的id
        var id = $(this).attr('data-id')
            // 询问是否删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //发起请求
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    layer.close(index);
                    initArtcateList()
                }
            })



        });
    })


})