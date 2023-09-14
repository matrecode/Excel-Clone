for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid = "${i}"][cid="${j}"]`);
    // console.log(cell)
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activeCell, cellProp] = getactiveCellAndProp(address);

      let enteredData = activeCell.innerText;
      cellProp.value = enteredData;
      console.log(cellProp);
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keydown", (e)=>{
    let inputFormula = formulaBar.value
    if(e.key === "Enter" && inputFormula){
        let evaluatedValue = evaluateFormula(inputFormula)
        // To update the UI and cellProp  in DB
        setCellUIAndCellProp(evaluatedValue, inputFormula)

    }
})

// Formula evaluation
function evaluateFormula(formula){
    return eval(formula);
}


// Setting the UI and Cell Prop
function setCellUIAndCellProp(evaluatedValue, formula){
    let address = addressBar.value;
    let [cell, cellProp] = getactiveCellAndProp(address);

    // UI update
    cell.innerText = evaluatedValue;
    // DB Update
    cellProp.value = evaluatedValue;
    cellProp.formula = formula
}

