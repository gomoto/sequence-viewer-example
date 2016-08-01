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

const elem = document.getElementById('sequence-viewer');
const data = new Data();
const grid = new Grid(elem, data);

grid.stickyRow = true;
grid.stickyColumn = true;

const sequences = <Structure[]> tree.root.children;

grid.on('mousedown:sequence', (event: MouseEvent, s: number) => {
  var sequence = <Structure> sequences[s];
  sequence.setProperty('labels', !sequence.getProperty('labels'));
  grid.draw();
});

grid.on('mousedown:residue', (event: MouseEvent, r: number, s: number) => {
  var residue = <Residue> sequences[s].getProperty('residues')[r];
  residue.touch({ ctrl: event.ctrlKey || event.metaKey, shift: event.shiftKey });
  grid.draw();
});

grid.on('mouseover:residue', (event: MouseEvent, r: number, s: number) => {
  var residue = <Residue> sequences[s].getProperty('residues')[r];
  residue.touch({ ctrl: event.ctrlKey || event.metaKey, shift: true });
  grid.draw();
});

grid.draw();
