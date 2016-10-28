var HomeView = Backbone.View.extend({
	tagName: 'h1',
	className: 'home',
	template: _.template($('#home-template').html()),
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template());
    }
});
var homeView = new HomeView({el: $('#app')});