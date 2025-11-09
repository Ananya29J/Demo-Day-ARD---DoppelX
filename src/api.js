const API_BASE = "http://localhost:5000/api"; // backend URL

// Get JWT token from localStorage
const getToken = () => localStorage.getItem("token");

// Generic GET request
export const getData = async (endpoint) => {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

// Generic POST request
export const postData = async (endpoint, body) => {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

// Generic PUT request
export const putData = async (endpoint, body) => {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

// Generic PATCH request
export const patchData = async (endpoint, body) => {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

// Generic DELETE request
export const deleteData = async (endpoint) => {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};
