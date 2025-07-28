//SCRIPT FOR PLAYING ONLINE
//<script src="https://cdn.socket.io/4.3.2/socket.io.min.js" integrity="sha384-KAZ4DtjNhLChOB/hxXuKqhMLYvx3b5MlT55xPEiNmREKRzeEm+RVPlTnAn0ajQNs" crossorigin="anonymous"></script>

let socket;
let roomID;

ConnectToServer()
function ConnectToServer(){
    //socket = io()
    socket = io()
    socket.on("connect", ()=>{
        /* console.log(socket.id) */
    
        socket.on("updateGrid", (grid)=>{
            togglePlayable()
            togglePlayingShape()
            UpdateGrid(grid)
        })
    
        socket.on("Win", (type, index, winner)=>{
            Win(type, index, winner)
        })

        socket.on("startGame", ()=>{
            console.log("Enemy joined!")
            gamemode = "online"
            CloseStartMenu()
        })
    
    })
}

async function createRoom(){
    togglePlayable(true)
    let res = new Promise((resolve, reject)=>{
        socket.emit("createRoom", (response) => {
            roomID = response;
            console.log(roomID)
            resolve(response);
        })
    })

    return res
}

function joinRoom(RoomID){
    roomID = RoomID;
    togglePlayable(false)
    shape = "o"
    socket.emit("joinRoom", RoomID, (response) => {//change roomID to variable
        console.log(response)
    })
}

function OnlineUpdateGrid(row, col, shape){
    console.log("sending data: ", row, col, shape)
    socket.emit("updateGrid", roomID,  row, col, shape)
}