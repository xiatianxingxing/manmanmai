/**
 * Created by Administrator on 2017/7/22 0022.
 */
$(function () {
    $.ajax({
        url:'http://127.0.0.1:3000/api/getsitenav',
        success: function (data) {
            console.log(data);
            var html = template("temp",data);
            console.log(html);
            $(".friends").html(html);
        }
    })
})