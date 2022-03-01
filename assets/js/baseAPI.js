//再jQuery中，调用$.get $.post $.ajax 的时候，会先调用以下函数
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    //在发起请求之前，拼接根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})