/**
 * Created by Administrator on 2017/7/23 0023.
 */
$(function () {
    var id = location.search.split("&")[0].split("=")[1];
    var name = location.search.split("&")[1].split("=")[1];
    console.log(name);
    $.ajax({
        url:'http://127.0.0.1:3000/api/getbrand',
        data:{"brandtitleid":id},
        success: function (data) {
            console.log(data);
            var html1 = template("temp1",data);
            //console.log(html1);
            $(".good_uu").html(html1);
            console.log(data.result[0].brandName.slice(2));
            var a = data.result[0].brandName.slice(2);
            $(".aaa").html(a);
            $("#a1").css("background","red")
            $("#a2").css("background","orange")
            $("#a3").css("background","green")

        }
    })
    $.ajax({
        url:'http://127.0.0.1:3000/api/getbrandproductlist',
        data:{"brandtitleid":id,"pagesize":40},
        success: function (data) {
            console.log(data);
            var html2 = template("temp2",data);
            //console.log(html2);
            $(".good_uu2").html(html2);
        }
    })
    $.ajax({
        url:'http://127.0.0.1:3000/api/getproductcom',
        data:{"productid":id},
        success: function (data) {
            console.log(data);
            var html3 = template("temp3",data);
            $(".good_uu3").html(html3)
        }
    })
})