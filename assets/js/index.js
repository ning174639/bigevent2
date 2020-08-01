$(function () {
    //1.获取用户信息
    getUserInfo()

    //退出登录
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (
            index
        ) {
            layer.close(index)
            localStorage.removeItem('token')
            location.href = '/login.html'
        })
    })
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token' || ''),
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //调用用户渲染函数
            renderUser(res.data)
        },
    })
}

//封装用户渲染的函数
function renderUser(user) {
    var uname = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.text-avatar').html(uname[0].toUpperCase()).show()
        $('.layui-nav-img').hide()
    }
}
