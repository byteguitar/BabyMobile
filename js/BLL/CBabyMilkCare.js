/**
 * Created by JetBrains WebStorm.
 * User: byteguitar
 * Date: 13-5-11
 * Time: 下午7:06
 * To change this template use File | Settings | File Templates.
 */

var CBabyMilkCare=Base.extend({
    constructor:function()
    {

    },
    bindPage:function(pageName){
        $.ajax(
            {
                url: 'pages/' + pageName + '.html',
                async: false,
                success: function (text) {
                 $(text).appendTo($("#divCareStatus"));
                }
            });
    },
    bindAllCareStatus:function(bindFunc)
    {
        $.ajax({ type: "get",
            url: gRestSite+"BabyMilkCare",
            crossDomain:true,
            success: function(data)
            {
               var milkCareCount=data.length;
               var lastMilkTime=data[0].MilkCareTime;
                console.log(lastMilkTime);
               bindFunc(data.length,lastMilkTime);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    }


});
