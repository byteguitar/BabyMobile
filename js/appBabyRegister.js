window.App= Ember.Application.create({
//	LOG_TRANSITIONS: true,

    mixmaster: 'Andy',
    totalReviews: 0,
    ready: function(){
console.log("start emberjs");
    },

	getView:function(name){
        var template = '';
        $.ajax(
            {
                url: 'templates/' + name + '.html',
                async: false,
                success: function (text) {
                    template = text;
                }
            });
        return Ember.Handlebars.compile(template);
    }


});


App.MobileBaseView = Em.View.extend({
    attributeBindings:['data-role']
});



App.PageView = App.MobileBaseView.extend({
    'data-role': 'page'
});

App.ToolbarBaseView = App.MobileBaseView.extend({
    attributeBindings:['data-position'],
    'data-position': function() {
        if (this.get('isFullScreen')) {
            return 'fullscreen'
        }

        if (this.get('isFixed')) {
            return 'fixed'
        }
        return ''
    }.property('isFixed', 'isFullScreen').cacheable(),

    isFixed: true,
    isFullsScreen: false
});

App.HeaderView = App.ToolbarBaseView.extend({
     'data-role': 'header',
	 template: App.getView("mainhead")//Ember.Handlebars.compile('<span >I am the template</span>'),
});

App.ContentView = App.MobileBaseView.extend({
    'data-role': 'content',
	template:App.getView("content")
});

App.FooterView = App.MobileBaseView.extend({
    'data-role': 'footer'
});



App.BabyRegisterView = App.PageView.extend({
    templateName:'babyregister',
    id: 'babyregister',
    didInsertElement: function() {
        $.mobile.changePage(this.$());
    }
});

App.BabiesHeaderView = App.ToolbarBaseView.extend({
     'data-role': 'header',
	 template: App.getView("babiesheader")//Ember.Handlebars.compile('<span >I am the template</span>'),
});

$(document).bind('mobileinit', function() {
    $.mobile.touchOverflowEnabled = true;
});



/*

$(document).bind("pageinit",function(){
	   console.log('page babyedit init');
    var v = App.get('babyRegisterView');
	if(!v)
	{
		console.log('main not created');
        v = App.BabyRegisterView.create();
        App.set('babyRegisterView',v);   //设置主要视图

        v.append();
	}
});
*/

$("#pageBabyRegister").live("pagebeforeshow",function(){
     console.log('page babyregister init');
    var v = App.get('babyRegisterView');
	if(!v)
	{
		console.log('main not created');
        v = App.BabyRegisterView.create();
        App.set('babyRegisterView',v);   //设置主要视图

        v.append();
	}
});

App.babiesController=Em.ArrayController.create({
});