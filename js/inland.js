/**
 * Created by Administrator on 2017/7/19 0019.
 */
$(function () {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getinlanddiscount',
        datatype:"json",
        success: function (data) {
            //console.log(data);
            var html = template("temp",data);
            $(".productimg").html(html)
        }
    });
    var temp = false
    $(window).scroll(function () {
        //��ȡ�����ĸ߶�
        var h1 = $(window).height() + $(window).scrollTop();
       //���ܸ߶�ȡҳ��
        var h2 = $(document).height();
        if(h1 > h2*4/5 && temp == false){
            temp = true;
            $(".productimg").append("<li id='loading'>���ڼ���...</li>");
            $.ajax({
                url: 'http://127.0.0.1:3000/api/getinlanddiscount',
                datatype:"json",
                success: function (data) {
                    console.log(data);
                    $("#loading").remove();
                    var html = template("temp",data);
                    $(".productimg").append(html)
                    temp = false
                }
            });
        }
    })
})