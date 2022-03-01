//再jQuery中，调用$.get $.post $.ajax 的时候，会先调用以下函数
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    //在发起请求之前，拼接根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
        options.complete = function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    }
})