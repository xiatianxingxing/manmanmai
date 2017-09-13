/**
 * Created by Administrator on 2017/7/22 0022.
 */
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
    //第1个
    $.ajax({
        url:'http://127.0.0.1:3000/api/getgsshop',
        success: function (data) {
            console.log(data);
            var html1 = template("temp1",data);

            $(".sele_uu").html(html1);
            console.log($(".sele_uu"));
        }
    });
    //第2 个
    $.ajax({
        url:'http://127.0.0.1:3000/api/getgsshoparea',
        success: function (data) {
            console.log(data);
            var html2 = template("temp2",data);
            $(".sele_uu1").html(html2)
        }
    });
    //获取页面中的数据
    var a1 = document.querySelector(".a1")
    var a2 = document.querySelector(".a2")
    //获取页面的TEXT
    var span1 = a1.children[0]
    var span2 = a2.children[0]

    var sele_uu1 = document.querySelector(".sele_uu");
    var img1 = a1.querySelector("img");
    var img2 = a2.querySelector("img");
    console.log(img1.getAttribute("src"));
    console.log(sele_uu1.style.display);
    var sele_uu2 = document.querySelector(".sele_uu1");
    //点击第一个
    a1.onclick = function () {
        //把第二个隐藏
        img2.setAttribute("src","./images/arrowdown.png")
        sele_uu2.style.display = "none";
        if(sele_uu1.style.display == "none"){
            //显示出来
            img1.setAttribute("src","./images/arrow-up-b.png")
            sele_uu1.style.display = "block";
            //开始选择
            var lis1 = sele_uu1.querySelectorAll("li");

            //console.log(lis1);
            //获取每个里的id  和值
            for(var i=0;i<lis1.length;i++){
                lis1[i].onclick = function () {
                    span1.innerText = this.innerText;
                    var id1 = this.getAttribute("id")
                    console.log(id1);
                    //在重新渲染页面
                    $.ajax({
                        url:'http://127.0.0.1:3000/api/getgsproduct',
                        data:{"shopid":id1,
                            "areaid":0},
                        success: function (data) {
                            console.log(data);
                            var html3 = template("temp3",data);
                            $(".uuuu").html(html3);

                            sele_uu2.setAttribute("data-a",id1)                            //------------------------------

                        }
                    });
                    //同时隐藏
                    img1.setAttribute("src","./images/arrowdown.png")
                    sele_uu1.style.display = "none";
                }
            }

        }else{
            img1.setAttribute("src","./images/arrowdown.png")
            sele_uu1.style.display = "none";
        }
    }
    a2.onclick = function () {
        sele_uu1.style.display = "none";
        img1.setAttribute("src","./images/arrowdown.png")
        if(sele_uu2.style.display == "none"){
            img2.setAttribute("src","./images/arrow-up-b.png")
            sele_uu2.style.display = "block";
            //获取上一个id1
            var idd = sele_uu2.getAttribute("data-a");
            console.log(idd);
            var lis2 = sele_uu2.querySelectorAll("li");
            if(idd == null){
                console.log(123);
                idd = 0;
            }
            console.log(idd);


            //console.log(lis1);
            //获取每个里的id  和值
            for(var i=0;i<lis2.length;i++){
                lis2[i].onclick = function () {
                    span2.innerText = this.innerText;
                    var id2 = this.getAttribute("id")
                    //在重新渲染页面
                    $.ajax({
                        url:'http://127.0.0.1:3000/api/getgsproduct',
                        data:{"shopid":idd,
                            "areaid":id2},
                        success: function (data) {
                            console.log(data);
                            var html3 = template("temp3",data);
                            $(".uuuu").html(html3)
                        }
                    });
                    //同时隐藏
                    img2.setAttribute("src","./images/arrowdown.png")
                    sele_uu2.style.display = "none";
                }
            }






        }else{
            img2.setAttribute("src","./images/arrowdown.png")
            sele_uu2.style.display = "none";
        }
    }

    //第3个
    $.ajax({
        url:'http://127.0.0.1:3000/api/getgsproduct',
        data:{"shopid":0,
        "areaid":0},
        success: function (data) {
            console.log(data);
            var html3 = template("temp3",data);
            $(".uuuu").html(html3)
        }
    });



    

})