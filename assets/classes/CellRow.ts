import { Cell } from "./Cell";

export class CellRow {
  data: Array<Cell>

  constructor(row?: Array<Cell>) {
    this.data = []
    if (row) {
      for (const cell of row) {
        this.data.push(new Cell(cell))
      }
    }
  }

  get length(): number { return this.data.length }

  addCell(cell: Cell) {
    this.data.push(cell)
  }

  removeCell(index: number) {
    this.data.splice(index, 1)
  }

  deselectAllCells() {
    for (const cell of this.data) {
      cell.deselect()
    }
  }
}