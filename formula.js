for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid = "${i}"][cid="${j}"]`);
    // console.log(cell)
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activeCell, cellProp] = getactiveCellAndProp(address);

      let enteredData = activeCell.innerText;
      if(enteredData === cellProp.value) return;


      cellProp.value = enteredData;
      // If data modifies remvove P-C relation, formula empty, update cchildrens with new hard coded value
      removeChildFromParent(cellProp.formula)
      cellProp.formula = ""
      updateChildrenCells(address)
      console.log(cellProp);
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keydown", (e) => {
  let inputFormula = formulaBar.value;
  if (e.key === "Enter" && inputFormula) {


    // if there is any change in formula then break the formula, evaluate new formula, add new P-C relation
    let address = addressBar.value
    let [cell, cellProp] = getactiveCellAndProp(address)
    if(inputFormula !== cellProp.formula)removeChildFromParent(cellProp.formula);
    let evaluatedValue = evaluateFormula(inputFormula);
    // To update the UI and cellProp  in DB
    setCellUIAndCellProp(evaluatedValue, inputFormula, address);
    // acheive parent child relationship
    addChildToParent(inputFormula)
    console.log(sheetDB)
    updateChildrenCells(address)
  }
});

// for parent child dependency of cells so that UI and database updated with children

function updateChildrenCells(parentAddress){
  let [parentCell, parentCellProp] = getactiveCellAndProp(parentAddress)
  let children = parentCellProp.childrens

  for(let i = 0; i < children.length; i++){
    let childAddress = children[i]
    let [childCell, childCellProp] = getactiveCellAndProp(childAddress);
    let childFormula = childCellProp.formula
    let evaluatedValue = evaluateFormula(childFormula)
    setCellUIAndCellProp(evaluatedValue, childFormula, childAddress)
    updateChildrenCells(childAddress)
  }
}


function addChildToParent(formula){
  let childAddress = addressBar.value 
  let encodedFormula = formula.split(" ");
  // console.log(encodedFormula)
  // run the loop to get perticular cell
  for (let i = 0; i < encodedFormula.length; i++) {
    // find the ascii value of the elements
    let asciiValue = encodedFormula[i].charCodeAt(0);
    // console.log(asciiValue);
    // if the ascii value exist then and it is between 65-90
    if (asciiValue >= 65 && asciiValue <= 90) {
      // then get cell and cellprop with decoding
      let [parentCell, parentCellProp] = getactiveCellAndProp(encodedFormula[i]);
      // push all the dependent childrens in children array
      parentCellProp.childrens.push(childAddress)
      
    }
  }
}

// If any changes in formula then change the parent child relationship

function removeChildFromParent(formula){
  let childAddress = addressBar.value
  let encodedFormula = formula.split(" ");
  // console.log(encodedFormula)
  // run the loop to get perticular cell
  for (let i = 0; i < encodedFormula.length; i++) {
    // find the ascii value of the elements
    let asciiValue = encodedFormula[i].charCodeAt(0);
    // console.log(asciiValue);
    // if the ascii value exist then and it is between 65-90
    if (asciiValue >= 65 && asciiValue <= 90) {
      // then get cell and cellprop with decoding
      let [parentCell, parentCellProp] = getactiveCellAndProp(encodedFormula[i]);
      // find index and remove the dependent childrens from an array
      let idx = parentCellProp.childrens.indexOf(childAddress);
      parentCellProp.childrens.splice(idx,1);
      
      
    }
  }
}

// Formula evaluation
function evaluateFormula(formula) {
  // split the expression into space seperated array
  let encodedFormula = formula.split(" ");
  // console.log(encodedFormula)
  // run the loop to get perticular cell
  for (let i = 0; i < encodedFormula.length; i++) {
    // find the ascii value of the elements
    let asciiValue = encodedFormula[i].charCodeAt(0);
    // console.log(asciiValue);
    // if the ascii value exist then and it is between 65-90
    if (asciiValue >= 65 && asciiValue <= 90) {
      // then get cell and cellprop
      let [cell, cellProp] = getactiveCellAndProp(encodedFormula[i]);
      // and decode the formula
      encodedFormula[i] = cellProp.value;
    }
  }
  // After decode the formula join it because eval is taking parameter as a string
  let decodedFormula = encodedFormula.join(" ");
  // and evaluate it
  return eval(decodedFormula);
}

// Setting the UI and Cell Prop
function setCellUIAndCellProp(evaluatedValue, formula, address) {
 
  let [cell, cellProp] = getactiveCellAndProp(address);

  // UI update
  cell.innerText = evaluatedValue;
  // DB Update
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
}
