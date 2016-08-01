import { GridData } from 'sequence-viewer';

import {
  Structure,
  Chain,
  Residue,
  AminoAcids,
  Tree
} from 'atom';

import tree from './tree';

const sequences = <Structure[]> tree.root.children;

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
    return <number> tree.root.getProperty('max');
  }
  getResidueCount(s: number) {
    return sequences[s].countNodes('Residue');
  }


  showLabels(s: number) {
    return sequences[s].getProperty('labels');
  }


  getResidue(r: number, s: number) {
    var residue = <Residue> sequences[s].getProperty('residues')[r];
    return residue.aminoAcid.single;
  }
  getResidueTextColor(r: number, s: number) {
    var residue = <Residue> sequences[s].getProperty('residues')[r];
    return residue.isOn ? '#ffffff' : residue.getProperty('color');
  }
  getResidueBackgroundColor(r: number, s: number) {
    var residue = <Residue> sequences[s].getProperty('residues')[r];
    return residue.isOn ? residue.getProperty('color') : '';
  }


  getResidueLabel(r: number, s: number) {
    var residue = <Residue> sequences[s].getProperty('residues')[r];
    // if (residue.chainIndex === 0) {
    //   return residue.parent.id;
    // }
    // if (residue.chainIndex % 2 === 1) {
    //   return '';
    // }
    return `${residue.number}`;
  }
  getResidueLabelTextColor(r: number, s: number) {
    return '#555555';
  }
  getResidueLabelBackgroundColor(r: number, s: number) {
    return 0x000000;
  }
}

export default Data;
