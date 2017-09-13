/**
 * Created by Administrator on 2017/7/23 0023.
 */
$(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/api/getbrandtitle",
        success: function (data) {
            console.log(data);
            var html = template("temp",data);
            $(".uu").html(html)
        }
    })
})