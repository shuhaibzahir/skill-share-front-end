'use client';
//create a api call for task creation
const user = localStorage.getItem("user");
const token = user ? JSON.parse(user).token : null;
export default token;