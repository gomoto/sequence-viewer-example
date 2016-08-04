import { Grid } from 'sequence-viewer';
import {
  Structure,
  Chain,
  Residue,
  AminoAcids,
  Tree
} from 'atom';
import Data from './Data';
import tree from './tree';
import Sequence from './Sequence';
import state from './state';
import scroller from './scroll';

const elem = document.getElementById('sequence-viewer');
const data = new Data();
const grid = new Grid(elem, data, state.width, state.height);

grid.stickyRow = state.stickyRow;
grid.stickyColumn = state.stickyColumn;

grid.stickyRowHeight = state.stickyRowHeight;
grid.stickyColumnWidth = state.stickyColumnWidth;

const sequences = <Sequence[]> tree.root.children;

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

  scroller.scrollBy(event.deltaX, event.deltaY);

  grid.origin.r = Math.floor(scroller.x / grid.residueWidth);
  grid.origin.s = Math.floor(scroller.y / grid.residueHeight);// not quite

  // origin did not change
  if (grid.origin.r === originalR && grid.origin.s === originalS) {
    return;
  }
  grid.draw();
});

grid.draw();
