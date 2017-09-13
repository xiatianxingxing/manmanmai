/**
 * Created by Administrator on 2017/7/17 0017.
 */
$(function () {

    //获取select里的内容
    //document方法
    //document.getElementById("select").onchange= function () {
    //    //console.dir(this.selectedIndex);
    //    //var ind = this.selectedIndex;
    //    //console.log(this.children[this.selectedIndex]);
    //    console.log(this.value);
    //}
    //jquery方法
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
            url: "http://127.0.0.1:3000/api/getmoneyctrl",
            data: {"pageid": a},
            dataType: "json",
            success: function (data) {
                console.log(data);
                var res = data["result"];
                for (var i = 0; i < res.length; i++) {
                    res[i]["productComCount"] = res[i]["productComCount"].replace(/\D/g, "");
                }
                var html = template("temp", data);
                $("#product_uu").html(html)

            }
        });
    });

    $.ajax({
        type:"get",
        url: "http://127.0.0.1:3000/api/getmoneyctrl",
        data:{"pageid":1},
        dataType:"json",
        success: function (data) {
            console.log(data);
            var res = data["result"];
            for(var i=0;i<res.length;i++){
                res[i]["productComCount"] = res[i]["productComCount"].replace(/\D/g,"");
            }
            var html = template("temp",data);
            $("#product_uu").html(html)
            //获取数字
            var fen = data.pagesize;
            var zong = data.totalCount;
            var pages = Math.floor(zong/fen);
            console.log(pages);
            var arr = [];
            for(var i=1;i<pages+1;i++){
                arr.push(i+"/"+pages)
            }
           // console.log(arr);
            //添加中间的select按钮
            var list= {list:arr}
            var html= template("tep",list)
            $("#select").html(html)
            //console.log(html);

          //  $("#select").find("option")[2].selected = true;


            //点击下一页


                //console.log(this.value);

                //console.log(this[0].value);
            //var b ;
            //console.log(b);
            //var b = 0;
            $("#btnx").on("click", function () {
                var index = $("#select").val()
                //console.log(this[0].value);
               var b = index.split("/")[0];
                document.body.scrollTop = 0
                if(b>=pages){
                    alert("没有了");
                    return
                }
                //点击select内容变换
                $("#select").find("option")[b].selected = true;
                b++;
                //var sele = document.querySelector("#select");
                //console.log(sele.value);
                $.ajax({
                    type:"get",
                    url: "http://127.0.0.1:3000/api/getmoneyctrl",
                    data:{"pageid":b},
                    dataType:"json",
                    success: function (data) {
                        console.log(data);
                        var res = data["result"];
                        for(var i=0;i<res.length;i++){
                            res[i]["productComCount"] = res[i]["productComCount"].replace(/\D/g,"");
                        }
                        var html = template("temp",data);
                        $("#product_uu").html(html)
                    }
                });


            })
            //上一页

            var a;

            $("#btnt").on("click", function () {
                var index1 = $("#select").val()
                //console.log(this[0].value);
                a = index1.split("/")[0];
                a--;
                document.body.scrollTop = 0
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
                    url: "http://127.0.0.1:3000/api/getmoneyctrl",
                    data:{"pageid":a},
                    dataType:"json",
                    success: function (data) {
                        console.log(data);
                        var res = data["result"];
                        for(var i=0;i<res.length;i++){
                            res[i]["productComCount"] = res[i]["productComCount"].replace(/\D/g,"");
                        }
                        var html = template("temp",data);
                        $("#product_uu").html(html)
                    }
                });
                $("#select").find("option")[a-1].selected = true;
            })
        }
    });



})
