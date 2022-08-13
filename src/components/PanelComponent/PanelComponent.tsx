import { checkEmptyRows, create, selectDeletedCell } from "./panelSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CellComponent from "../CellComponent/CellComponent";
import "./PanelComponent.css";
import { selectPanel, addRemaining } from "./panelSlice";

export default function PanelComponent() {
  const panel = useAppSelector(selectPanel);
  const deletedCell = useAppSelector(selectDeletedCell);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(create())
  }, [])

  useEffect(() => {
    for (const row of panel.rows) {
      if (row.isAllDeleted) {
        const rowDiv = document.getElementsByClassName('row-' + panel.rows.indexOf(row))[0]
        rowDiv.classList.add('delete')
      }
    }
    setTimeout(() => {
      dispatch(checkEmptyRows())
    }, 1000);
  }, [deletedCell])

  return (
    <>
      <div className="panel">
        {panel.rows.map((row, rIndex) => (
          <div className={"row row-" + rIndex} key={Math.random() * (rIndex + 1)}>
            {row.data.map((cell, cIndex) => (
              <CellComponent cell={cell} row={row} key={Math.random() * (cIndex + 1)}/>
            ))}
          </div>
        ))}
      </div>
      <button onClick={() => dispatch(addRemaining())}>Add</button>
    </>
  )
}