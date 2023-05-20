const subBtn = document.querySelector("#login-btn");

subBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const details = {
    email: email,
    password: password,
  };
  axios
    .post("http://localhost:3000/user/login", details)
    .then((res) => {
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      window.location.href = "../html/calculator.html";
    })
    .catch((error) => {
      const errors = document.querySelector("#error");
      errors.innerHTML = `${error.response.data.error}`;
    });
});
