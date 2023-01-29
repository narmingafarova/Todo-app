const form = document.querySelector("form");
const input = document.querySelector("input");
const alert = document.querySelector(".empty-input");
const ul = document.querySelector("ul");
const clrBtn = document.querySelector(".clear");
const addBtn = document.querySelector(".btn-add");
const footer = document.querySelector(".footer");
const pending = document.querySelector(".pending");

input.onkeyup = () => {
  let inputVal = input.value;
  if (inputVal.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

const footerChange = () => {
  if (ul.getElementsByTagName("li").length == 0) {
    footer.className = "footer d-none";
  } else {
    // prettier-ignore
    footer.className = "footer d-flex justify-content-between align-items-center";
    // prettier-ignore
    if(ul.getElementsByTagName("li").length == 1) {
      pending.innerHTML = `You have 1 pending task`;
    } else {
      pending.innerHTML = `You have ${ul.getElementsByTagName("li").length} pending tasks`;
    }
  }
};

form.onsubmit = (e) => {
  e.preventDefault();
  let li = document.createElement("li");
  li.innerHTML = input.value;
  if (!li.innerHTML.trim()) {
    alert.className = "empty-input";
    return false;
  } else {
    alert.className = "empty-input d-none";
    ul.innerHTML += `<li>${li.innerHTML}<span id="todo-delete"><i class="fa-solid fa-trash"></i></span></li>`;
    input.value = "";
  }

  const deleteItem = document.querySelectorAll("#todo-delete");
  for (let i = 0; i < ul.getElementsByTagName("li").length; i++) {
    deleteItem[i].onclick = (e) => {
      if (e.target.matches(".fa-trash")) {
        e.target.parentElement.parentElement.remove();
      } else {
        e.target.parentElement.remove();
      }
      footerChange();
    };
  }

  footerChange();

  clrBtn.onclick = () => {
    ul.innerHTML = "";
    footer.className = "footer d-none";
  };
};
