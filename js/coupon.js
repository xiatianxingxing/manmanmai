/**
 * Created by Administrator on 2017/7/21 0021.
 */
$(function () {
    $.ajax({
        url:'http://127.0.0.1:3000/api/getcoupon',
        success: function (data) {
            console.log(data);
            var html = template("temp",data);
            $(".friend").html(html)
        }
    })
})