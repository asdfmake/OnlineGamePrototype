
let grid = [[null, null, null], [null, null, null], [null, null, null]];
let gridHolder = document.getElementById("xoGrid");
let fields = Array.from(gridHolder.querySelectorAll(".field"));

let shape = 'x';
let gamemode;

function UpdateGrid(NewGrid){ //remove when got some shit

    let f = 0;
    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            if(NewGrid[i][j] == null){
                fields[f].innerHTML = null;
            }
            else{
                console.log(NewGrid[i][j])
                fields[f].innerHTML = `<span class="${NewGrid[i][j]}"></span>`;
            }
            
            f++;
        }
    }


}

function Pick(e){
    //gotta check if there is more playable space
    let coordinates = {
        row: e.target.getAttribute("data-row"),
        col: e.target.getAttribute("data-column")
    }

    if(grid[coordinates.row][coordinates.col] != null)return;//checks if field is empty

    if(gamemode == "online"){
        OnlineUpdateGrid(coordinates.row, coordinates.col, shape)

        return;
    }


    addToGrid(coordinates.row, coordinates.col, shape);
    UpdateGrid(grid)

    if(gamemode == "online"){
        togglePlayable(flase);
        return;
    }
    CheckGrid()

    //check if gamemode is online and if its not change shape
    if(gamemode == "online") return
    ChangeShape()
    
}


function ChceckIfFull(){}//finish

function addToGrid(row, col, shape){
    if(grid[row][col] != null)return;//DOUBLE checks if field is empty
    grid[row][col] = shape;
}


function ChangeShape(){//HIGHLIGHT WHOS TURN IS IT
    if(shape == 'x'){
        shape = 'o'
        document.getElementById("scoreX").parentNode.classList.remove("playing")
        document.getElementById("scoreO").parentNode.classList.add("playing")
    }
    else{
        shape = 'x'
        document.getElementById("scoreO").parentNode.classList.remove("playing")
        document.getElementById("scoreX").parentNode.classList.add("playing")
    }
}

function CheckGrid(){
    //horizontals
    for(let i=0; i<3; i++){
        if(grid[i][0] == grid[i][1] && grid[i][0] == grid[i][2]){
            if(grid[i][0] != null){
                console.log("column");
                Win("horizontal", i, grid[i][0]);
            }
            
        }

    }
    //verticals
    for(let i=0; i<3; i++){
        if(grid[0][i] == grid[1][i] && grid[0][i] == grid[2][i]){
            if(grid[0][i] != null){
                console.log("row");
                Win("vertical", i, grid[0][i]);
            }
            
        }
        
    }
    //diagonals
    if(grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]){
        if(grid[1][1] != null){
            console.log("diagonal1")
            Win("diagonal", 4, grid[1][1])
        }
    }
    if(grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0]){
        if(grid[1][1] != null){
            console.log("diagonal2")
            Win("diagonal", 5, grid[1][1])
        }
    }

}

function togglePlayable(playable){
    console.log(playable)
    switch(playable){
        case true:
            gridHolder.style.pointerEvents = "all";
            break;
        case false:
            gridHolder.style.pointerEvents = "none";
            break;
        case undefined:
            if(gridHolder.style.pointerEvents == "none")gridHolder.style.pointerEvents = "all";
            else gridHolder.style.pointerEvents = "none";
            break;
    }
}

function togglePlayingShape(shape){
    switch (shape) {
        case "x":
            document.getElementById("scoreO").parentNode.classList.remove("playing")
            document.getElementById("scoreX").parentNode.classList.add("playing")
            break;

        case "x":
            document.getElementById("scoreO").parentNode.classList.add("playing")
            document.getElementById("scoreX").parentNode.classList.remove("playing")
            break;
            
        case undefined:
            if(document.getElementById("scoreO").parentNode.classList.contains("playing")){
                document.getElementById("scoreO").parentNode.classList.remove("playing")
                document.getElementById("scoreX").parentNode.classList.add("playing")
            }
            else{
                document.getElementById("scoreO").parentNode.classList.add("playing")
                document.getElementById("scoreX").parentNode.classList.remove("playing")
            }
            break;
    }
}

function Win(axis, index, winner){
    togglePlayable(false)//disables input
    winner = winner.charAt(13);
    let winLine = document.getElementById("winLine");
    let Multiplier;

    switch(index){
        case 0:
            Multiplier = 1;
            break;
        case 1:
            Multiplier = 3;
            break;
        case 2:
            Multiplier = 5;
            break;
        //case for diagonals fi 4 multiplier is -1 if 5 mulitplier 1
        case 4:
            Multiplier = 1;
            break;
        case 5:
            Multiplier = -1;
            break;
    }

    
    switch(axis){
        case "horizontal":
            winLine.classList.add("horizontal-win");
            winLine.style.top = "calc(16.6% * " + Multiplier + " - 5px)";
            break;
        case "vertical":
            winLine.classList.add("vertical-win");
            winLine.style.left = "calc(16.6% * " + Multiplier + " - 2px)";
            break;
        case "diagonal":
            winLine.classList.add("diagonal-win");
            winLine.style.transform = "rotate(" + 45 * Multiplier + "deg)"
            break;
    }

    //winLine.classList.add("horizontal-win")

    console.log("winner is: " + winner)
    if(winner == "x"){
        document.getElementById("scoreX").innerHTML = parseInt(document.getElementById("scoreX").innerHTML)+1;
        document.getElementById("scoreX").parentNode.classList.add("winner")
    }else{
        document.getElementById("scoreO").innerHTML = parseInt(document.getElementById("scoreO").innerHTML)+1;
        document.getElementById("scoreO").parentNode.classList.add("winner")
    }
    //update score

    setTimeout(() => {
        grid = [[null, null, null], [null, null, null], [null, null, null]];
        UpdateGrid(grid)

        winLine.classList.remove("horizontal-win")
        winLine.classList.remove("vertical-win")
        winLine.classList.remove("diagonal-win")
        winLine.style = null
        document.getElementsByClassName("winner")[0].classList.remove("winner")
        //trigger endscreen or sum bullshit LIKE ANIMATION
        togglePlayable(true)
    }, 2000);
}


Array.from(document.getElementsByClassName("field")).forEach(element => element.addEventListener("click", Pick));