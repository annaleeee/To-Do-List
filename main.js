/*
    1. 값을 인풋에 입력
    2. 버튼(+)을 누르면 아이템이 더해짐 (할일 추가)
    3. 삭제 버튼을 누르면 할일 삭제
    4. 체크 버튼을 누르면 할일이 끝나면서, 줄이 그어짐 (리셋)
    5. 진행중, 완료 탭을 누르면 언더바가 이동
    6. 완료 탭에는 완료 아이템만, 진행중 탭에는 진행 중인 아이템만 보여짐
        모두 탭을 누르면 전체 아이템을 보여줌 
*/

let taskList = []
let mode = 'all'
let filterList = []

let taskInput = document.getElementById('task-input')
let addButton = document.getElementById('add-button')
let tabs = document.querySelectorAll('.task-menu div')

addButton.addEventListener('click', addTask)
taskInput.addEventListener('keyup', function(event) {
    if(event.keyCode === 13){ // 13 = enter
        addTask()
    }
})
taskInput.addEventListener('focus', function() {
    taskInput.value = ''
})

for(let i = 1; i < tabs.length; i++){ 
    tabs[i].addEventListener('click', function(event){
        filter(event)
    })
}

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    taskInput.value = ''
    render()
}

function render(){ // taskList를 화면에 띄워줌
    let list = []
    if(mode == 'all'){
        list = taskList
    } else if(mode == 'ongoing' || mode == 'done'){
        list = filterList
    } 
    let resultHTML = ''
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true) {
            resultHTML += `
            <div class="task">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                    </button> 
                    <button onclick="deleteTask('${list[i].id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `
        } else { 
            resultHTML += `
            <div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
                            <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
                        </svg>
                    </button> 
                    <button onclick="deleteTask('${list[i].id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `
        }
    }
    document.getElementById('task-board').innerHTML = resultHTML
    // task-board의 안쪽 HTML 내용을 resultHTML이라는 걸로 보여주게 함
}

function toggleComplete(id){
    console.log(id)
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete
            break
        }
    }
    filter()
}

function deleteTask(id){
    for(let i = 0; i < filterList.length; i++){
        if(filterList[i].id == id){
            filterList.splice(i, 1) // i번째에서 하나만 삭제
            break
        }
    }
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1) 
            break
        }
    }
    filter()
}

function filter(event){
    filterList = []
    if(event){
        mode = event.target.id 
        underLine.style.width = event.target.offsetWidth + 'px'
        underLine.style.top = '53px'
        underLine.style.left = event.target.offsetLeft + 'px'
        // target 값 만큼 underLine의 너비를 조정
    }
    if(mode == 'ongoing'){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
    } else if(mode == 'done'){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
    }
    render()
}

function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
}
