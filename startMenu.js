/* VARIABLES */
let startMenu = document.getElementById("startMenu");

/* EVENT LISTENERS */
document.getElementById("PlayOffline").addEventListener("click", ()=>{
    CloseStartMenu()
})

document.getElementById("PlayWithBot").addEventListener("click", ()=>{
    console.log("coming soon!")
})

document.getElementById("PlayOnline").addEventListener("click", ()=>{
    startMenu.classList.add("online")
})

document.getElementById("OnlineBack").addEventListener("click", ()=>{
    startMenu.classList.remove("online")
})


/* CREATE AND JOIN A ROOM */
document.getElementById("CreateRoom").addEventListener("click", ()=>{
    console.log("Create room")
})

document.getElementById("JoinRoom").addEventListener("click", ()=>{
    console.log("Join room")
})
/* FUNCTIONS */
function OpenStartMenu(){
    startMenu.classList.remove("closed")
}

function CloseStartMenu(){
    startMenu.classList.add("closed")
}

function InstantiateGame(gameMode){
    switch (gameMode) {
        case "Offline":
            //nothing
            break;

        case "WithBot":
            
            break;

        case "Online":
            
            break;
        
        default:
            break;
    }

    CloseStartMenu()
}