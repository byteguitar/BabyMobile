/*
writted by tc  2013/5/11
 */
$("#pageConfigBaby").live("pagebeforeshow",function(){

    $.ajax({ type: "get",
        url: gRestSite+"baby",
        crossDomain:true,
        success: function(data)
        {
            console.log('get baby info');

            var list=$("#pageConfigBaby_listBaby");
            for(var i=0;i<data.length;i++)
            list.append("<li>"+data[i].BabyName+"</li>");
            list.listview("refresh");


        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });

});
