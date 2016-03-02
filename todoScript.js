var list = [
	{task : "Exercise"},
 	{task : "Eat"}
];

var Add = React.createClass({
	getInitialState (){
		return {task : ''};
	},
	handleTaskChange(e) {
		this.setState({task : e.target.value})
	},
	handleAdd(e){
		e.preventDefault();
		var myTask = this.state.task.trim();
		if (!myTask){
			return;
		}
		
		console.log("add task "+ myTask);
		this.props.onAddClicked({task : myTask});
		this.setState({task : ''})
	},
	
	render : function(){
		console.log("inside add");
		return (
			<form className="add" onSubmit={this.handleAdd}>
				<input 
					type="text" 
					placeholder="Enter Task" 
					value={this.state.task} 
					onChange={this.handleTaskChange}
				/>
        		<input type="submit" value="Add" />
			</form>
		);
	}
});

var Todo = React.createClass({

	handleDone : function(){
		console.log("inside handle done of Todo");
		console.log({task : this.props.task.toString()});
		//console.log(this.props.handleClickTodo);
		this.props.handleClickTodo([{task : this.props.task.toString()}]);
		//this.props.handleClickTodo(this);
	},

    render : function(){
    	console.log("inside Todo");
		return(
			<div className = "todo">
			<p>{this.props.task}</p>
			<button onClick={this.handleDone}>Done</button>
			</div>
		);	    	
   	}
});


var TodoList = React.createClass({

	handleClick : function(todo){
		console.log("inside handle click of TodoList");
		console.log(todo);
		this.props.handleClick(todo);
	},

	render : function(){
		var self = this;
		var tasks = this.props.data.map(function(comment) {
      		return (
        		<Todo task={comment.task} handleClickTodo={self.handleClick}/>
      		);
    	});
		console.log("inside TodoList render");		
		return(
			<div className="todoList">
			{tasks}
			</div>
		);
	}
});


var TodoApp = React.createClass({

	getInitialState : function() {
		return {data : this.props.data};
	},

	handleTaskDone : function(todo){
		console.log("inside handle task submit of TodoApp");
		console.log(todo[0]);
		var todos = this.state.data;
		for (var i = 0; i<todos.length; i++){
			if (todos[i].task==todo[0].task){
				console.log("match found " + todos[i].task);
				break;
			}
		}
		todos.splice(i, 1);
		this.setState({data : todos});
	},

	handleSubmit : function(todo){
		console.log('inside handle Submit of TodoApp');
		var todos = this.state.data;
		var newTodos = todos.concat([todo]);		
		this.setState({data : newTodos});
	},

	render : function(){
		console.log("inside TodoApp");
		var self = this;
		return(
			<div className="todoApp">
			<h1>Todos</h1>
			<TodoList data={this.state.data} handleClick={self.handleTaskDone}/>
			<Add onAddClicked={this.handleSubmit}/>
			</div>
		);
	}
});


ReactDOM.render(
	<TodoApp data={list}/>,
	document.getElementById("content")
);
