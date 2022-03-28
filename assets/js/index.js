"use strict"

class List {
    
    constructor(x){
        this.containerClass = '.' + x;
    }

    init = () => {
        this.createInput();
        this.createListBlock();
        this.createFooterBlock();
        this.createProgressBar();
        this.createRemoveButton();
    }

    createInput = () => {
    
        const container = document.querySelector(this.containerClass);
        const inputBlock = document.createElement('div');
        inputBlock.className = 'input-block';
        inputBlock.innerHTML = 
            `<div class="input-block">
            <input type="text" class="user-input" />
            <button class="add">Add task</button>
            </div>
        `;
        
        container.appendChild(inputBlock);
        const button = document.querySelector('.add');  
        button.addEventListener('click', this.addItems);
    }

    addItems = () => { 

            const input = document.querySelector('.user-input');

            if(input.value.length !== 0){
                const listItem = this.createItem(input.value);
                input.value = '';
                const listBlock = document.querySelector('.list-block');
                listBlock.appendChild(listItem);
            }else{
                alert("Can't be empty");
            }
    }

    createListBlock = () => {
        const container = document.querySelector(this.containerClass);
        const listBlock = document.createElement('ul');
        listBlock.className = 'list-block';
        container.appendChild(listBlock);
    }

    createItem = (InputValue) => {
        const listItem = document.createElement('li');
        listItem.classList = "list-item"
        listItem.innerHTML = `
        <div>
            <input type="checkbox" id="to_do-1" name="to_do-1" />
            <input type="text" id="edit-input-1" name="edit-input-1" />
            <p class="my-list__item__text">${InputValue}</p>
            <div class="edit">
            <i>edit</i>
            </div>
            <div class="remove">
            <i>remove</i>
            </div>
        </div>
        `;

        const remove = listItem.querySelector('.remove');
        remove.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.parentElement.remove();
        })

        return listItem;

    }

    createFooterBlock = () => {
        const parentContainer = document.querySelector(this.containerClass);
        const container = document.createElement('div');
        const deleteAllButton =  document.createElement('button');
        deleteAllButton.textContent = "Remove all"
        deleteAllButton.className = 'remove-all';
        container.className = 'list-footer__block';

        deleteAllButton.addEventListener('click',this.removeAllCheckedItems);

        container.appendChild(deleteAllButton);
        parentContainer.appendChild(container)
       
    }

    removeAllCheckedItems = () => {
        const selectedItems = document.querySelectorAll('.list-block > li');
        selectedItems.forEach(item => {
            if(item.querySelector('input[type = "checkbox"]').checked){
                item.remove();
            }
        })
        this.updateProgressBar();
    }

    updateProgressBar = ()=> {

    }

    createProgressBar = () => {

    }

    createRemoveButton = () => {
        
    }
}

let list = new List('list'); 
list.init();

// let container = document.querySelector('.list');
// console.log(container);
