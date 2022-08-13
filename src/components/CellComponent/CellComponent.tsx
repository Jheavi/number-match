import { useAppDispatch } from "../../app/hooks";
import { Cell } from "../../assets/classes/Cell";
import { CellRow } from "../../assets/classes/CellRow";
import { select } from "../PanelComponent/panelSlice";
import './CellComponent.css'

export default function CellComponent({ cell, row }: { cell: Cell, row: CellRow }) {
  const dispatch = useAppDispatch();

  return(
    <div className={`cell${cell.selected ? ' selected' : ''}${cell.deleted ? ' deleted' : ''}`} onClick={() => {dispatch(select({row, cell}))}}>
      {cell.number}
    </div>
  )
}