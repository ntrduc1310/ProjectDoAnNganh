import axios from 'axios';

export const getTasks = async () => {
  const res = await axios.get('/api/tasks');
  return res.data;
};

export const getTask = async (id: number) => {
  const res = await axios.get(`/api/tasks/${id}`);
  return res.data;
};

export const createTask = async (task: any) => {
  const res = await axios.post('/api/tasks', task);
  return res.data;
};

export const updateTask = async (id: number, task: any) => {
  const res = await axios.put(`/api/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`/api/tasks/${id}`);
};