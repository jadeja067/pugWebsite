const Alert = document.getElementById("Alert"),
  res = document.getElementById("response").innerText;
if (res == "true") Alert.classList.add("show");
const password = document.getElementById("password"),
  username = document.getElementById("username"),
  email = document.getElementById("email");
showBtn = document.getElementById("show");
function show() {
  password.type = password.type == "text" ? "password" : "text";
  showBtn.innerText = password.type == "text" ? "hide" : "show";
}
async function register(e) {
  e.preventDefault();
  const Data = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  const req = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Data),
  });
  const res = await req.json();
  console.log(res);
  if (res.insertedId) {
    window.location.href = "/login";
  }
}
