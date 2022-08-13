export class Cell {
  number: number | null;
  selected: boolean;
  deleted: boolean;

  constructor(cell?: Cell) {
    this.number = cell ? cell.number : null;
    this.selected = cell ? cell.selected : false;
    this.deleted = cell ? cell.deleted : false;
  }

  toggleSelect() {
    this.selected = !this.selected
  }

  deselect() {
    this.selected = false
  }

  delete() {
    this.deleted = true
  }

  reset() {
    this.selected = false
    this.deleted = false
  }
}