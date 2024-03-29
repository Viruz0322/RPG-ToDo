import { setToken, getToken, removeToken } from "../auth.js";

export async function login(username, password) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  const data = await response.json();
  setToken(data.token);
  return data;
}

export async function signup(username, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return await response.json();
}

export function logout() {
  removeToken();
}

export const addChore = async (todo, user) => {
  try {
    const res = await fetch("/api/chore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo,
        user,
      }),
    });
    const data = await res.json();
    if (data.success) {
      return true;
    }
    return false;
  } catch (err) {
    console.log("ERROR adding task", err);
    return false;
  }
};

export const getAllChores = async () => {
  try {
    const token = getToken();
    const res = await fetch("/api/chore", {
      headers: {
        token,
      },
    });
    const data = await res.json();
    if (data.success) {
      return data.data;
    }
    return false;
  } catch (err) {
    console.log("ERROR getting chores", err);
    return false;
  }
};

export const anotherOne = async () => null; // some kind of fetch call similar to above

export const deleteChore = async (id) => {
  try {
    const res = await fetch("/api/chore/" + id);
    const data = await res.json();
    if (data.success) {
      return data.data;
    }
    return false;
  } catch (err) {
    console.log("ERROR getting chores", error);
    return false;
  }
};
