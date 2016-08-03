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

const elem = document.getElementById('sequence-viewer');
const data = new Data();
const grid = new Grid(elem, data);

grid.stickyRow = true;
grid.stickyColumn = true;

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

grid.draw();
