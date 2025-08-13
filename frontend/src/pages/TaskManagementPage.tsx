import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, Calendar, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useTasks, useProjects, useUsers } from '../contexts/AppContext';
import { useTheme } from '../hooks/useTheme';
import './TaskManagement.css';
import '../styles/animations.css';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assigneeId?: string;
  projectId?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const { users } = useUsers();
  const { projects } = useProjects();
  
  const assignee = users.find(user => user.id === task.assigneeId);
  const project = projects.find(proj => proj.id === task.projectId);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow cursor-move task-card"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 truncate flex-1">{task.title}</h4>
        <div className="flex space-x-1 ml-2">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 text-sm"
            aria-label={`Edit task ${task.title}`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 text-sm"
            aria-label={`Delete task ${task.title}`}
          >
            Delete
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          {project && (
            <span className="text-gray-500">{project.name}</span>
          )}
        </div>
        
        {assignee && (
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3 text-gray-400" />
            <span className="text-gray-600">{assignee.name}</span>
          </div>
        )}
      </div>
      
      {task.dueDate && (
        <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
};

interface ColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
  icon: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ 
  title, 
  status, 
  tasks, 
  onEdit, 
  onDelete, 
  onStatusChange,
  icon 
}) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onStatusChange(taskId, status);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="column-container">
      <div className="column-content">
        <div className="column-header">
          <div className="column-title-section">
            {icon}
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <span className="column-task-count">
              {tasks.length}
            </span>
          </div>
        </div>
        
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="column-drop-area column-drop-zone"
        >
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface TaskFormProps {
  task?: Task;
  onSave: (task: Partial<Task>) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
  const { projects } = useProjects();
  const { users } = useUsers();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'MEDIUM' as Task['priority'],
    assigneeId: task?.assigneeId || '',
    projectId: task?.projectId || '',
    dueDate: task?.dueDate ? task.dueDate.split('T')[0] : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      dueDate: formData.dueDate ? `${formData.dueDate}T00:00:00Z` : undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-xl p-6 w-full max-w-md mx-4 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {task ? 'Edit Task' : 'Create New Task'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Title *
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Enter task title"
            />
          </div>
          
          <div>
            <label htmlFor="description" className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Enter task description"
            />
          </div>
          
          <div className="form-grid-two-columns">
            <div>
              <label htmlFor="priority" className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Priority
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                aria-label="Select task priority"
                title="Select task priority"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="assignee" className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Assignee
              </label>
              <select
                id="assignee"
                value={formData.assigneeId}
                onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                aria-label="Select task assignee"
                title="Select task assignee"
              >
                <option value="">Unassigned</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-grid-two-columns">
            <div>
              <label htmlFor="project" className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Project
              </label>
              <select
                id="project"
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                aria-label="Select project for task"
                title="Select project for task"
              >
                <option value="">No Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="dueDate" className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                aria-label="Select task due date"
                title="Select task due date"
              />
            </div>
          </div>
          
          <div className="button-group-end">
            <button
              type="button"
              onClick={onCancel}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                isDarkMode 
                  ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' 
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TaskManagementPage: React.FC = () => {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();
  const { projects } = useProjects();
  const { users } = useUsers();
  const { isDarkMode } = useTheme();
  
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  useEffect(() => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedProject) {
      filtered = filtered.filter(task => task.projectId === selectedProject);
    }

    if (selectedAssignee) {
      filtered = filtered.filter(task => task.assigneeId === selectedAssignee);
    }

    if (selectedPriority) {
      filtered = filtered.filter(task => task.priority === selectedPriority);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, selectedProject, selectedAssignee, selectedPriority]);

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(taskData);
      }
      setShowTaskForm(false);
      setEditingTask(undefined);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleStatusChange = async (id: string, status: Task['status']) => {
    try {
      await updateTask(id, { status });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedProject('');
    setSelectedAssignee('');
    setSelectedPriority('');
  };

  return (
    <div className={`task-management-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="task-management-content">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
            <button
              type="button"
              onClick={handleCreateTask}
              data-create-task
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 btn-primary"
              aria-label="Create new task"
            >
              <Plus className="h-4 w-4" />
              <span>Create Task</span>
            </button>
          </div>

          {/* Filters */}
          <div className="filters-container">
            <div className="filters-header">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="font-medium text-gray-700">Filters</span>
              <button
                type="button"
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 text-sm"
                aria-label="Clear all filters"
              >
                Clear All
              </button>
            </div>
            
            <div className="filters-grid">
              <div className="search-input-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input form-input"
                  aria-label="Search tasks by title or description"
                />
              </div>
              
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 form-input"
                aria-label="Filter tasks by project"
                title="Filter tasks by project"
              >
                <option value="">All Projects</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
              
              <select
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 form-input"
                aria-label="Filter tasks by assignee"
                title="Filter tasks by assignee"
              >
                <option value="">All Assignees</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 form-input"
                aria-label="Filter tasks by priority"
                title="Filter tasks by priority"
              >
                <option value="">All Priorities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="task-grid-columns">
          <Column
            title="To Do"
            status="TODO"
            tasks={getTasksByStatus('TODO')}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            icon={<AlertCircle className="h-5 w-5 text-gray-500 progress-circle-todo" />}
          />
          
          <Column
            title="In Progress"
            status="IN_PROGRESS"
            tasks={getTasksByStatus('IN_PROGRESS')}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            icon={<div className="h-5 w-5 bg-blue-500 rounded-full progress-circle-progress" />}
          />
          
          <Column
            title="Review"
            status="REVIEW"
            tasks={getTasksByStatus('REVIEW')}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            icon={<div className="h-5 w-5 bg-yellow-500 rounded-full progress-circle-review" />}
          />
          
          <Column
            title="Done"
            status="DONE"
            tasks={getTasksByStatus('DONE')}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            icon={<CheckCircle className="h-5 w-5 text-green-500 progress-circle-done" />}
          />
        </div>

        {/* Task Form Modal */}
        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSave={handleSaveTask}
            onCancel={() => {
              setShowTaskForm(false);
              setEditingTask(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TaskManagementPage;
