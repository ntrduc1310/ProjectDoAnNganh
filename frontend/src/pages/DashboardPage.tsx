import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

export const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', description: '', priority: '', status: '', assigneeEmail: '', projectId: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Không thể tải danh sách task');
    }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createTask(form);
      await fetchTasks();
      setForm({ title: '', description: '', priority: '', status: '', assigneeEmail: '', projectId: '' });
    } catch (err) {
      setError('Không thể tạo task');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Danh sách Task</h2>
      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <b>{task.title}</b> - {task.status} - {task.priority}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreate}>
        <input placeholder="Tiêu đề" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Mô tả" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
        <input placeholder="Độ ưu tiên" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} required />
        <input placeholder="Trạng thái" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} required />
        <input placeholder="Email người nhận" value={form.assigneeEmail} onChange={e => setForm({ ...form, assigneeEmail: e.target.value })} />
        <input placeholder="Project ID" value={form.projectId} onChange={e => setForm({ ...form, projectId: e.target.value })} />
        <button type="submit">Tạo Task</button>
      </form>
    </div>
  );
};