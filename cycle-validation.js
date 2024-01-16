// Storage -> 2D Array 
let graphComponentMatrix = []

for (let i = 0; i < rows; i++) {
    let row = []
    for (let j = 0; j < cols; j++) {
        // why array?
        // more than one child relation (dependency)
        row.push([])
    }
    graphComponentMatrix.push(row)
}

function isGraphCyclic(graphComponentMatrix) {
    // Dependency -> visited, dfsVisited (2DArray)

    let visited = [];
    let dfsVisited = [];

    for (let i = 0; i < rows; i++) {
        let visitedRow = []; // node visit trace
        let dfsVisitedRow = []; // stack visit trace
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false)
            dfsVisitedRow.push(false)
        }
        visited.push(visitedRow)
        dfsVisited.push(dfsVisitedRow)
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (visited[i][j] === false) {

                let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited)
                if (response == true) return true
            }
        }
    }

    return false


}

// Start -> visited(TRUE, dfsVisited(TRUE)
// End -> dfsVisited(False)
// if vis[i][j] -> already explored path, so go back no use to explore again
// Cycle detection condition -> if visited[i][j] === (True) && dfsVisited[i][j] === (True) -> cycle

function dfsCycleDetection(graphComponentMatrix, srcrow, srccol, visited, dfsVisited) {
    visited[srcrow][ srccol] = true;
    dfsVisited[srcrow][srccol] = true;

    for (let children = 0; children < graphComponentMatrix[srcrow][srccol].length; children++) {
        let [nrid, ncid] = graphComponentMatrix[srcrow][srccol][children]
        if (visited[nrid][ncid] === false) {
            let response = dfsCycleDetection(graphComponentMatrix, nrid, ncid, visited, dfsVisited)
            if (response === true) return true
        } else if (visited[nrid][ncid] === true && dfsVisited[nrid][ncid] === true) {
            return true
        }
    }


    dfsVisited[srcrow][srccol] = false
    return false
}

