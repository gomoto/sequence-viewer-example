import { GridData } from 'sequence-viewer';

import {
  Structure,
  Chain,
  Residue,
  AminoAcids,
  Node,
  Tree
} from 'atom';

import Sequence from './Sequence';
import state from './state';


const sequences = <Sequence[]> state.tree.root.children;

class Data implements GridData {

  getStickyRowValue(r: number) {
    if (r % 2 === 1) {
      return '';
    }
    return `${r + 1}`;
  }
  getStickyColumnValue(s: number) {
    return sequences[s].id;
  }


  getSequenceCount() {
    return sequences.length;
  }
  getMaxResidueCount() {
    return state.maxResidues;
  }
  getResidueCount(s: number) {
    return sequences[s].countNodes('Monomer');
  }


  showLabels(s: number) {
    return sequences[s].areLabelsVisible;
  }


  getResidue(r: number, s: number) {
    return sequences[s].residues[r].aminoAcid.single;
  }
  getResidueTextColor(r: number, s: number) {
    var residue = sequences[s].residues[r];
    return residue.isOn ? '#ffffff' : residue.color;
  }
  getResidueBackgroundColor(r: number, s: number) {
    var residue = sequences[s].residues[r];
    return residue.isOn ? residue.color : '';
  }


  getResidueLabel(r: number, s: number) {
    var residue = sequences[s].residues[r];
    if (residue.chainIndex === 0) {
      return residue.parent.id;
    }
    if (residue.chainIndex % 5 === 0) {
      return `${residue.id}`;
    }
    return '';
  }
  getResidueLabelTextColor(r: number, s: number) {
    return '#555555';
  }
  getResidueLabelBackgroundColor(r: number, s: number) {
    return 0x000000;
  }
}

export default Data;
