'use strict';

var React = require('react');
var ReactDOM = require('react-DOM');

var App = React.createClass({

  getInitialState: function(){
      return { //state object
        todos: [


          //props
        ]
      }
  },
//components have 2 types of data= properties and states. we set our state in comp and define props on state instances

  toggleComplete: function(theTodoFromTheInstance){

    var newTodoArray = this.state.todos.map(function(theTodoToModify){
      if(theTodoFromTheInstance === theTodoToModify){
        theTodoToModify.complete = !theTodoToModify.complete;

      }
      return theTodoToModify;
      //return value to new array
      //because map, have to return - getting a new array and now set the state to new array
    });

    this.setState({ todos: newTodoArray});

  },

    removeTodo: function(todoData){

      //similar to toggleComplete

      var newTodoArray = this.state.todos.filter(function(theTodoToRemove){
        //filter uses true or false
        return todoData === theTodoToRemove ? false : true;

      });

      this.setState({ todos: newTodoArray});

    },

    removeSelector: function(){
      var newTodoArray = this.state.todos.filter(function(todoItem){
        return todoItem.complete ? false : true;

      });

      this.setState({todos: newTodoArray });

    },

  renderTodos: function(todo, index){
    return <Todo key={index}
                id={index}
                complete={todo.complete}
                toggleComplete={this.toggleComplete}
                removeTodo={this.removeTodo}
                todoData={todo}/>;

    //<Todo key etc... is a comp instance
    //for each state "Todo" we will render
      // <li key={index}>{ value.title }</li>)
  },
  //made child in array a unique key to remove error in console

  //value, index means render each <li> (todo)

  addTodo: function(event){

    event.preventDefault();

    if(this.refs.addTodo.value){
        this.state.todos.push({title: this.refs.addTodo.value, complete:false });
        this.setState({ todos: this.state.todos});
        this.refs.addTodo.value = '';
    }
  },
  //setState (new state) ({new object: old state it is replacing})
  //only inputs get .val/value

  hasCompleted: function(){

    var completedTodosArray = this.state.todos.filter(function(todoItem){
      return todoItem.complete === true;

    });

    return completedTodosArray.length;
  },

  render: function(){

    var number = this.state.todos.length;
    return (
      <div className="todo-list">
          <h1>Todo List!</h1>
          <div className="add-todo">
            <form name="addTodoForm" onSubmit={this.addTodo}>
            <input type="text" ref="addTodo" /><span>(hit enter to add)</span>
            </form>
          </div>
            <ul>
            { this.state.todos.map(this.renderTodos) }
            </ul>
            <div className="todo-admin">
            <div>
              { number } { number > 1 || number === 0 ? "todos" : "todo" }
            </div>
            <div> { this.hasCompleted() ?
                <button className="removeSelector" onClick={this.removeSelector}>Clear selected</button> : ""
                }
            </div>
          </div>
      </div>
    )
  }
});
//this refers to var App on which we make the array method
//map= iterator, like forEach, maps over each element in state.todos and return an <li>
//map uses function as its argument (the value is the renderTodos)
//could put renderTodos function within the map()


//component definition

var Todo = React.createClass({

  getInitialState: function(){
    return {};
  },

  tellParentToToggleComplete: function(){
    this.props.toggleComplete(this.props.todoData);
  },

  tellParentToRemoveTodo: function(){
    this.props.removeTodo(this.props.todoData);
  },

  render: function(){
    return( //return HTML wrapped in ()
      <li>{ this.props.todoData.title }
        <input type="checkbox" id={this.props.id} checked={this.props.todoData.complete} onClick={this.tellParentToToggleComplete}/>
        <label htmlFor={this.props.id} id={this.props.key}></label>
        <button onClick={this.tellParentToRemoveTodo}><i className="fa fa-trash"></i></button>
    </li>
      )
  }

});


ReactDOM.render(<App/>, document.querySelector('#todo-app'));
