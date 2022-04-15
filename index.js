
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

function Pick(e){
    //check if field is empty
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
            }
            
        }

    }
    //verticals
    for(let i=0; i<3; i++){
        if(grid[0][i] == grid[1][i] && grid[0][i] == grid[2][i]){
            if(grid[0][i] != null){
                console.log("row");
            }
            
        }
        
    }
    //diagonals
    if((grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]) || (grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0])){
        if(grid[1][1] != null){
            console.log("diagonal")
        }
        
    }

}

Array.from(document.getElementsByClassName("field")).forEach(element => element.addEventListener("click", Pick));

