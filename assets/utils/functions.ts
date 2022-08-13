import { Cell } from "../classes/Cell";
import { CellPanel } from "../classes/CellPanel";
import { CellRow } from "../classes/CellRow";

export function initiate(rows: number, columns: number): CellPanel {
  const newPanel = new CellPanel()
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const newRow = new CellRow()
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const newCell = new Cell();
      newCell.number = Math.floor(Math.random() * 9) + 1;
      newRow.addCell(newCell)
    }
    newPanel.addRow(newRow)
  }
  return newPanel
}