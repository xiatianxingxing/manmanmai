$(function () {
    $(".search").on("click", function () {
        var a = $(".sea").css("display");
        if(a === "none"){
            $(this).find("img").attr("src", "./images/x.png");
            $(".sea").show();
        }else{
            $(this).find("img").attr("src","./images/search.png")
            $(".sea").hide();
        }
    });
    //获取要滑动的宽度
    var uubox = document.querySelector(".nav_uu");
    var uubox_w = uubox.offsetWidth;
    //console.log(nav_w);640
    //获取s所有的li元素
    var lis = uubox.querySelectorAll(".uubox li");
    //获取nav的宽度
    var nav = document.querySelector(".nav");
    var navbox = nav.offsetWidth;
    //console.log(nav_w);

    //设置静止状态下的最大left值
    var maxW = 0;
    //设置静止状态下的最小left值
    var minW = navbox-uubox_w;
    //设置划动状态下的最大值 和最小值
    var maxBounceTop=maxW+100;
    var minBounceTop=minW-100;
//+++++++++++++++++ ++
    //实现划动
    var startX  = 0;
    var moveX = 0;
    var distanceX=0;
    /*记录当前元素滑动到的距离*/
    var currentX=0;

    //touch事件
    uubox.addEventListener("touchstart", function (e) {
        //获取手指的起始坐标
        startX = e.targetTouches[0].clientX;
    });
    uubox.addEventListener("touchmove", function (e) {
        //移动后的位置
        moveX = e.targetTouches[0].clientX;
        //计算差距值
        distanceX =  moveX - startX;
        //判断滑动的时候是否超出制定范围
        if(currentX + distanceX> maxBounceTop || currentX + distanceX< minBounceTop){
            return;
        };

        uubox.style.transition = "none";
        uubox.style.left = (currentX + distanceX) +"px";

    });
    uubox.addEventListener("touchend", function (e) {
        if(currentX + distanceX < minW){
            currentX = minW;
            uubox.style.transition = "left 0.5s";
            uubox.style.left = minW + "px";

        }else if(currentX + distanceX > maxW){
            currentX = maxW;
            uubox.style.transition = "left 0.5s";
            uubox.style.left = maxW+"px";
        }else{
            currentX += distanceX;
        }

    });


    $.ajax({
        url: "http://127.0.0.1:3000/api/getbaicaijiatitle",
        dataType:"json",
        success: function (data) {
            console.log(data);
            var html = template("temp1",data);
            $(".nav_uu").html(html);



            //遍历每个li
            $(".nav_uu li").each(function (i, v) {
                //console.log(i);
                //console.log(v);
                $(v).on("click", function () {
                    $(".nav_uu li").each(function (i, v){
                        $(v).find("a").css("border",0);
                    })
                    $(this).find("a").css("border-bottom","2px solid #ff2f4d");
                    var a = $(this).find("a").eq(0).attr("id");
                    $.ajax({
                        url: "http://127.0.0.1:3000/api/getbaicaijiaproduct",
                        dataType:"json",
                        data:{"titleid":a},
                        success: function (data) {
                            console.log(data);
                            var html = template("temp2",data);
                            $(".uu_shop").html(html)
                        }
                    })
                })
            })




        }
    });
    //获取页面数据0
    $.ajax({
        url:"http://127.0.0.1:3000/api/getbaicaijiaproduct",
        data:{
            "titleid":0
        },
        dataType:"json",
            success: function (data) {
                console.log(data);
                var html = template("temp2",data);
                $(".uu_shop").html(html)
            }
    })


})