import { CellRow } from "./CellRow";

export class CellPanel {
  rows: Array<CellRow>

  constructor(panel?: Array<CellRow>) {
    this.rows = []
    if (panel) {
      for (const row of panel) {
        this.rows.push(new CellRow(row.data))
      }
    }
  }

  addRow(row: CellRow) {
    this.rows.push(row)
  }

  removeRow(index: number) {
    this.rows.splice(index, 1)
  }

  deselectAllCells() {
    for (const row of this.rows) {
      this.deselectAllCells()
    }
  }
}