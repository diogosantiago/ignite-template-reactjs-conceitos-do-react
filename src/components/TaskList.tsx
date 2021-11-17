import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    const random = 10000;
    if(newTaskTitle){
      let id = Math.floor(Math.random()*random)
      let i = 0;
      while(i < random && tasks.filter(element => element.id == id).length){
        id = Math.floor(Math.random()*random)
        i++;
      }

      if(i < random){
        setTasks(oldValue => [...oldValue, {id, title: newTaskTitle, isComplete: false}])
        setNewTaskTitle('')
      }
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const taskChanged = tasks.map(element => id == element.id? {...element, isComplete: !element.isComplete} : element)
    setTasks(taskChanged)
  }

  function handleRemoveTask(id: number) {
    const taskDeleted = tasks.filter(element => id != element.id)
    setTasks(taskDeleted)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}