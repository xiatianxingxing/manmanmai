$(function () {
    //首页菜单栏
    $.ajax({
        url:"http://127.0.0.1:3000/api/getindexmenu",
        data:{},
        dataType:"json",
        success:function(data){
            console.log(data);
            var html = template("tmp",data);
            $("#nav_uu").html(html)
            $(".nav ul li:nth-of-type(8)").on("click", function () {
                console.log(123);
                var a = $(".nav ul li:nth-last-child(1)").css("display");
                console.log(a);
                if( a === "none"){
                    $(".nav ul li:nth-last-child(-n+4)").css({"display":"block"})
                }else{
                    $(".nav ul li:nth-last-child(-n+4)").css({"display":"none"})
                }
            })
        }
    });
    //首页折扣列表
    $.ajax({
        url:"http://127.0.0.1:3000/api/getmoneyctrl",
        dataType:"json",
        success:function(data){
            console.log(data);


            var res = data["result"];

            for(var i=0;i<res.length;i++){
                res[i]["productComCount"] = res[i]["productComCount"].replace(/\D/g,"");
            }
            var html = template("temp",data);
            $("#product_uu").html(html)
        }
    })



})
