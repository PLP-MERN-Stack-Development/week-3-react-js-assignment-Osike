import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Check, Trash2, Circle } from 'lucide-react';
import { Task, TaskFilter } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Card from './ui/Card';
import Button from './ui/Button';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTasks(prev => [newTask, ...prev]);
      setNewTaskText('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);
    
    const matchesSearch = 
      searchQuery === '' ||
      task.text.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
          Task Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Organize your tasks efficiently with our beautiful task management interface.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {taskStats.total}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
            {taskStats.completed}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
            {taskStats.active}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </Card>
      </div>

      {/* Add Task */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a new task..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <Button onClick={addTask} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </Card>

      {/* Filters and Search */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-wrap gap-2">
            {(['all', 'active', 'completed'] as TaskFilter[]).map((filterOption) => (
              <Button
                key={filterOption}
                variant={filter === filterOption ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter(filterOption)}
                className="capitalize"
              >
                <Filter className="h-4 w-4 mr-1" />
                {filterOption}
              </Button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </Card>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              {tasks.length === 0 ? (
                <>
                  <Circle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
                  <p>Create your first task to get started!</p>
                </>
              ) : (
                <>
                  <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                  <p>Try adjusting your search or filter criteria.</p>
                </>
              )}
            </div>
          </Card>
        ) : (
          filteredTasks.map((task, index) => (
            <Card
              key={task.id}
              hover
              className={`p-4 animate-slide-up ${
                task.completed ? 'opacity-75' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    task.completed
                      ? 'bg-accent-600 border-accent-600 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-accent-500'
                  }`}
                >
                  {task.completed && <Check className="h-4 w-4" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-lg transition-all duration-200 ${
                      task.completed
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {task.text}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Created {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;