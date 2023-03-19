export const addChore = async (todo) => {
  try {
    const res = await fetch("/api/chore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const data = await res.json();
    if (data.success) {
      return true;
    }
    return false;
  } catch (err) {
    console.log("ERROR adding task", error);
    return false;
  }
};

export const getAllChores = async () => {
  try {
    const res = await fetch("/api/chore");
    const data = await res.json();
    if (data.success) {
      return data.data
    }
    return false;
  } catch (err) {
    console.log("ERROR getting chores", error);
    return false;
  }
};

export const anotherOne = async () => null; // some kind of fetch call similar to above


export const deleteChore = async(id)=> {
  try{
    const res = await fetch("/api/chore/"+id);
    const data = await res.json()
    if (data.success) {
      return data.data
    }
    return false;
  } catch (err) {
    console.log("ERROR getting chores", error);
    return false;
  }
};