// 入口函数
$(function() {
    // 给去注册a标签天机点击事件
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 给去登录a标签添加点击事件
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        // 获取layui里面的form元素
    var form = layui.form
        // 获取弹框元素
    var layer = layui.layer
        // 通过form.verify（）自定义规则
    form.verify({
        // 自定义一个叫pwd的规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码不一致的规则
        repwd: function(value) {
            // 通过value拿到再次输入的密码
            // 还需要拿到密码框的竖数值
            // 两个数值比较
            // 不一致 直接return 两次密码不一致
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听form表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止默认提交事件
        e.preventDefault()
            // 优化 把注册数据拿出来
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
            // 发起一个ajax的past请求
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                // return console.log('注册失败!');
                return layer.msg(res.message);
            }
            // console.log('注册成功');
            layer.msg('注册成功 请登录！');
            // 优化 注册完成以后 自动跳转登录页面 模拟点击事件
            $('#link_login').click()
        })
    })

    // 监听登录事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交事件
        e.preventDefault()
            // ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // c此时会返回一个token值 以后需要权限是要用到
                localStorage.setItem('token', res.token)
                    // 登录完成要跳转页面
                location.href = './index.html'
            }

        })
    })

})