import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Button from '../components/Button'
import Card from '../components/Card'

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Task Manager</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <Button onClick={addTask} className="rounded-l-none">
          Add
        </Button>
      </div>

      <div className="flex space-x-2 mb-4">
        <Button 
          variant={filter === 'all' ? 'primary' : 'secondary'} 
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'active' ? 'primary' : 'secondary'} 
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button 
          variant={filter === 'completed' ? 'primary' : 'secondary'} 
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li 
            key={task.id} 
            className={`flex items-center justify-between p-3 border rounded-md ${task.completed ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span 
                className={`ml-3 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}
              >
                {task.text}
              </span>
            </div>
            <Button 
              variant="danger" 
              size="sm"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default TaskManager
