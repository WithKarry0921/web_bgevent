$(function() {
    //获取用户信息
    getUserInfo()

    var layer = layui.layer
        //给退出按钮添加点击事件
    $('#btnLogout').on('click', function() {
        // console.log('ok')

        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
                //关闭confirm询问框
            layer.close(index)
        })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //headers就是请求头对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败！')
                //调用渲染头像函数
            renderAvatar(res.data)
        },
        //不管成功失败都会调用commplete函数
        //complete函数配置到baseAPI.js中
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;' + name)
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}