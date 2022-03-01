$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nikename: function(value) {
            if (value.length > 6) {
                return '昵称长度必须再1~6个字符之间'
            }
        }
    })

    initUserInfo()
        //初始化用户基本信息的函数
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                //调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置表单数据
    $('#btnReset').on('click', function(e) {
            e.preventDefault()
            initUserInfo()
        })
        //监听表单提交事件
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    //调用父页面中的方法重新渲染用户头像和信息
                window.parent.getUserInfo()
            }
        })
    })
})