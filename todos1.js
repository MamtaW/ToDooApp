Todos = new Mongo.Collection('todos');

if(Meteor.isClient){
Template.todos.helpers({
    'todo': function(){
        return Todos.find();
    }
});



Template.addTodo.events({
    'submit form': function(event){
    event.preventDefault();
    var todoName = $('[name="todoName"]').val();
    Todos.insert({
        name: todoName,
        completed: false,
        createdAt: new Date()
    });
$('[name="todoName"]').val('');
}

});

 Template.todoItem.events({
    'keyup [name=todoItem]': function(event){
    var documentId = this._id;
    var todoItem = $(event.target).val();
    Todos.update({ _id: documentId }, {$set: { name: todoItem }});
    console.log("Task changed to: " + todoItem);
}
});

Template.todoItem.events({

'change [type=checkbox]': function(){
    var documentId = this._id;
    var isCompleted = this.completed;
    if(isCompleted){
        Todos.update({ _id: documentId }, {$set: { completed: false }});
        console.log("Task marked as incomplete.");
    } else {
        Todos.update({ _id: documentId }, {$set: { completed: true }});
        console.log("Task marked as complete.");
    }
}

});

}


