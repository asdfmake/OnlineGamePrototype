
let grid = [[null, null, null], [null, null, null], [null, null, null]];
//let grid = [[], [], []]
let gridHolder = document.getElementById("xoGrid");
let fields = Array.from(gridHolder.querySelectorAll(".field"));
let shape = '<span class="x"></span>';

function UpdateGrid(NewGrid){
    NewGrid = grid //remove when got some shit

    let f = 0;
    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            if(NewGrid[i][j] == null){
                fields[f].innerHTML = null;
            }
            else{
                fields[f].innerHTML = NewGrid[i][j];
            }
            
            f++;
        }
    }


}

function Pick(e){//gotta check if there is more playable space
    let coordinates = {
        row: e.target.getAttribute("data-row"),
        col: e.target.getAttribute("data-column")
    }

    if(grid[coordinates.row][coordinates.col] != null)return;//checks if field is empty
    
    grid[coordinates.row][coordinates.col] = shape;
    UpdateGrid()
    CheckGrid()
    //check if gamemode is online and if its not change shape
    ChangeShape()
}

function ChangeShape(){
    if(shape == '<span class="x"></span>'){
        shape = '<span class="o"></span>'
    }
    else{
        shape = '<span class="x"></span>'
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


function Win(axis, index, winner){
    gridHolder.style.pointerEvents = "none";
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

    console.log("winner is: " + winner.charAt(13) )

    setTimeout(() => {
        winLine.classList.remove("horizontal-win")
        winLine.classList.remove("vertical-win")
        winLine.classList.remove("diagonal-win")
        winLine.style = null
        //trigger endscreen or sum bullshit
        //reset game
    }, 2000);
}


Array.from(document.getElementsByClassName("field")).forEach(element => element.addEventListener("click", Pick));