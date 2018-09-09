//'use strict';

function boardTitleTemplate() {
    return `
        <div class="row">
            <div class="col-sm"></div>
            <div class="col-sm bckimg"></div>
            <div class="col-sm"></div>
        </div>
    `
}

function createTaskTemplate() {
    return `
    <div class="container">
    <div class="row title">
        <div class="col-sm"></div>
        <div class="col-sm-3">
            <h2 id="headerNewTask">Task Title:</h2>
        </div>
        <div class="col-sm-7">
            <input id="titleTask" type="text" class="inputValidation" placeholder="What are you planing to do?" maxlength="15" style="width:250px" required/>
            <p class="alertNotification"></p>
        </div>
    </div>
</div>
    <div class="row">
        <div class="col-sm-1 newTask-text-center"></div>
        <div class="col-sm-10 newTask-text-padding">
            <p class="alertNotification"></p>
            <textarea id="textTask" type="text" class="inputValidation" placeholder="Type it here..." rows="3" required></textarea>            
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-sm"></div>
            <div class="col-sm-3">
                <h3 id="headerNewTask">Goal Time:</h3>
            </div>
            <div class="col-sm"></div>
        </div>
        <div class="row">
            <div class="col-sm"></div>
            <div class="col-sm-5">
                <label><strong>Date:</strong>
                <input id="dateTask" type="text" class="inputValidation" placeholder="dd/mm/yyyy" maxlength="10" style="width:150px" required/>
                </label>
                <p class="alertNotification"></p>
            </div>
            <div class="col-sm-5">
                <label><strong>Time:</strong>
                <input id="timeTask" class="inputValidation" placeholder="00:00" maxlength="11" style="width:150px" required/>
                </label>
                <p class="alertNotification"></p>
            </div>
        </div>
    </div>
    <div  style="width:100%; text-align: center;">
        <div>
            <button onclick="taskBoard.startSite.createNote()" id="addTaskBtn" class="btn btn-primary">Add Task</button>
        </div>
    </div>
    `
}

function displayNoteTemplate() {
    return `
    
        <div  id="{{title}}1" class="col-sm-2 notes-img note show-remove {{justPosted}}">
            <div class="row align-items-start">
                <div class="col-sm"><span class="underline"><strong>{{title}}</strong></span></div>
                <div class="col-sm">
                    <i onclick="taskBoard.startSite.removeNote(id)" id="{{title}}" class="far fa-trash-alt remove"></i>
                </div>
            </div>
            <div class="row align-items-center">                
                <div class="col">
                <div id="textNote">{{text}}</div>
                </div>
            </div>
            <div class="row align-items-end">
                <div class="col-8">
                    <span>{{date}}</span>
                </div>
                <div class="col-8">
                    <span>{{time}}</span>
                </div>
            </div>            
        </div>   

    `
}

