let string = "";
var list = document.getElementById("list");

const token = localStorage.getItem("token");
let calculator_input_Number_V = document.getElementById(
  "calculator_input_Number"
);
let calculator_input_Number_Previews_V = document.getElementById(
  "calculator_input_Number_Previews"
);

let Calculator_input_AC_V = document.getElementById("Calculator_input_AC");

let DisplayValue;

function display(DisplayValue) {
  calculator_input_Number_V.value += DisplayValue;
}

Calculator_input_AC_V.addEventListener("click", () => {
  calculator_input_Number_V.value = "";
  calculator_input_Number_Previews_V.value = "";
});

function displaySolve() {
  let obj = {
    calculation: document.getElementById("calculator_input_Number").value,
  };
  string = document.getElementById("calculator_input_Number").value;
  axios
    .post("http://localhost:3000/calculator/post-result", obj, {
      headers: { authorization: token },
    })
    .then((response) => {
      onsubmit(response.data);
      console.log(response);
    });
  string = eval(string);
  document.getElementById("calculator_input_Number").value = string;
  let eq = calculator_input_Number_V.value;

  calculator_input_Number_Previews_V.value = eq;

  let y = eval(eq);

  calculator_input_Number_V.value = y;
}

window.addEventListener("DOMContentLoaded", () => {
  console.log(string);
  document.getElementById("calculator_input_Number").value = string;
  axios
    .get("http://localhost:3000/calculator/get-result", {
      headers: { authorization: token },
    })
    .then((response) => {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        onsubmit(response.data[i]);
      }
    });
});

function onsubmit(result) {
  var btn = document.createElement("button");
  btn.appendChild(document.createTextNode("Edit"));
  var btn2 = document.createElement("button");
  btn2.appendChild(document.createTextNode("Delete"));
  btn2.setAttribute("onclick", "del('" + result.id + "')");
  console.log(btn2);
  btn.setAttribute(
    "onclick",
    "recalculate('" + result.id + "','" + result.calculation + "')"
  );
  var li = document.createElement("li");

  li.id = result.id;
  console.log(li);
  li.appendChild(
    document.createTextNode(
      "Operation:" + result.calculation + " , Result:" + result.result
    )
  );
  li.appendChild(btn);
  li.appendChild(btn2);
  list.appendChild(li);
}

function Edit(calcId, calc) {
  console.log(calcId);
  document.getElementById("calculator_input_Number").value = calc;
  del(calcId);
}

function del(id) {
  axios
    .delete(`http://localhost:3000/calculator/delete-result/${id}`, {
      headers: { authorization: token },
    })
    .then(() => {
      const DeletedItem = document.getElementById(id);
      list.removeChild(DeletedItem);
    })
    .catch((err) => console.log(err));
}
