import { CellPanel } from "../classes/CellPanel";

export function checkIfCorrect(panel: CellPanel, clickedRowIndex: number, clickedCellIndex: number, selectedRowIndex: number, selectedCellIndex: number): boolean {
  let correct = false
  if (clickedRowIndex === selectedRowIndex) {
    correct = panel.rows[clickedRowIndex].checkIfAllBetweenAreDeleted(clickedCellIndex, selectedCellIndex)
  } else if (clickedCellIndex === selectedCellIndex) {
    correct = panel.checkIfAllBetweenColumnAreDeleted(clickedRowIndex, selectedRowIndex, clickedCellIndex)
  } else if (checkIfCellsAreDiagonal(clickedRowIndex, clickedCellIndex, selectedRowIndex, selectedCellIndex)) {
    correct = panel.checkIfAllBetweenDiagonalsAreDeleted(clickedRowIndex, selectedRowIndex, clickedCellIndex, selectedCellIndex)
  } else {
    correct = panel.checkIfAllBetweenLinesAreDeleted(clickedRowIndex, selectedRowIndex, clickedCellIndex, selectedCellIndex)
  }
  return correct
}

export function makeTraps(panel: CellPanel): CellPanel {
  const newPanel = new CellPanel(panel)
  newPanel.rows[0].data[2].number = 11
  newPanel.rows[2].data[0].number = 11
  newPanel.rows[2].data[3].number = 11
  newPanel.rows[2].data[4].number = 11
  newPanel.rows[4].data[6].number = 11
  return newPanel
}

export function checkIfCellsAreDiagonal(firstRowIndex: number, firstCellIndex: number, secondRowIndex: number, secondCellIndex: number): boolean {
  if (firstRowIndex + firstCellIndex === secondRowIndex + secondCellIndex) {
    return true
  } else if (Math.abs(secondRowIndex - firstRowIndex) === Math.abs(secondCellIndex - firstCellIndex)) {
    return true
  }
  return false
}