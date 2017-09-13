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
    //��ȡҪ�����Ŀ��
    var uubox = document.querySelector(".nav_uu");
    var uubox_w = uubox.offsetWidth;
    //console.log(nav_w);640
    //��ȡs���е�liԪ��
    var lis = uubox.querySelectorAll(".uubox li");
    //��ȡnav�Ŀ��
    var nav = document.querySelector(".nav");
    var navbox = nav.offsetWidth;
    //console.log(nav_w);

    //���þ�ֹ״̬�µ����leftֵ
    var maxW = 0;
    //���þ�ֹ״̬�µ���Сleftֵ
    var minW = navbox-uubox_w;
    //���û���״̬�µ����ֵ ����Сֵ
    var maxBounceTop=maxW+100;
    var minBounceTop=minW-100;
//+++++++++++++++++ ++
    //ʵ�ֻ���
    var startX  = 0;
    var moveX = 0;
    var distanceX=0;
    /*��¼��ǰԪ�ػ������ľ���*/
    var currentX=0;

    //touch�¼�
    uubox.addEventListener("touchstart", function (e) {
        //��ȡ��ָ����ʼ����
        startX = e.targetTouches[0].clientX;
    });
    uubox.addEventListener("touchmove", function (e) {
        //�ƶ����λ��
        moveX = e.targetTouches[0].clientX;
        //������ֵ
        distanceX =  moveX - startX;
        //�жϻ�����ʱ���Ƿ񳬳��ƶ���Χ
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



            //����ÿ��li
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
    //��ȡҳ������0
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