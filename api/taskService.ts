import API_ENPOINTS from "./constants";
import axios from "axios";
import token from "./token";

const header = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
};
export const createTask = (data: any,) => {
  return axios.post(API_ENPOINTS.TASKS, data,header);
}  

export const updateTask = (data: any,id:any, ) => {
    return axios.put(`${API_ENPOINTS.TASKS}/${id}`, data, header);
}  

export const getTask = (id: any) => {
    return axios.get(`${API_ENPOINTS.TASKS}/${id}`,header);
}

export const getTasks = () => {
    return axios.get(API_ENPOINTS.TASKS,header);
}

export const deleteTask = (id: any) => {
    return axios.delete(`${API_ENPOINTS.TASKS}/${id}`,header);
}