/**
 * Created by Administrator on 2017/7/19 0019.
 */
$(function () {
    var sar = location.search;
    var id = sar.split("=")[1]
    console.log(sar);
    $.ajax({
        type : "get",
        url : "http://127.0.0.1:3000/api/getmoneyctrlproduct",
        data:{"productid" :id},
        dataType:"json",
        success: function (data) {
            console.log(data);
            var html = template("temp",data);
            $(".content_txe").html(html)
        }
    })
})