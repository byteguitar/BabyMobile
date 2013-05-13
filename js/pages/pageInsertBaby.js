
$("#pageInsertBaby").live("pagebeforeshow",function(){
    $("#pageInsertBaby_butSubmit").click(function(){

        var  baby={
            UserName:$("#txtBabyName").attr("value")

        };
        $.ajax({
            url: gRestSite+"babys?apikey=1",
            type: 'post',
            data: JSON.stringify(baby),
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                console.log("insert baby  ok");
            }
        });
    });
});