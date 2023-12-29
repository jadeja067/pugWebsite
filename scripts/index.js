const Alert = document.getElementById("Alert"),
  res = document.getElementById("response").innerText;
if (res == "false") Alert.classList.add("show");

const password = document.getElementById("password"),
  username = document.getElementById("username"),
  showBtn = document.getElementById("show");

//- Password Show/hide Toggle Function
function show() {
  password.type = password.type == "text" ? "password" : "text";
  showBtn.innerText = password.type == "text" ? "hide" : "show";
}

//- Login Checking Function
async function login() {
  const Data = {
    username: username.value,
    password: password.value,
  };
  const req = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Data),
  });
  const res = await req.json();
  if (res._id) {
    localStorage.setItem("id", res._id);
    window.location.href = "/dashboard";
  }
}
