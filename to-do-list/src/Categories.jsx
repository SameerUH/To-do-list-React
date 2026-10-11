//Imports:
import { useState } from "react";
import TaskOutput from "./components/TaskOutput";
import EditCard from './components/EditCard';

function Categories({todos, deleteTodo, editTodo}) {
    //Filtering for categories:
    const educationTodos = todos.filter(todo => todo.category === "Education" && !todo.completed);
    const personalTodos = todos.filter(todo => todo.category === "Personal" && !todo.completed);
    const otherTodos = todos.filter(todo => todo.category === "Other" && !todo.completed);
    const careerTodos = todos.filter(todo => todo.category === "Career" && !todo.completed);

    //No category tasks checker:
    const [editingTodo, setEditingTodo] = useState(null);
    const incompletePersonalTodos = todos.filter(e=> e.category == "Personal" && !e.completed);
    const incompleteEducationTodos = todos.filter(e=> e.category == "Education" && !e.completed);
    const incompleteOtherTodos = todos.filter(e=> e.category == "Other" && !e.completed);
    const incompleteCareerTodos = todos.filter(e=> e.category == "Career" && !e.completed);



    return (
        <>
        <div className="flex w-3/4 self-center border-b mb-5">
            <p className="italic">Education:</p>
        </div>

        {educationTodos.map(todo => (
            <TaskOutput key={todo.id} data={todo} onDelete={deleteTodo} onEditClick={editTodo}/>
        ))}
        {incompleteEducationTodos.length === 0 && <p>No education tasks to complete</p>}
        

        <div className="flex w-3/4 self-center border-b mb-5">
            <p className="italic"> Personal:</p>
        </div>

        {personalTodos.map(todo => (
            <TaskOutput key={todo.id} data={todo} onDelete={deleteTodo} onEditClick={editTodo}/> 
        ))}
        {incompletePersonalTodos.length === 0 && <p>No personal tasks to complete</p>}

        <div className="flex w-3/4 self-center border-b mb-5">
            <p className="italic">Career</p>
        </div>

        {careerTodos.map(todo => (
            <TaskOutput key={todo.id} data={todo} onDelete={deleteTodo} onEditClick={editTodo}/>
        ))}
        {incompleteCareerTodos.length === 0 && <p>No career tasks to complete</p>}

        <div className="flex w-3/4 self-center border-b mb-5">
            <p className="italic">Other:</p>
        </div>

        {otherTodos.map(todo => (
            <TaskOutput key={todo.id} data={todo} onDelete={deleteTodo} onEditClick={editTodo}/>
        ))}
        {incompleteOtherTodos.length === 0 && <p>No career tasks to complete</p>}

        {editingTodo && (
            <EditCard todo={editingTodo} onSave={editTodo} setEdit={() => setEditingTodo(null)}/>
        )}
        </>
    );
}

export default Categories;