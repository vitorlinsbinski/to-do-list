AOS.init();

// Elementos HTML:
const inputTask = document.getElementById("taskInput");
const buttonAdd = document.getElementById("btnSendTask");
const cards = document.getElementById("cardsTask");
const buttonDelete = document.getElementById("deleteButton");
const buttonCheck = document.getElementById("checkButton");
const body = document.getElementsByTagName("body");


const updateLocalStorage = () => {
    localStorage.setItem('task-id', JSON.stringify(taskDB));
}

const localStorageTasks = JSON.parse(localStorage.getItem('task-id'));

let taskDB = localStorage.getItem('task-id') !== null ? localStorageTasks : [];


function createNewCard() {
    cards.innerHTML = '';

    for(let task of taskDB) {
        const card = document.createElement('div');
        const idCard = task.id;

        card.classList.add('card');
        card.style.background = `${task.background}`

        card.id = idCard;

        const icons = document.createElement('div');
        icons.classList.add('icons');
        const iconCheck = document.createElement('div');
        iconCheck.classList.add('icon', 'check');
        iconCheck.style.backgroundColor = `${task.backgroundCheck}`;
        iconCheck.id = "checkButton";
        iconCheck.innerHTML = `<img src="./img/check.svg" alt="Check icon">`;
        iconCheck.setAttribute('onclick', `checkTask(${task.id})`);
        const iconTrash = document.createElement('div');
        iconTrash.classList.add('icon', 'trash');
        iconTrash.id = "deleteButton";
        iconTrash.innerHTML = `<img src="./img/trash.svg" alt="Trash icon">`;
        iconTrash.setAttribute('onclick', `deleteTask(${task.id})`);
        icons.append(iconCheck, iconTrash);
    
        const text = document.createElement('div');
        text.classList.add('text');
        const p = document.createElement('p');
        p.innerText = task.name;

        text.appendChild(p);
        p.style.textDecoration = `${task.textDecoration}`;

        card.append(icons, text);

        card.style.animation = "added .2s forwards ease-out";
        cards.appendChild(card);
        

    }

    
}

createNewCard();

function generateDelay(delay) {
    delay += 50;
   let finalDelay = delay.toString();
   return finalDelay;
}

function generateId() {
    const id = Math.floor(Math.random() * 5000);
    return id;
}

function addNewTask() {
    let taskValue = inputTask.value;
    let task = {
        name: taskValue,
        id: generateId(),
        status: '', 
        background: '$gray-300',
        backgroundCheck: 'none',
        textDecoration: 'none'
    }
    if(taskValue != '') {
        taskDB.push(task);
        inputTask.value = "";
        createNewCard();
        updateLocalStorage();
    } else {
        alert("Insira uma tarefa!");
    }

}

function deleteTask(idTask) {
    let card = document.getElementById(''+idTask+'');
    card.style.animation = "deleted .2s forwards ease-out";
    setTimeout(() => {
        let indexCard = taskDB.findIndex(item => item.id == idTask);
        taskDB.splice(indexCard, 1);
        createNewCard();
        updateLocalStorage();
    }, 300);

}

function checkTask(idTask) {
    let checkedCard = document.getElementById(''+idTask+'');
    let divIcons = checkedCard.firstChild;
    let divCheck = divIcons.firstChild;
    divCheck.style.transition = "background-color 2s";
    let divP = checkedCard.lastChild;
    console.log('divP: ',divP);
    let p = divP.firstChild;    
    console.log('p: ',p);
    console.log(checkedCard);

    let indexCard = taskDB.findIndex(item => item.id == idTask);
    let statusCheck = taskDB[indexCard].status;
    console.log(statusCheck)

    let values = Object.values(taskDB[indexCard]);
    console.log(values)

    let statusValue = values[2];
    let backgroundValue = values[3];
    let backgroundValueCheck = values[4];
    let textDecorationValue = values[5];


    console.log(backgroundValue)
    console.log(statusValue);

    if(statusValue == '' && backgroundValue == '$gray-300' && backgroundValueCheck == 'none' && textDecorationValue == 'none') {
        statusValue = 'checked';
        backgroundValue = 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), #262626';
        backgroundValueCheck = '#5C806E'
        textDecorationValue = 'line-through'
        checkedCard.style.background = backgroundValue;
        divCheck.style.background = backgroundValueCheck;
        p.style.textDecoration = textDecorationValue;

    } else if(statusValue == 'checked' && backgroundValue == 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), #262626' && backgroundValueCheck == '#5C806E' && textDecorationValue == 'line-through') {
        statusValue = '';
        backgroundValue ='$gray-300';
        backgroundValueCheck = 'none';
        textDecorationValue = 'none';
        checkedCard.style.background = backgroundValue;
        divCheck.style.background = backgroundValueCheck;
        p.style.textDecoration = textDecorationValue;
    }
    taskDB[indexCard].status = statusValue;
    taskDB[indexCard].background = backgroundValue;
    taskDB[indexCard].backgroundCheck = backgroundValueCheck; 
    taskDB[indexCard].textDecoration = textDecorationValue; 


    updateLocalStorage();
   
    createNewCard();    
}

buttonAdd.addEventListener("click", addNewTask);
inputTask.addEventListener("keypress", (e) => {
    if(e.key == 'Enter' && inputTask.value != "") {
        addNewTask();
    } else if(e.key == 'Enter'){
        alert("Insira uma tarefa!");
    }
})


