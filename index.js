var DetailView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($('#detail-template').html()),
	initialize: function() {
		this.render();
	},
	render: function() {
		// console.log(this.model);
		$('#container').empty().append(this.model);
		return this;
	}
});

var LeftView = Backbone.View.extend({
    tagName: 'div',
    className: 'form',
    model: {},
    collections: [],
    // template: _.template($('#left-template').html()),
    // events: {
    // 	"click #a": "showDetail"
    // },
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
            // console.log(_this.collections);
        }).error(function(err) {
			console.log(err);
		});
        return _this;
    },
    handleAll: function(arr) {
    	// var _this = this;
    	// console.log(arr);
    	arr.forEach(this.handleOne, this);
    	$('.detail').on('click', this.showDetail);
    },
    handleOne: function(item) {
    	this.collections.push(item);
    	$('#list').append('<li id="'+item.order+'">order: '+item.order+',title: '+item.title+'<button class="detail">More Detail</button></li>');
    },
    showDetail: function(e) {
    	var model = e.target.parentNode.firstChild;
    	var detailView = new DetailView({model:model});
    }
});

var RightView = Backbone.View.extend({
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
            _this.handleSome(res);
            // console.log(_this.collections);
        }).error(function(err) {
			console.log(err);
		});
        return _this;
	},
	handleSome: function(arr) {
    	for(i=0; i<arr.length/2; i++) {
    		$('#list').append('<li id="'+arr[i].order+'">order: '+arr[i].order+',title: '+arr[i].title+'<button class="detail">More Detail</button></li>');
    	}
    	$('.detail').on('click', this.showDetail);
    },
    showDetail: function(e) {
    	var model = e.target.parentNode.firstChild;
    	var detailView = new DetailView({model:model});
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