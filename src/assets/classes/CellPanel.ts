import { checkIfCellsAreDiagonal } from "../utils/functions";
import { Cell } from "./Cell";
import { CellRow } from "./CellRow";

export class CellPanel {
  rows: Array<CellRow>;
  maxRowLength: number;

  constructor(panel?: CellPanel) {
    this.maxRowLength = panel ? panel.maxRowLength : 0;
    this.rows = []
    if (panel) {
      for (const row of panel.rows) {
        this.rows.push(new CellRow(row))
      }
    }
  }

  get lastRowWithPlace(): CellRow | null {
    let index = 0
    while (index < this.rows.length) {
      const row = this.rows[index]
      if (row.isfull && row.isfullOfNumbers) {
        index++;
      } else {
        return this.rows[index]
      }
    }
    return null
  }

  get numbersNotDeleted(): Array<number> {
    return this.rows.flatMap(row => row.data.filter(cell => !cell.deleted && cell.number).map(cell => cell.number!))
  }

  addRow(row: CellRow) {
    this.rows.push(row)
  }

  removeRow(index: number) {
    this.rows.splice(index, 1)
  }

  deselectAllCells() {
    for (const row of this.rows) {
      row.deselectAllCells()
    }
  }

  createPanel(rows: number, columns: number, rowsWithNumbers: number) {
    this.rows = []
    const newPanel = new CellPanel()
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const newRow = new CellRow()
      for (let colIndex = 0; colIndex < columns; colIndex++) {
        const newCell = new Cell();
        if (rowIndex < rowsWithNumbers) {
          newCell.number = Math.floor(Math.random() * 9) + 1;
        }
        newRow.addCell(newCell)
      }
      newRow.maxLength = columns;
      newPanel.addRow(newRow)
    }
    this.rows = newPanel.rows;
    this.maxRowLength = columns;
    console.log(newPanel)
  }

  findSelectedCell(): Cell {
    for (const row of this.rows) {
      for (const cell of row.data) {
        if (cell.selected) {
          return cell
        }
      }
    }
    return new Cell()
  }

  findSelectedRow(): CellRow {
    for (const row of this.rows) {
      for (const cell of row.data) {
        if (cell.selected) {
          return row
        }
      }
    }
    return new CellRow()
  }

  checkIfAllBetweenColumnAreDeleted(firstRowIndex: number, secondRowIndex: number, cellIndex: number): boolean {
    const minIndex = Math.min(firstRowIndex, secondRowIndex)
    const maxIndex = Math.max(firstRowIndex, secondRowIndex)
    for (let index = minIndex + 1; index < maxIndex; index++) {
      if (!this.rows[index].data[cellIndex].deleted) {
        return false
      }
    }
    return true
  }

  checkIfAllBetweenDiagonalsAreDeleted(clickedRowIndex: number, selectedRowIndex: number, clickedCellIndex: number, selectedCellIndex: number): boolean {
    const minRowIndex = clickedRowIndex < selectedRowIndex ? clickedRowIndex : selectedRowIndex
    const minCellIndex = clickedCellIndex < selectedCellIndex ? clickedCellIndex : selectedCellIndex
    const maxRowIndex = clickedRowIndex < selectedRowIndex ? selectedRowIndex : clickedRowIndex
    const maxCellIndex = clickedCellIndex < selectedCellIndex ? selectedCellIndex : clickedCellIndex

    for (let rowIndex = minRowIndex + 1; rowIndex < maxRowIndex; rowIndex++) {
      for (let colIndex = minCellIndex + 1; colIndex < maxCellIndex; colIndex++) {
        if (checkIfCellsAreDiagonal(clickedRowIndex, clickedCellIndex, rowIndex, colIndex) && !this.rows[rowIndex].data[colIndex].deleted) {
          return false
        }
      }
    }

    return true
  }

  checkIfAllBetweenLinesAreDeleted(clickedRowIndex: number, selectedRowIndex: number, clickedCellIndex: number, selectedCellIndex: number): boolean {
    const minRowIndex = clickedRowIndex < selectedRowIndex ? clickedRowIndex : selectedRowIndex
    const maxRowIndex = clickedRowIndex < selectedRowIndex ? selectedRowIndex : clickedRowIndex
    const minCellIndex = clickedRowIndex < selectedRowIndex ? clickedCellIndex : selectedCellIndex
    const maxCellIndex = clickedRowIndex < selectedRowIndex ? selectedCellIndex : clickedCellIndex
    for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex++) {
      for (let colIndex = 0; colIndex < this.maxRowLength; colIndex++) {
        if ((rowIndex === minRowIndex && colIndex > minCellIndex) || (rowIndex === maxRowIndex && colIndex < maxCellIndex) || (rowIndex > minRowIndex && rowIndex < maxRowIndex)) {
          if (!this.rows[rowIndex].data[colIndex].deleted) {
            return false
          }
        }
      }
    }
    return true
  }
}
