import axios from 'axios';
import API_CONFIG, { API_ENDPOINTS } from '../config/api.js';

// Create axios instance
const apiClient = axios.create(API_CONFIG);

// API Service Class
class ApiService {
  // Health Check
  async checkHealth() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.health);
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  // Tasks API
  async getTasks() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.tasks);
      return JSON.parse(response.data); // Parse JSON string
    } catch (error) {
      console.error('Get tasks failed:', error);
      throw error;
    }
  }

  // Projects API
  async getProjects() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.projects);
      return JSON.parse(response.data);
    } catch (error) {
      console.error('Get projects failed:', error);
      throw error;
    }
  }

  // Dashboard Stats
  async getDashboardStats() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.dashboard);
      return JSON.parse(response.data);
    } catch (error) {
      console.error('Get dashboard stats failed:', error);
      throw error;
    }
  }

  // Test endpoint
  async test() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.test);
      return response.data;
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  }
}

export default new ApiService();