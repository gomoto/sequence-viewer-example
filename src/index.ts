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

grid.on('mousedown:residue', (event: any, r: number, s: number) => {
  var residue = <Residue> sequences[s].getProperty('residues')[r];
  residue.touch();
  grid.draw();
  grid.render();
});

grid.draw();
grid.render();
