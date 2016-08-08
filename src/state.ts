import {
  Tree,
  Chain,
  AminoAcids
} from 'atom';
import Sequence from './Sequence';
import Monomer from './Monomer';

import insulin from './sequences/4ins';
import trp from './sequences/1l2y';

class State {

  tree: Tree;

  width = 804;
  height = 400;

  residueWidth = 12;
  residueHeight = 16;
  labelHeight = 12;
  stickyRow = true;
  stickyRowHeight = 16;
  stickyColumn = true;
  stickyColumnWidth = 80;
  gridLines = true;
  gridLineColor = '#eeeeee';
  labels = true;

  // track longest sequence
  maxResidues = 0

  constructor() {
    this.initializeTree();
  }

  // Build ATOM tree.
  initializeTree() {
    this.tree = new Tree();
    this.tree.touchType = 'Monomer';
    this.tree.touchOuterDepth = 1;
    this.addStructure(trp);
    this.addStructure(insulin);
  }

  get sequences() {
    return <Sequence[]> this.tree.root.children;
  }

  // Add sequence and recalculate longest sequence.
  addStructure(structure: any) {
    var sequenceNode = new Sequence(structure.key);
    this.tree.root.add(sequenceNode);
    structure.chains.forEach((chain: any) => {
      var chainNode = new Chain(chain.name);
      sequenceNode.add(chainNode);
      chain.residues.forEach((residue: any, chainIndex: number) => {
        var monomerNode = new Monomer(residue.label, AminoAcids[residue.symbol], chainIndex, '#0000ff');
        chainNode.add(monomerNode);
      });
    });

    console.log('Calculating maximum sequence length...');
    if (sequenceNode.residues.length > this.maxResidues) {
      this.maxResidues = sequenceNode.residues.length;
    }
    console.log(this.maxResidues);
  }
};

export default new State();
