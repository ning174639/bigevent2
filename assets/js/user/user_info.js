$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称在1-6位之间！'
            }
        },
    })

    //初始化用户信息
    initUserInfo()

    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            },
        })
    }

    //重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //用户提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户修改信息失败')
                } else {
                    layer.msg('恭喜您，修改信息成功！')
                    window.parent.getUserInfo()
                }
            },
        })
    })
})
