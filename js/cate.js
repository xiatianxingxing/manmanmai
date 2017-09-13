/**
 * Created by Administrator on 2017/7/16 0016.
 */
$(function () {
    //分类列表
    $.ajax({
        url:'http://127.0.0.1:3000/api/getcategorytitle',
        data:{},
        dataType:"json",
        success: function (data) {
            //获取数据进行渲染
            console.log(data);
            var html = template("temp",data);
            $(".box1").html(html);

            //获取arrow按钮
            var a1s = $(".a1")
            //然后进行排他
            for(var i=0;i<a1s.length;i++){
                //触发事件
                a1s[i].onclick = function () {
                    for(var j=0;j<a1s.length;j++){
                        $(".a1").find("img").attr("src","./images/arrow-b.png");
                    }
                    $(this).find("img").attr("src","./images/arrow-up.png");
                    //获取当前ID
                    var a = this;
                    //console.log(this.id);
                    var attributea = this.getAttribute("data-a")
                    //console.log(attributea);
                    //只请求一次
                    if(attributea === "a"){
                        this.setAttribute("data-a","b")
                        //分类子列表

                       // $(this).find("img").attr("src","./images/arrow-up.png");
                       // console.log($(this).find("img").attr("src"));
                        $.ajax({
                            url: 'http://127.0.0.1:3000/api/getcategory',
                            dataType:"json",
                            data:{"titleid": a.id},
                            success: function (data) {
                               // console.log(data);
                                var html = template("temp1",data);
                                var b = $(a).html()
                                // console.log(b);
                                //追加html
                                // console.log(b+html);
                                $(a).html(b+html);
                                //var ul = document.createElement("ul");
                                //ul = $(ul).html(html);
                                //console.log(ul);
                                //$(ul).appendTo($(a));

                            }
                        });
                        //获取所有的a里的ul
                        var uus = $(".a1").find(".uu");

                        for(var i=0;i<uus.length;i++){
                            //$(this).find("img").attr("src","./images/arrow-b.png");
                            $(".uu").css("display","none");
                        }
                        $(this).find(".uu").css("display","block");
                    }else{
                        var dis = $(this).find(".uu").css("display");
                        var uus = $(this).find(".uu")
                        //console.log(dis);
                        if(dis === "none"){
                            for(var i=0;i<uus.length;i++){
                                $(".uu").find("img").attr("src","./images/arrow-b.png")
                                $(".uu").css("display","none");
                            }

                            $(this).find("img").attr("src","./images/arrow-up.png")
                            $(this).find(".uu").css("display","block");
                        }else{
                            $(this).find("img").attr("src","./images/arrow-b.png")
                            $(this).find(".uu").css("display","none");
                        }


                    }




                };
            }
        }
    })

    $(".x").on("click", function () {
        console.log(12);
        $(".x").parent().css("display","none")
    })

})