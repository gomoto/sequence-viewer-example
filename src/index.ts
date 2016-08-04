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

grid.stickyRowHeight = state.stickyRowHeight;
grid.stickyColumnWidth = state.stickyColumnWidth;

const sequences = <Sequence[]> state.tree.root.children;

grid.on('mousedown:sequence', (event: MouseEvent, s: number) => {
  var sequence = sequences[s];
  sequence.areLabelsVisible = !sequence.areLabelsVisible;
  grid.draw();
});

grid.on('mousedown:residue', (event: MouseEvent, r: number, s: number) => {
  sequences[s].residues[r].touch({ ctrl: event.ctrlKey || event.metaKey, shift: event.shiftKey });
  grid.draw();
});

grid.on('mouseover:residue', (event: MouseEvent, r: number, s: number) => {
  sequences[s].residues[r].touch({ ctrl: event.ctrlKey || event.metaKey, shift: true });
  grid.draw();
});

grid.on('scroll', (event: WheelEvent) => {
  var originalR = grid.origin.r;
  var originalS = grid.origin.s;

  state.scroller.scrollBy(event.deltaX, event.deltaY);

  grid.origin.r = Math.floor(state.scroller.x / grid.residueWidth);
  grid.origin.s = Math.floor(state.scroller.y / grid.residueHeight);// not quite

  // origin did not change
  if (grid.origin.r === originalR && grid.origin.s === originalS) {
    return;
  }
  grid.draw();
});

grid.draw();
