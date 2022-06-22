$(function() {
    // 调用火球用户信息函数
    getUseerInfo()
        // 点击按钮实现退出功能
        // 获取layer
    var layer = layui.layer
    $('#btnlogout').on('click', function() {
        // 1点击跳出提示框
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 2.清除本地token
            localStorage.removeItem('token')
                // 3.跳转会登录页面
            location.href = './login.html'

            layer.close(index);
        });

    })

})

// 获取用户信息
function getUseerInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息是失败!')
            }
            // 调用用用户头像函数
            readerAvatar(res.data)
        },
        // 无论成功与否 都会调用complete函数
        complete: function(res) {
            // 在complete函数中 通过res.responseJSON来拿到数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 清除token 回到登录页面
                localStorage.removeItem('token')
                    // 跳转会登录页面
                location.href = './login.html'
            }
        }


    })
}

// 渲染用户头像函数
function readerAvatar(user) {
    // 1获取用户姓名
    var name = user.nickname || user.username
        // 2渲染名字
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
            // 获取名字的第一个字
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}