import axios from './axios';


// http://localhost:3000/api/tasks
export const getTasksRequest = () => axios.get("/tasks");

// http://localhost:3000/api/tasks/67675b06743b70039500345d
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);

// http://localhost:3000/api/tasks
export const createTaskRequest = (task) => axios.post("/tasks", task);

// http://localhost:3000/api/tasks/676768bfcde7e05130707a54
export const updateTaskRequest = (task) => axios.put(`/tasks/${task._id}`, task);

// http://localhost:3000/api/tasks/67675b06743b70039500345d
export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);