let sheetDB = [];


// matrix with defaults value
for (i = 0; i < rows; i++) {
  let sheetRow = [];
  for (j = 0; j < cols; j++) {
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      fontFamily: "Calibri",
      fontSize: "12",
      alignment: "left",
      fontColor: "#000000",
      bgColor: "#000000",
      value:"",
      formula:"",
    };
    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}

//Selectors for all properties

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontFamily = document.querySelector(".font-family-prop");
let fontSize = document.querySelector(".font-size-prop");
let alignment = document.querySelectorAll(".alignment");
let fontColor = document.querySelector(".font-color-prop");
let bgColor = document.querySelector(".BGcolor-prop");
let left = alignment[0];
let center = alignment[1];
let right = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#dfe6e9";

// Two way binding

bold.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getactiveCellAndProp(address);

  // Modification
  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp;
});

italic.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getactiveCellAndProp(address);

  // Modification
  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp;
});

underline.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getactiveCellAndProp(address);

  // Modification
  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none";
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp;
});

fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getactiveCellAndProp(address);

  // Modification
  cellProp.fontSize = fontSize.value; //data-change
  cell.style.fontSize = cellProp.fontSize + "px"; //cell ui change
  fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getactiveCellAndProp(address);

  // Modification
  cellProp.fontFamily = fontFamily.value; //data-change
  cell.style.fontFamily = cellProp.fontFamily; //cell ui change
  fontFamily.value = cellProp.fontFamily;
});

fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getactiveCellAndProp(address);

  // Modification
  cellProp.fontColor = fontColor.value; //data-change
  cell.style.color = cellProp.fontColor; //cell ui change
  fontColor.value = cellProp.fontColor;
});

bgColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getactiveCellAndProp(address);

  // Modification
  cellProp.bgColor = bgColor.value; //data-change
  cell.style.backgroundColor = cellProp.bgColor; //cell ui change
  bgColor.value = cellProp.bgColor;
});

alignment.forEach((alignment) => {
  alignment.addEventListener("click", (e) => {
    // Access Cell
    let address = addressBar.value;
    let [cell, cellProp] = getactiveCellAndProp(address);

    let alignValue = e.target.classList[0];
    cellProp.alignment = alignValue; //data-change
    cell.style.textAlign = cellProp.alignment;

    switch (alignValue) {
      case "left":
        left.style.backgroundColor = activeColorProp;
        center.style.backgroundColor = inactiveColorProp;
        right.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        left.style.backgroundColor = inactiveColorProp;
        center.style.backgroundColor = activeColorProp;
        right.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        left.style.backgroundColor = inactiveColorProp;
        center.style.backgroundColor = inactiveColorProp;
        right.style.backgroundColor = activeColorProp;
        break;
    }
  });
});

let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
  addListenToAttachedCellProperties(allCells[i]);
}

function addListenToAttachedCellProperties(cell) {
  cell.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    let cellProp = sheetDB[rid][cid];

    // Apply cell properties
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSize + "px"; //cell ui change
    cell.style.fontFamily = cellProp.fontFamily; //cell ui change
    cell.style.color = cellProp.fontColor; //cell ui change
    cell.style.backgroundColor = cellProp.bgColor === "#000000" ? "transparent" : cellProp.bgColor; //cell ui change
    cell.style.textAlign = cellProp.alignment;
    

    // Apply Properties UI Container
    bold.style.backgroundColor = cellProp.bold
      ? activeColorProp
      : inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic
      ? activeColorProp
      : inactiveColorProp;
    underline.style.backgroundColor = cellProp.underline
      ? activeColorProp
      : inactiveColorProp;

    fontSize.value = cellProp.fontSize;

    fontFamily.value = cellProp.fontFamily;
    fontColor.value = cellProp.fontColor;
    bgColor.value = cellProp.bgColor;
    switch (cellProp.alignment) {
      case "left":
        left.style.backgroundColor = activeColorProp;
        center.style.backgroundColor = inactiveColorProp;
        right.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        left.style.backgroundColor = inactiveColorProp;
        center.style.backgroundColor = activeColorProp;
        right.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        left.style.backgroundColor = inactiveColorProp;
        center.style.backgroundColor = inactiveColorProp;
        right.style.backgroundColor = activeColorProp;
        break;
    }
  });
}

function getactiveCellAndProp(address) {
  let [rid, cid] = decodeRIDCIDFromAddress(address);
  // Access the cell and storage object
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellProp = sheetDB[rid][cid];

  return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address) {
  let rid = Number(address.slice(1) - 1);
  let cid = Number(address.charCodeAt(0)) - 65;
  return [rid, cid];
}
