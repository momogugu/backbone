var DetailView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($('#detail-template').html()),
	initialize: function() {
		this.render();
	},
	render: function() {
		$('#container').empty().append(this.template());
		return this;
	}
});

var LeftView = Backbone.View.extend({
    tagName: 'div',
    className: 'form',
    collections: [],
    // template: _.template($('#left-template').html()),
    events: {
    	"click #detail": "showDetail"
    },
    initialize: function() {
        this.render();
    },
    render: function() {
        var _this = this;
        $.ajax({
            url: "http://127.0.0.1:8080/todos/",
            method: "GET",
            dataType: "json",
        }).success(function(res) {
            // console.dir(res);
            $('#container').empty().append('<ol id="list"></ol>');
            _this.handleAll(res);
            console.log(_this.collections);
        }).error(function(err) {
			console.log(err);
		});
        return _this;
    },
    handleAll: function(arr) {
    	// console.log(arr);
    	arr.forEach(this.handleOne, this);
    },
    handleOne: function(item) {
    	this.collections.push(item);
    	$('#list').append('<li>order: '+item.order+' title: '+item.title+'<button id="detail">More Detail</button></li>');
    },
    showDetail: function() {
    	this.detailView = new DetailView;
    	this.detailView.parentView = this;
    }
});

var RightView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		$('#container').empty();
	}
});

var HeaderView = Backbone.View.extend({
    el: $('#header'),
    template: _.template($('#home-template').html()),
    events: {
        "click #left": "showLeftView",
        "click #right": "showRightView"
    },
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template());
    },
    showLeftView: function() {
        this.leftView = new LeftView;
        this.leftView.parentView = this;
        
    },
    showRightView: function() {
    	this.rightView = new RightView;
        this.rightView.parentView = this;
    }
});
var headerView = new HeaderView;