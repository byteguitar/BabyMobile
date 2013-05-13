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
	template:App.getView("content"),

   
});

App.ContentView_ListBabyRecord=Ember.View.extend({
	
	contentBinding:"App.BabyCareRecordController.content",
		didInsertElement:function(){

            var _self = this;
            Em.run.next(function() {
            //    _self.$("#listBabyRecord").listview('refresh');
            });
	},
    contentLengthDidChange: function(){
        console.log('listview changed');
        var _self = this;

        Em.run.next(function() {
            _self.$("#listBabyRecord").listview('refresh');
        });


    }.observes('content.length'),  //观察到属性的值的改变，

    contentDidChange:function(){
       console.log("content changed");
    }.observes("content.length"),

	   insertBabyCare:function(event){

           App.BabyCareRecordController.insertBabyCare();



	}
});

App.FooterView = App.MobileBaseView.extend({
    'data-role': 'footer'
});

App.MainView = App.PageView.extend({
    templateName:'main',
    id: 'pageMain',
    didInsertElement: function() {   
		console.log("insert element ,jump pageMain");
        $.mobile.changePage(this.$());  //�ڵ�����append�󣬶���ҳ���������ת��
    }
});


App.IndexRoute = Ember.Route.extend({
setupController: function(controller) {   
   
//	controller.set('content', App.BabyCareRecordController.content);
  },
	  
});



$(document).bind('mobileinit', function() {
    $.mobile.touchOverflowEnabled = true;
});


$(document).bind('pageinit', function(){
    console.log('pageinit');

    var v = App.get('mainView');

    if (!v) {
        console.log('main not created');
        v = App.MainView.create();
        App.set('mainView',v);   //������Ҫ��ͼ
        v.append();
    }
});


$("#pageMain").live("pagebeforeshow",function(){

     console.log('page main back');
    var v = App.get('mainView');
v.remove();
v.append();
      
});

//*************************************************************************************
App.BabyRegisterView = App.PageView.extend({
    templateName:'babyregister',
    id: 'pageBabyRegister',
    didInsertElement: function() {
        $.mobile.changePage(this.$());
    }
});



$("#pageBabyRegister").live("pagebeforeshow",function(){

     console.log('page babyregister init');
    var v = App.get('babyRegisterView');
	if(!v)
	{
		console.log('main not created');
        v = App.BabyRegisterView.create();
        App.set('babyRegisterView',v);   //������Ҫ��ͼ
        v.append();


	}
	else
	{
		v.remove();
		v.append();
	}
});


App.BabyRegisterHeaderView = App.ToolbarBaseView.extend({
     'data-role': 'header',
	 template: App.getView("babiesheader")//Ember.Handlebars.compile('<span >I am the template</span>'),
});





App.babiesController=Em.ArrayController.create({
});