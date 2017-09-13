/**
 * Created by Administrator on 2017/7/19 0019.
 */
$(function () {
    var id = location.search.replace(/\D/g,"");
    console.log(id);

    $.ajax({
        url:'http://127.0.0.1:3000/api/getdiscountproduct',
        data:{"productid":id},
        success: function (data) {
            console.log(data);
            var html = template("temp",data);
            $(".content_txt").html(html)
        }
    })
})