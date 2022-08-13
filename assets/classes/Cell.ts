export class Cell {
  number: number;
  selected: boolean;

  constructor(cell?: Cell) {
    this.number = cell ? cell.number : 0;
    this.selected = cell ? cell.selected : false;
  }

  toggleSelect() {
    this.selected = !this.selected
  }

  deselect() {
    this.selected = false
  }
}