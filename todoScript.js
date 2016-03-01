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
    render : function(){
    	console.log("inside Todo");
		return(
			<div className = "todo">
			<p>{this.props.task}</p>
			<button>Done</button>
			</div>
		);	    	
   	}
});


var TodoList = React.createClass({
	render : function(){
		var tasks = this.props.data.map(function(comment) {
      		return (
        		<Todo task={comment.task} />
      		);
    	});
		console.log("inside TodoList");
		
		return(
			<div className="todoList">
			{tasks}
			</div>
		);
	}
});


var TodoApp = React.createClass({
	render : function(){
		console.log("inside TodoApp");
		return(
			<div className="todoApp">
			<h1>Todos</h1>
			<TodoList data={this.props.data}/>
			<Add data={this.props.data}/>
			</div>
		);
	}
});


ReactDOM.render(
	<TodoApp data={list}/>,
	document.getElementById("content")
);
