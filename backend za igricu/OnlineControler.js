const { retry } = require("statuses");
const io = require("./app.js")

let rooms = [];

io.on("connection", (socket)=>{
    console.log(socket.id)
    io.to(socket.id).emit("hello")

    socket.on("createRoom", (callback)=>{//provera da li room postoji
        let room = new Room(socket.id)
        rooms.push(room)
        callback(room.roomID)
        console.log("successfully created a room with id: " + room.roomID)
    })

    socket.on("joinRoom", (roomId, callback)=>{//vrv ne treba callback
        try {
            let room = findRoom(roomId)
            room.socket2 = socket.id;
            callback("successfully joined a room with id: " + roomId)
        } catch (error) {
            callback("failed to join a room!")
        }
        
        //optional join room alert to other client
    })

    socket.on("updateGrid", (roomId, row, col, shape)=>{
        let room = findRoom(roomId);

        try {
            if(room.grid[row][col] != null) return;//dobule checks if the field is empty
        } catch (error) {
            console.error("Could not find a room with id of: " + roomId + " - error on line 35")
            return
        }

        room.grid[row][col] = shape;
        io.to(room.socket1).emit("updateGrid", room.grid)
        io.to(room.socket2).emit("updateGrid", room.grid)

        //check if there is a winner
        CheckGrid(room)
    })

    socket.on("testWinCondition", (id)=>{
        if(id == null) return;
        let room = findRoom(id)
        room.grid = [['x', 'x', 'x'], ['o', 'o', 'x'], ['o', 'x', 'o']]
        CheckGrid(findRoom(id))
    })


})

class Room{
    constructor(socket1){
        this.roomID = generateID();
        this.grid = [[null, null, null],[null, null, null],[null, null, null]];
        this.socket1 = socket1;
        this.socket2 = null;
    }
}

function generateID(){
    let characters = "abcdefghijklmn";
    let id = "";
    for(let i = 0; i < 5; i++){//change value at i < NUMB for complex code
        id += characters[Math.floor(Math.random() * characters.length)]
    }
    return id;
}

function findRoom(id){
    let Return;
    rooms.forEach(room=>{
        if(room.roomID == id){
            Return = room;
        } 
    })
    return Return;
}

function CheckGrid(room){
    let grid = room.grid;
    let winData = []
    let win = false;
    //horizontals
    for(let i=0; i<3; i++){
        if(grid[i][0] == grid[i][1] && grid[i][0] == grid[i][2]){
            if(grid[i][0] != null){
                console.log("column");
                winData = ["horizontal", i, grid[i][0]];
                win = true;
            }
            
        }

    }
    //verticals
    for(let i=0; i<3; i++){
        if(grid[0][i] == grid[1][i] && grid[0][i] == grid[2][i]){
            if(grid[0][i] != null){
                console.log("row");
                winData = ["vertical", i, grid[0][i]];
                win = true;
            }
            
        }
        
    }
    //diagonals
    if(grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]){
        if(grid[1][1] != null){
            console.log("diagonal1");
            winData = ["diagonal", 4, grid[1][1]];
            win = true;
        }
    }
    if(grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0]){
        if(grid[1][1] != null){
            console.log("diagonal2");
            winData = ["diagonal", 5, grid[1][1]];
            win = true;
        }
    }

    if(win == true){
        console.log('emmiting win')
        io.to(room.socket1).emit("Win", winData[0], winData[1], winData[2]);
        io.to(room.socket2).emit("Win", winData[0], winData[1], winData[2]);
    }

}