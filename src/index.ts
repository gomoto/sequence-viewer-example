import { Grid } from 'sequence-viewer';
import {
  Structure,
  Chain,
  Residue,
  AminoAcids,
  Tree
} from 'atom';
import Data from './Data';
import Sequence from './Sequence';
import state from './state';

const elem = document.getElementById('sequence-viewer');
const data = new Data();
const grid = new Grid(elem, data, state.width, state.height);

grid.stickyRow = state.stickyRow;
grid.stickyColumn = state.stickyColumn;
grid.gridLines = state.gridLines;
grid.labels = state.labels;

grid.stickyRowHeight = state.stickyRowHeight;
grid.stickyColumnWidth = state.stickyColumnWidth;
grid.residueWidth = state.residueWidth;
grid.residueHeight = state.residueHeight;
grid.labelHeight = state.labelHeight;

grid.on('mousedown:residue', (event: MouseEvent, r: number, s: number) => {
  state.sequences[s].residues[r].touch({ ctrl: event.ctrlKey || event.metaKey, shift: event.shiftKey });
  grid.draw();
});

grid.on('mouseover:residue', (event: MouseEvent, r: number, s: number) => {
  state.sequences[s].residues[r].touch({ ctrl: event.ctrlKey || event.metaKey, shift: true });
  grid.draw();
});

grid.on('scroll', (event: WheelEvent) => {
  state.scroller.scroll(event.deltaX, event.deltaY);
  if (grid.origin.r === state.scroller.r && grid.origin.s === state.scroller.s) {
    return;
  }
  grid.origin.r = state.scroller.r;
  grid.origin.s = state.scroller.s;
  grid.draw();
});

grid.draw();
