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
  getStickyRowFont(r: number) {
    return '10px monospace';
  }

  getStickyColumnValue(s: number) {
    return sequences[s].id;
  }
  getStickyColumnFont(s: number) {
    return '12px Helvetica, Arial, sans-serif';
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
  getResidueFont(r: number, s: number) {
    return 'bold 12px Helvetica, Arial, sans-serif';
  }
  getResidueLabelFont(r: number, s: number) {
    var residue = <Residue> sequences[s].getProperty('residues')[r];
    // if (residue.chainIndex === 0) {
    //   return 'bold 10px Helvetica, Arial, sans-serif';
    // }
    return '10px monospace';
  }
  getResidueTextColor(r: number, s: number) {
    var residue = <Residue> sequences[s].getProperty('residues')[r];
    return residue.isOn ? 0x000000 : residue.getProperty('color');
  }
  getResidueTextAlpha(r: number, s: number) {
    return 0.8;
  }
  getResidueLabelTextColor(r: number, s: number) {
    return 0x555555;
  }
  getResidueLabelTextAlpha(r: number, s: number) {
    return 0.5;
  }
  getResidueBackgroundColor(r: number, s: number) {
    var residue = <Residue> sequences[s].getProperty('residues')[r];
    return residue.getProperty('color');
  }
  getResidueBackgroundAlpha(r: number, s: number) {
    var residue = <Residue> sequences[s].getProperty('residues')[r];
    return residue.isOn ? 1 : 0;
  }
  getResidueLabelBackgroundColor(r: number, s: number) {
    return 0x000000;
  }
  getResidueLabelBackgroundAlpha(r: number, s: number) {
    return 0;
  }
}

export default Data;
