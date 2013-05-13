/*
 *  writted by tc
 */


$("#pageMain").live("pagebeforeshow",function(){

    console.log(localStorage["isLogin"]);
    if(localStorage["isLogin"]=="true")
        $("#pageMain_listRegister").hide();

    var babyMilkCare=new CBabyMilkCare();
    babyMilkCare.bindPage("listCareStatus");
    babyMilkCare.bindAllCareStatus(function(milkCareCount,lastMilkTime){
         $("#pageMain_MilkCareStatus").html("喂奶次数"+milkCareCount+"<br/>"+lastMilkTime);
    });

    //得到宝宝
    $.ajax({ type: "get",
        url: gRestSite+"baby",
        crossDomain:true,
        success: function(data)
        {
            for(var i=0;i<data.length;i++)
                $("<option value='"+data[i].BabyID+"'>"+data[i].BabyName+"</option>").appendTo($("#pageMain_selectBaby"));
            $("#pageMain_selectBaby").selectmenu('refresh', true);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
    $('#pageMain_selectBaby').bind( "change", function(event, ui) {

        var  sel=$(this).children('option:selected').val();//这就是selected的值
            console.log(sel)
    });


        var cnmsg = {

        required: "必填字段",
        remote: "请修正该字段",
        email: "请输入正确格式的电子邮件",
        url: "请输入合法的网址",
        date: "请输入合法的日期",
        dateISO: "请输入合法的日期 (ISO).",
        number: "请输入合法的数字",
        digits: "只能输入整数",
        creditcard: "请输入合法的信用卡号",
        equalTo: "请再次输入相同的值",
        accept: "请输入拥有合法后缀名的字符串",
        maxlength: jQuery.format("请输入一个长度最多是 {0} 的字符串"),
        minlength: jQuery.format("请输入一个长度最少是 {0} 的字符串"),
        rangelength: jQuery.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
        range: jQuery.format("请输入一个介于 {0} 和 {1} 之间的值"),
        max: jQuery.format("请输入一个最大为 {0} 的值"),
        min: jQuery.format("请输入一个最小为 {0} 的值")
    };
    jQuery.extend(jQuery.validator.messages, cnmsg);

    jQuery.validator.addMethod("nickname", function( value, element ) {
        if(value.length==0){
            return false;
        }
        var result =  this.optional(element) || value.length >= 6;
        if (!result) {
            element.value = "";
            var validator = this;
            setTimeout(function() {
                validator.blockFocusCleanup = true;
                element.focus();
                validator.blockFocusCleanup = false;
            }, 1);
        }
        return result;
    }, "请你至少输入6个字符的昵称.");

    jQuery.validator.addMethod("nickrepeat", function( value, element ) {
        var result=false;
        $.ajaxSetup({
            async: false
        });
        var param = {
            userName: value
        };
        $.support.cors=true;
        $.ajax({ type: "get",
            url: "http://219.219.12.154:8080/api/users?name="+value,
            crossDomain:true,

            //jsonp:"jsonpcallback",
            //data:"username=" + escape(value),
            //jsonp:"callbackparam",
            //jsonpCallback:"jsonpCallback",
            //dataType:"jsonp",
            success: function(data)
            {

              if(data.status=="error")

               result=false;
                else
              {
                  result=true;
                  console.log("user name ok");
              }

            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        })
        // 恢复异步
        $.ajaxSetup({
            async: true
        });

        return result;
    }, "已经存在该用户，请换一个名字");


    $("#commentForm").validate({
        rules: {
            "nickname": {
                required: true
          }
        },

        onkeyup: false,
        message:{
            "nickname": {
                required: "请输入用户名"

            }
        },

       //验证成功后,跳转页面
        submitHandler: function (form) {
                console.log("form validate ok");
            var  user={
                NickName:$("#txtNickName").attr("value"),
                Email:$("#txtEmail").attr("value")

            };
            $.ajax({
                url: 'http://localhost:15058/api/users?apiKey=1',
                type: 'post',
                data: JSON.stringify(user),
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    console.log("registe ok");
                    localStorage["isLogin"]=true;
                    localStorage["userID"]=data.response.Users[0].UserID;


                    $.mobile.changePage("#pageRegister");//

                }
            });




        }

    });

    ///////////////////////////


});


