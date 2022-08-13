import { Cell } from "./Cell";

export class CellRow {
  data: Array<Cell>;
  maxLength: number;

  constructor(row?: CellRow) {
    this.maxLength = row ? row.maxLength : 0;
    this.data = []
    if (row) {
      for (const cell of row.data) {
        this.data.push(new Cell(cell))
      }
    }
  }

  get length(): number { return this.data.length }

  get isfull(): boolean { return this.length === this.maxLength }

  get isfullOfNumbers(): boolean { return this.data.every(cell => cell.number) }

  get isEmpty(): boolean { return this.data.every(cell => !cell.number) }

  get isAllDeleted(): boolean { return this.data.every(cell => cell.deleted) }

  get firstWithoutNumber(): Cell | null {
    for (const cell of this.data) {
      if (!cell.number) {
        return cell
      }
    }
    return null
  }

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

  checkIfAllBetweenAreDeleted(firstIndex: number, secondIndex: number): boolean {
    const minIndex = Math.min(firstIndex, secondIndex)
    const maxIndex = Math.max(firstIndex, secondIndex)
    for (let index = minIndex + 1; index < maxIndex; index++) {
      if (!this.data[index].deleted) {
        return false
      }
    }
    return true
  }
}