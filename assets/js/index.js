"use strict";

class List {
  constructor(x) {
    this.containerClass = "." + x;
  }

  listValArray = [];

  init = () => {
    this.createInput();
    this.createListBlock();
    this.createFooterBlock();
    this.createProgressBar();
    this.appendFromLocalStorage();
  };

  createInput = () => {
    const container = document.querySelector(this.containerClass);
    const inputBlock = document.createElement("div");
    inputBlock.className = "input-block";
    inputBlock.innerHTML = `<div class="input-block">
            <input type="text" class="user-input" />
            <button class="add">Add task</button>
            </div>
        `;

    container.appendChild(inputBlock);
    const button = document.querySelector(".add");
    button.addEventListener("click", this.addItems);
  };

  addItems = () => {
    const input = document.querySelector(".user-input");

    if (input.value.length !== 0) {
      const listItem = this.createItem(input.value);
      input.value = "";
      const listBlock = document.querySelector(".list-block");
      listBlock.appendChild(listItem);
      this.updateListArray();
      this.changeProgressBar();
    } else {
      alert("Can't be empty");
    }
  };

  createListBlock = () => {
    const container = document.querySelector(this.containerClass);
    const listBlock = document.createElement("ul");
    listBlock.className = "list-block";
    container.appendChild(listBlock);
  };

  appendFromLocalStorage = () => {

    const listBlock = document.querySelector(".list-block");
    const storage = JSON.parse(localStorage.getItem('list-item-positions'));
        storage.forEach(listItem => {
          let item = this.createItem(listItem.listValue, listItem.isChecked)
          
          listBlock.appendChild(item);
        })
        
        this.changeProgressBar();
        console.log(storage);
  }

  createItem = (InputValue, isChecked) => {
    const listItem = document.createElement("li");
    let currentNumOfItems = this.getNumberOfListItems();
    let id = this.getNumberOfListItems() + 1;
    let lineThrough
    if(isChecked) {
        isChecked = 'checked';
        lineThrough = 'line-through';
    };

    listItem.classList = "list-item";
    listItem.innerHTML = `
        <div>
            <input type="checkbox" id="to_do-" name="to_do-1" ${isChecked}/>
            <input type="text" class="edit-input" id="edit-input-1" name="edit-input-1" value="${InputValue}" />
            <p class="my-list__item__text ${lineThrough}">${InputValue}</p>
            <div class="edit">
            <i>edit</i>
            </div>
            <div class="remove">
            <i>remove</i>
            </div>
        </div>
        `;

    const remove = listItem.querySelector(".remove");
    const edit = listItem.querySelector(".edit");
    const checkbox = listItem.querySelector("input[type=checkbox]");

    checkbox.addEventListener("click", (e) => {
      this.checkedItem(e);
      this.updateListArray();
    });

    edit.addEventListener("click", (e) => {
      this.editListItem(e);
      this.updateListArray();
    });

    remove.addEventListener("click", (e) => {
      const listItem = e.target.parentElement.parentElement.parentElement;
      listItem.remove();

      this.updateListArray();
      this.changeProgressBar();
    });

    return listItem;
  };

  updateListArray = () => {
      /// reikia dabartinis  pozicijos
      /// reikia visu dom pozicijos

    this.listValArray = [];
    const listItems = document.querySelectorAll('.list-item');

    listItems.forEach(listItem => {

        this.listValArray.push({
            listValue: listItem.querySelector('.my-list__item__text').textContent,
            isChecked: listItem.querySelector('input[type = "checkbox"]').checked? true: false,
          })
    });

      this.saveToLocalStorage();
  }

  saveToLocalStorage = () => {
    localStorage.setItem("list-item-positions", JSON.stringify(this.listValArray));
  }

  addToValArray = (id, InputValue, IsChecked) => {
    let position = this.getNumberOfListItems();
    this.listValArray.push({
      listValue: InputValue,
      isChecked: IsChecked,
    });

    this.saveToLocalStorage();
  };

  createFooterBlock = () => {
    const parentContainer = document.querySelector(this.containerClass);
    const container = document.createElement("div");
    const deleteAllButton = document.createElement("button");
    deleteAllButton.textContent = "Remove all";
    deleteAllButton.className = "remove-all";
    container.className = "list-footer__block";

    deleteAllButton.addEventListener("click", this.removeAllCheckedItems);

    container.appendChild(deleteAllButton);
    parentContainer.appendChild(container);
  };

  checkedItem = (e) => {
    this.changeProgressBar();
    const paragraph = e.target.parentElement.querySelector("p");
    paragraph.classList.toggle("line-through");
  };

  removeAllCheckedItems = () => {
    const selectedItems = document.querySelectorAll(".list-item");
    selectedItems.forEach((item) => {
      if (item.querySelector('input[type = "checkbox"]').checked) {
        item.remove();
      }
    });
    this.changeProgressBar();
    this.updateListArray();
  };

  getNumberOfListItems = () => {
    return document.querySelectorAll(".list-item").length;
  };

  getNumberOfCompletedListItems = () => {
    return document.querySelectorAll(".list-item input[type=checkbox]:checked")
      .length;
  };

  editListItem = (e) => {
    const listItem = e.target.parentElement.parentElement.parentElement;

    const text = listItem.querySelector(".my-list__item__text");
    text.classList.add("display-none");

    const editInput = listItem.querySelector(".edit-input");
    editInput.value = text.textContent;
    editInput.classList.add("display-block");

    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        text.textContent = editInput.value;
        text.classList.remove("display-none");
        editInput.classList.remove("display-block");
        this.updateListArray();
      }
    });
  };

  changeProgressBar = () => {
    const numberOfItems = this.getNumberOfListItems();
    const numberOfCheckedItems = this.getNumberOfCompletedListItems();
    const progressBar = document.querySelector(".progress-bar");
    progressBar.querySelector(".progress-bar-color").style.width =
      ((numberOfCheckedItems / numberOfItems) * 100
        ? (numberOfCheckedItems / numberOfItems) * 100
        : 0) + "%";
    progressBar.querySelector(
      ".progress-text"
    ).textContent = `${numberOfCheckedItems} iš ${numberOfItems} yra pabaigti.`;
  };

  createProgressBar = () => {
    const footerContainer = document.querySelector(
      this.containerClass + " .list-footer__block"
    );
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";

    const numberOfItems = this.getNumberOfListItems();
    const numberOfCheckedItems = this.getNumberOfCompletedListItems();
    progressBar.style.backgroundColor;

    progressBar.innerHTML = `
        <div class="progress-bar-color" style="width:${
          (numberOfCheckedItems / numberOfItems) * 100
            ? (numberOfCheckedItems / numberOfItems) * 100
            : 0
        }%; background-color: green;height: 50px;"></div>
        <p class="progress-text">${numberOfCheckedItems} iš ${numberOfItems} yra pabaigti.</p>
        `;

    footerContainer.appendChild(progressBar);
  };
}

let list = new List("list");
list.init();