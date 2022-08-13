import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Cell } from "../../assets/classes/Cell";
import { CellPanel } from "../../assets/classes/CellPanel";
import { CellRow } from "../../assets/classes/CellRow";
import { checkIfCorrect, makeTraps } from "../../assets/utils/functions";

export interface PanelState {
  panel: CellPanel;
  deletedCell: boolean;
}

const initialState: PanelState = {
  panel: new CellPanel(),
  deletedCell: false
};

export const panelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    create: (state) => {
      let newPanel = new CellPanel()
      newPanel.createPanel(10, 9, 5)
      newPanel = makeTraps(newPanel)
      state.panel = newPanel
    },
    select: (state, action: PayloadAction<{ row: CellRow, cell: Cell }>) => {
      if (action.payload.cell.number && !action.payload.cell.deleted) {
        const newPanel = new CellPanel(state.panel)
        const clickedRowIndex = state.panel.rows.indexOf(action.payload.row)
        const clickedCellIndex = state.panel.rows[clickedRowIndex].data.indexOf(action.payload.cell)
        const selectedCell = newPanel.findSelectedCell()
        const clickedCell = newPanel.rows[clickedRowIndex].data[clickedCellIndex]
        if (selectedCell && (selectedCell.number === clickedCell.number || selectedCell.number! + clickedCell.number! === 10)) {
          const selectedRow = newPanel.findSelectedRow()
          const selectedRowIndex = newPanel.rows.indexOf(selectedRow)
          const selectedCellIndex = newPanel.rows[selectedRowIndex].data.indexOf(selectedCell)
          if (checkIfCorrect(newPanel, clickedRowIndex, clickedCellIndex, selectedRowIndex, selectedCellIndex)) {
            selectedCell.delete();
            clickedCell.delete();
            newPanel.deselectAllCells();
            state.deletedCell = true;
          } else {
            newPanel.deselectAllCells();
            clickedCell.toggleSelect();
            state.deletedCell = false;
          }
        } else {
          newPanel.deselectAllCells();
          clickedCell.toggleSelect();
          state.deletedCell = false;
        }
        state.panel = newPanel
      }
    },
    addRemaining: (state) => {
      const newPanel = new CellPanel(state.panel)
      const numbersNotDeleted = newPanel.numbersNotDeleted.slice()
      for (const number of numbersNotDeleted) {
        const lastRowWithPlace = newPanel.lastRowWithPlace
        if (lastRowWithPlace) {
          const cellWithoutNumber = lastRowWithPlace.firstWithoutNumber
          if (cellWithoutNumber) {
            cellWithoutNumber.number = number
          } else {
            const newCell = new Cell()
            newCell.number = number
            lastRowWithPlace.addCell(newCell)
          }
        } else {
          const newRow = new CellRow()
          const newCell = new Cell()
          newCell.number = number
          newRow.addCell(newCell)
          newPanel.addRow(newRow)
        }
      }
      state.panel = newPanel
    },
    checkEmptyRows: (state) => {
      const newPanel = new CellPanel(state.panel)
      for (let index = 0; index < state.panel.rows.length; index++) {
        if (state.panel.rows[index].isAllDeleted) {
          newPanel.removeRow(index)
        }
      }
      if (newPanel.rows.length != state.panel.rows.length) {
        state.panel = newPanel
      }
      state.deletedCell = false
    }
  }
})

export const { create, select, addRemaining, checkEmptyRows } = panelSlice.actions;

export const selectPanel = (state: RootState) => state.panel.panel
export const selectDeletedCell = (state: RootState) => state.panel.deletedCell

export default panelSlice.reducer