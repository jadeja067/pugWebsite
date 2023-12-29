const id = localStorage.getItem("id");
console.log(id);
if (!id) window.location.href = "/login";

const title = document.getElementById("title"),
  task = document.getElementById("task"),
  username = document.getElementById("username"),
  email = document.getElementById("email"),
  password = document.getElementById("password");

async function UpdateUser() {
  const Data = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  try {
    const req = await fetch(`/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    const res = await req.json();
  } catch (e) {
    console.log(e);
  }
}

async function login() {
  try {
    const req = await fetch(`/user/${id}`);
    const res = await req.json();
    username.value = res.username;
    email.value = res.email;
    password.value = res.password;
  } catch (e) {
    console.log(e);
  }
}
login();
const signOut = () => {
  localStorage.removeItem("id");
  window.location.href = "/login";
};
const addTodo = async () => {
  const Data = {
    title: title.value,
    task: task.value,
  };
  try {
    const req = await fetch("/addTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    const res = await req.json();
    getTodos();
  } catch (e) {
    console.log(e);
  }
};

const updateTodo = async (id) => {
  const Data = {
      title: title.value,
      task: task.value,
    },
    update = document.getElementById("update");
  add = document.getElementById("add");
  try {
    const req = await fetch(`/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    const res = await req.json();
    console.log(res);
    getTodos();
    add.classList.remove("d-none");
    update.classList.add("d-none");
    title.value = "";
    task.value = "";
  } catch (e) {
    console.log(e);
  }
};

const editTodo = async (id) => {
  const openModal = document.getElementById("openModal2"),
    add = document.getElementById("add"),
    update = document.getElementById("update");
  try {
    const req = await fetch(`/todo/${id}`);
    const res = await req.json();
    add.classList.add("d-none");
    update.classList.remove("d-none");
    await openModal.click();
    title.value = res.title;
    task.value = res.task;
    update.addEventListener("click", () => updateTodo(id));
  } catch (e) {
    console.log(e);
  }
};

const deleteTodo = async (id) => {
  try {
    const req = await fetch(`/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await req.json();
    getTodos();
  } catch (e) {
    console.log(e);
  }
};

const append = (res) => {
  const container = document.getElementById("container");
  if (res.lengthn) {
    container.innerHTML = "";
    res.forEach((e) => {
      container.innerHTML += `<div id='${e._id}'class="card w-25">
            <div class="card-body">
              <h5 class="card-title">${e.title}</h5>
              <p class="card-text">${e.task}</p>
              <div class="w-100 d-flex justify-content-center align-items-center gap-3 border-top p-2">
                <button class="btn btn-outline-success" onclick="editTodo('${e._id}')">
                  <svg class="bi bi-pencil-square" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewbox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"></path>
                    </svg>
                </button>
                <button class="btn btn-outline-danger" onclick="deleteTodo('${e._id}')">
                  <svg class="bi bi-trash3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewbox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>`;
    });
  } else {
    container.innerHTML = "<h4>No Data Found</h4>";
  }
};

const getTodos = async () => {
  try {
    const req = await fetch("/todos");
    const res = await req.json();
    console.log(res);
    await append(res);
  } catch (e) {
    console.log(e);
  }
};

getTodos();
