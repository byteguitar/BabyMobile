
App.BabyCareRecord = Ember.Object.extend({
    title: null,
    artist: null,
    genre: null,
    listens: 0
});
App.BabyCareRecordController = Ember.ArrayController.create({
    content: [],

    init: function(){
        // create an instance of the Song model
        var song = App.BabyCareRecord.create({
            title: 'Son of the Morning',
            artist: 'Oh, Sleeper',
            genre: 'Screamo'
        });
        this.pushObject(song);
    },
    insertBabyCare:function(event){
		console.log("insert from controller ok");
		  var song = App.BabyCareRecord.create({
            title: 'Son  Morning',
            artist: 'Oh, Sleeper',
            genre: 'Screamo'
        });
        this.pushObject(song);
	}

});

