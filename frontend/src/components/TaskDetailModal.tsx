// src/components/TaskDetailModal.tsx
import React, { useState, useEffect } from 'react';
import { X, MessageCircle, User, Calendar } from 'lucide-react';
import { tasksApi, taskCommentsApi, type Task, type TaskComment } from '../services/api';

interface TaskDetailModalProps {
  taskId: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ 
  taskId, 
  isOpen, 
  onClose, 
  onUpdate 
}) => {
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && taskId) {
      loadTaskData();
      loadComments();
    }
  }, [isOpen, taskId]);

  const loadTaskData = async () => {
    try {
      setLoading(true);
      const response = await tasksApi.getTaskById(taskId);
      setTask(response.data);
    } catch (error) {
      console.error('❌ Failed to load task:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      setCommentsLoading(true);
      const response = await taskCommentsApi.getCommentsByTask(taskId);
      setComments(response.data);
    } catch (error) {
      console.error('❌ Failed to load comments:', error);
      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await taskCommentsApi.createComment({
        taskId,
        content: newComment.trim()
      });
      setNewComment('');
      await loadComments();
    } catch (error) {
      console.error('❌ Failed to add comment:', error);
    }
  };

  const updateTaskStatus = async (newStatus: string) => {
    try {
      await tasksApi.updateTaskStatus(taskId, newStatus);
      await loadTaskData();
      onUpdate?.();
    } catch (error) {
      console.error('❌ Failed to update task status:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO': return 'bg-gray-100 text-gray-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'IN_REVIEW': return 'bg-purple-100 text-purple-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
          role="button"
          tabIndex={0}
          aria-label="Close modal"
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-lg">Loading task details...</div>
            </div>
          ) : (
            <div className="flex flex-col task-modal-container">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {task?.title || 'Task Details'}
                  </h2>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task?.priority || '')}`}>
                    {task?.priority}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                  aria-label="Close task details"
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {/* Task Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                      <p className="text-gray-900">{task?.description || 'No description provided'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                        <select
                          value={task?.status || ''}
                          onChange={(e) => updateTaskStatus(e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border ${getStatusColor(task?.status || '')}`}
                          aria-label="Task status"
                          title="Change task status"
                        >
                          <option value="TODO">To Do</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="IN_REVIEW">In Review</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Assignee</h3>
                        <div className="flex items-center space-x-2">
                          <User size={16} className="text-gray-400" />
                          <span className="text-gray-900">
                            {task?.assigneeName || 'Unassigned'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Due Date</h3>
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="text-gray-900">
                            {task?.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Progress</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full progress-bar">
                            <div 
                              className="bg-blue-600 rounded-full progress-fill"
                              data-progress={`${task?.progress || 0}%`}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{task?.progress || 0}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="w-80 border-l border-gray-200 flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <MessageCircle size={18} className="text-gray-500" />
                      <h3 className="font-medium text-gray-900">
                        Comments ({comments.length})
                      </h3>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {commentsLoading ? (
                      <div className="text-center text-gray-500">Loading comments...</div>
                    ) : comments.length === 0 ? (
                      <div className="text-center text-gray-500">No comments yet</div>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment.id} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <User size={12} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">
                                {comment.userFullName}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="ml-8 text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                            {comment.content}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Comment Form */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleAddComment} className="space-y-3">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        aria-label="New comment"
                      />
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add Comment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};