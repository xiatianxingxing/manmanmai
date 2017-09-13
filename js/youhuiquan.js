/**
 * Created by Administrator on 2017/7/21 0021.
 */
$(function () {
    var id = location.search.split("=")[1];
    $.ajax({
        url:'http://127.0.0.1:3000/api/getcouponproduct',
        dataType:"json",
        data:{'couponid':id},
        success: function (data) {
            console.log(data);
            var html = template("temp",data);
            $(".uu_shop").html(html)
            var html1 = template("temp2",data);
            $(".uu_fixed").html(html1);
            var lis = $(".uu_fixed").find("li").length;
            $(".uu_fixed").css("width",lis*100+"%")




            //111111111
            //$(".uu_shop").on("click","li",function(){
            //    $(".uu_fixed").css("height","580px")
            //    index = $(this).attr("id")
            //});
            //可行22222222222222222
            //$(".centext").click(function(){
            //    //console.log($(this).parent().parent().parent().attr("id"));
            //    //console.log(1);
            //    console.log($(this).parents("li").attr("id"));
            //});
            //console.log($(".centext"));



            //设置手动轮播图
            var startX,moveX,distanceX;
            var uu = document.querySelector(".uu_fixed");
          //  console.log(uu);
            var li = uu.querySelectorAll("li")[0];
            //因为style这能获取行内样式  所以要获取全局lis的样式
            var boxw = document.body.offsetWidth
            var index=0;
            //点击换图
            $(".uu_shop").on("click","li",function(){
                $(".ass").css("height","100%")
                index = $(this).attr("id");
                console.log(index);
                uu.style.left = (-index*boxw)+"px";
            });
            $(".ass").on("click", function () {
                $(this).css("height","0")
            })


            //console.log($(".uu_fixed"));
            uu.addEventListener("touchstart", function (e) {
                startX= e.targetTouches[0].clientX;
                //console.log(startX);
            });
            uu.addEventListener("touchmove", function (e) {
                moveX= e.targetTouches[0].clientX;
                distanceX = moveX - startX;
                console.log(distanceX);
                uu.style.left = (-index*boxw+distanceX)+"px";
            });
            uu.addEventListener("touchend", function (e) {
                if(Math.abs(distanceX)>10){
                    if(distanceX>0){
                        index--;
                        if(index <=0){
                            index = 0;
                        }
                        uu.style.transition = "left 0.5s"
                        uu.style.left =  (-index*boxw)+"px";
                    }else{
                        index++;
                        if(index >=lis){
                            index = lis-1;
                        }
                        uu.style.transition = "left 0.5s"
                        uu.style.left =  (-index*boxw)+"px";
                    }
                }
            })


        }
    });






})