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

  function getRandomNumber(min = 0, max = 1000) {
    return Math.floor(Math.random() * max) + min
  }

  function handleCreateNewTask() {

    if (!Boolean(newTaskTitle)) {
      return
    }

    const newTask = {
      id: getRandomNumber(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(previousTasks => [...previousTasks, newTask])

  }

  function handleToggleTaskCompletion(id: number) {
    
    function mapTasks(task: Task) {
      if (task.id === id) {
        task.isComplete = !task.isComplete
      }
      return task
    }

    setTasks(previousTasks => previousTasks.map(mapTasks))
    
  }

  function handleRemoveTask(id: number) {
    
    function filterTasks(task: Task) {
      return task.id !== id
    } 

    setTasks(previousTasks => previousTasks.filter(filterTasks))

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