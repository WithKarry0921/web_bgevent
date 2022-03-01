$(function() {
    //点击“去注册”链接
    $('#link_reg').on('click', function() {
            $('.loginBox').hide()
            $('.regBox').show()
        })
        //点击“去登录”链接
    $('#link_login').on('click', function() {
        $('.loginBox').show()
        $('.regBox').hide()
    })


    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            //通过value拿到确认密码的内容，再拿到密码框中的内容，进行判断，判断失败，提示错误消息
            var pwd = $('.regBox [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        e.preventDefault()
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！')
                    //模拟点击行为跳转到登录
                $('#link_login').click()
            }

        )
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // console.log(res.token);
                    //将token存到localStorage中
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})