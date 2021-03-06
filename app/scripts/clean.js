// Create the ToDo 'Model'

ToDo = Backbone.Model.extend({
 
  defaults: {
    // human: true
  },
 
  idAttribute: '_id'
});
 

// Create the ToDoList 'Collection'

ToDoList = Backbone.Collection.extend({
  model: ToDo,
  url: 'http://tiny-pizza-server.herokuapp.com/collections/WHC-ToDo-List',
})
 
 
 
// Create the ToDoView 'View'

ToDoView = Backbone.View.extend({

  tagName:  "li",

  className: "name-column",
 
  template: _.template($('.todo-list-item').text()),
  editTemplate: _.template($('.edit-todo-list-item').text()),
 
  events: {
    'click .edit-button'    : 'editTask',
    'click .save-button'    : 'saveChanges',
    'click .delete-button'  : 'destroy',
  },
 
  initialize: function(){
 
    this.listenTo(this.model, 'change', this.render);
 
 
    $('.container').append(this.el);
    this.render();
  },
 
  render: function(){
    var renderedTemplate = this.template(this.model.attributes)
    this.$el.html(renderedTemplate);
  },

  editTask: function(){
    var renderedTemplate = this.editTemplate(this.model.attributes)
    this.$el.html(renderedTemplate);
  },
 
  saveChanges: function(){
    var nameVal = this.$el.find('.name input').val();
    this.model.set('name', nameVal);
    this.model.save()
  },
 
  destroy: function(){
    this.model.destroy();
    this.remove();
  },


 
})
 

// This creates the function which defines what the .click function will do

$(function(){
  $('.add-new').click(function(){
    var inputVal = $('.add-new-input').val()
    var newToDoInstance = newToDos.add({name: inputVal})
 
    newToDoInstance.save()

  })
})
 
 
// The AppView is saying listenTo for newToDos and if found, add them as a new instance of the ToDoView.

AppView = Backbone.View.extend({
 
  initialize: function(){
    this.listenTo(newToDos, 'add', function(task){
      new ToDoView({model: task})
    })
  }
 
});
 
// Creates instances
 
var newToDos = new ToDoList();
var app = new AppView();
 
newToDos.fetch();