/**
 * Created by Administrator on 2017/7/18 0018.
 */
$(function () {
    var id = location.search;
    var a = id.split("=")[1]
    $.ajax({
        type:"get",
        url:'http://127.0.0.1:3000/api/getproduct',
        data:{"productid" :a},
        success: function (data) {

            var html = template("temp",data);

            $(".recommend").html(html)
        }
    })
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:3000/api/getproductcom",
        data:{
            "productid":a
            },
        success: function (data) {
            console.log(data);
            var html = template("tepm1",data);
            $(".comment_in").html(html)
        }

    })
})