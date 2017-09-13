/**
 * Created by Administrator on 2017/7/17 0017.
 */
$(function () {
    var id = location.search;
    var a = id.split("&")[0];
    //match  截取符合要求的内容
    a = a.match(/\d/g)[0]
    var b = id.split("&")[1];
    b = b.split("=")[1]
    b = decodeURI(b)
    $(".indexa").html(b+">")
    $.ajax({
        type:"get",
        url: "http://127.0.0.1:3000/api/getproductlist",
        data:{"categoryid":a,
            "pageid" :1},
        dataType:"json",
        success: function (data) {
            console.log(data);
            var html = template("temp",data);
            $("#product_uu").html(html)

            //上下页按钮
            var fen = data.pagesize;
            var zong = data.totalCount;
            var pages = Math.floor(zong/fen);
            //console.log(pages);
            var arr = [];
            for(var i=1;i<pages+1;i++){
                arr.push(i+"/"+pages)
            }
            //形成模板
            var list= {list:arr}
            var html= template("tep",list)
            $("#select").html(html)
            //点击下一页
            $("#btnx").on("click", function () {
                var index =  $("#select").val();
                var b =index.split("/")[0];
                console.log(b);
               // document.body.scrollTop = 0;
                if(b>=pages){
                    alert("不要这么任性");
                    return;
                }
                $("#select").find("option")[b].selected = true;
                b++;
                $.ajax({
                    type:"get",
                    url: "http://127.0.0.1:3000/api/getproductlist",
                    data:{"categoryid":b,
                        "pageid" :1},
                    dataType:"json",
                    success: function (data) {
                        console.log(data);
                        var html = template("temp",data);
                        $("#product_uu").html(html)
                    }
                });
            })
            //上一页
            $("#btnt").on("click", function () {
                var index1 = $("#select").val()
                //console.log(this[0].value);
                a = index1.split("/")[0];
                a--;
               // document.body.scrollTop = 0
                if(a<=0){
                    alert("卖完了");
                    return;
                }
                //点击select内容变换
                var sele = document.querySelector("#select");
                console.log(sele.value);
                console.log(a);

                $.ajax({
                    type:"get",
                    url: "http://127.0.0.1:3000/api/getproductlist",
                    data:{"categoryid":a,
                        "pageid" :1},
                    dataType:"json",
                    success: function (data) {
                        console.log(data);
                        var html = template("temp",data);
                        $("#product_uu").html(html)
                    }
                });
                $("#select").find("option")[a-1].selected = true;
            })

        }
    });
    $("#select").change(function() {
        //console.log(this.value);
        var index = $(this).val()
        //console.log(this[0].value);
        var a = index.split("/")[0];
        //每个select的唯一属性，下去可以看看
        //selected = true;
        //console.log(a);
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:3000/api/getproductlist",
            data:{"categoryid":a,
                "pageid" :1},
            dataType: "json",
            success: function (data) {
                console.log(data);

                var html = template("temp", data);
                $("#product_uu").html(html)

            }
        });
    });



})
