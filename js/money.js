/**
 * Created by Administrator on 2017/7/17 0017.
 */
$(function () {

    //��ȡselect�������
    //document����
    //document.getElementById("select").onchange= function () {
    //    //console.dir(this.selectedIndex);
    //    //var ind = this.selectedIndex;
    //    //console.log(this.children[this.selectedIndex]);
    //    console.log(this.value);
    //}
    //jquery����
    $("#select").change(function() {
        //console.log(this.value);
        var index = $(this).val()
        //console.log(this[0].value);
        var a = index.split("/")[0];
        //ÿ��select��Ψһ���ԣ���ȥ���Կ���
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
            //��ȡ����
            var fen = data.pagesize;
            var zong = data.totalCount;
            var pages = Math.floor(zong/fen);
            console.log(pages);
            var arr = [];
            for(var i=1;i<pages+1;i++){
                arr.push(i+"/"+pages)
            }
           // console.log(arr);
            //����м��select��ť
            var list= {list:arr}
            var html= template("tep",list)
            $("#select").html(html)
            //console.log(html);

          //  $("#select").find("option")[2].selected = true;


            //�����һҳ


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
                    alert("û����");
                    return
                }
                //���select���ݱ任
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
            //��һҳ

            var a;

            $("#btnt").on("click", function () {
                var index1 = $("#select").val()
                //console.log(this[0].value);
                a = index1.split("/")[0];
                a--;
                document.body.scrollTop = 0
                if(a<=0){
                    alert("������");
                    return;
                }
                //���select���ݱ任
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
