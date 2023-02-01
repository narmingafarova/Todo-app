const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const footer = document.querySelector(".footer");

// Buttons
const addBtn = document.querySelector(".btn-add");
const clrBtn = document.querySelector(".clear");

// Informative
const alert = document.querySelector(".empty-input");
const pending = document.querySelector(".pending");

// For add btn
input.onkeyup = () => {
  let inputVal = input.value;
  if (inputVal.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

// For visibility of footer and pending tasks
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

  // Checking empty input
  if (!li.innerHTML.trim()) {
    alert.className = "empty-input";
    input.value = "";
    return false;
  } else {
    alert.className = "empty-input d-none";
    ul.innerHTML += `<li>${li.innerHTML}<span id="todo-delete"><i class="fa-solid fa-trash"></i></span><span id="todo-edit"><i class="fa-solid fa-pen-to-square"></i></span></li>`;
    input.value = "";
  }

  // For delete li element
  const deleteItem = document.querySelectorAll("#todo-delete");
  for (let i = 0; i < ul.getElementsByTagName("li").length; i++) {
    deleteItem[i].onclick = (e) => {
      if (e.target.matches(".fa-trash")) {
        e.target.parentElement.parentElement.remove();
      } else {
        e.target.parentElement.remove();
      }
      footerChange();
      input.focus();
    };
  }

  footerChange();

  // For edit li element
  const editItem = document.querySelectorAll("#todo-edit");
  for (let i = 0; i < ul.getElementsByTagName("li").length; i++) {
    editItem[i].onclick = (e) => {
      if (e.target.matches(".fa-pen-to-square")) {
        let changeableInput = e.target.parentElement.parentElement;
        input.value = changeableInput.innerText;
      } else {
        input.value = e.target.parentElement.innerText;
        input.focus();
      }
      ul.getElementsByTagName("li")[i].remove();
      footerChange();
    };
  }

  // For clear ul
  clrBtn.onclick = () => {
    ul.innerHTML = "";
    footer.className = "footer d-none";
    input.value = "";
    input.focus();
  };
};
