'use strict';

var React = require('react');
var ReactDOM = require('react-DOM');

var App = React.createClass({

  getInitialState: function(){
      return { //state object
        todos: [
          { title: 'placeholder todo 1', complete: false, },
          { title: 'placeholder todo 2', complete: false, },
          { title: 'placeholder todo 3', complete: false, }

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

  renderTodos: function(todo, index){
    return <Todo key={index}
                id={index}
                complete={todo.complete}
                toggleComplete={this.toggleComplete}
                todoData={todo}/>;

    //<Todo key etc... is a comp instance
    //for each state "Todo" we will render
      // <li key={index}>{ value.title }</li>)
  },
  //made child in array a unique key to remove error in console

  //value, index means render each <li> (todo)

  render(){
    return (
      <div className="todo-list">
          <h1>Todo List!</h1>
          <ul>
            { this.state.todos.map(this.renderTodos)}
          </ul>
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


  render: function(){
    return( //return HTML wrapped in ()
      <li> { this.props.todoData.title }
        <input type="checkbox" id={this.props.id} checked={this.props.todoData.complete} onClick={this.tellParentToToggleComplete}/>
        <label htmlFor={this.props.id} id={this.props.key}></label>
        <button><i className="fa fa-trash"></i></button>
    </li>
      )
  }

});


ReactDOM.render(<App/>, document.querySelector('#todo-app'));
