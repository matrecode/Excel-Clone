let rows = 100;
let cols = 26;

let addressColContainer = document.querySelector(".address-column-container");
let addressRowContainer = document.querySelector(".address-row-container");

let addressBar = document.querySelector(".address-bar")

let cellsContainer = document.querySelector(".cells-container")

for (i = 0; i < rows; i++) {
  let addressColumn = document.createElement("div");
  addressColumn.setAttribute("class", "address-column");

  addressColumn.innerText = i + 1;
  addressColContainer.appendChild(addressColumn);
}


for (i = 0; i < cols; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");

  addressRow.innerText = String.fromCharCode(65 + i);
  addressRowContainer.appendChild(addressRow);
}


for(i = 0; i < rows; i++){
    let cellContainer = document.createElement("div");
    cellContainer.setAttribute("class", "cell-container");

    for(j = 0; j < cols;j++){
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contentEditable", "true")
      // Attributes for cell and storage identification
        cell.setAttribute("rid", i);
        cell.setAttribute("cid",j)
        cellContainer.appendChild(cell);
        addListenerForAddressBarDisplay(cell, i, j);
    }

    cellsContainer.appendChild(cellContainer)
}

function addListenerForAddressBarDisplay(cell, i, j){
    cell.addEventListener("click", (e)=>{
        let rowID = i + 1;
        let colID = String.fromCharCode(65 + j);
        addressBar.value = `${colID}${rowID}`;
    })
}

// by default focus on cell

let defaultCell = document.querySelector(".cell");
defaultCell.click();


