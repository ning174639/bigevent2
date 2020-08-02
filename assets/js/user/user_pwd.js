$(function () {
    var form = layui.form
    form.verify({
        pwd: [/^\S{6,12}$/, '密码必须6-12位且不能为空'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一致'
            }
        },
    })

    //修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                } else {
                    layui.layer.msg('恭喜您，修改密码成功！')
                    $('.layui-form')[0].reset()
                }
            },
        })
    })
})
