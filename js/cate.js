/**
 * Created by Administrator on 2017/7/16 0016.
 */
$(function () {
    //�����б�
    $.ajax({
        url:'http://127.0.0.1:3000/api/getcategorytitle',
        data:{},
        dataType:"json",
        success: function (data) {
            //��ȡ���ݽ�����Ⱦ
            console.log(data);
            var html = template("temp",data);
            $(".box1").html(html);

            //��ȡarrow��ť
            var a1s = $(".a1")
            //Ȼ���������
            for(var i=0;i<a1s.length;i++){
                //�����¼�
                a1s[i].onclick = function () {
                    for(var j=0;j<a1s.length;j++){
                        $(".a1").find("img").attr("src","./images/arrow-b.png");
                    }
                    $(this).find("img").attr("src","./images/arrow-up.png");
                    //��ȡ��ǰID
                    var a = this;
                    //console.log(this.id);
                    var attributea = this.getAttribute("data-a")
                    //console.log(attributea);
                    //ֻ����һ��
                    if(attributea === "a"){
                        this.setAttribute("data-a","b")
                        //�������б�

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
                                //׷��html
                                // console.log(b+html);
                                $(a).html(b+html);
                                //var ul = document.createElement("ul");
                                //ul = $(ul).html(html);
                                //console.log(ul);
                                //$(ul).appendTo($(a));

                            }
                        });
                        //��ȡ���е�a���ul
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