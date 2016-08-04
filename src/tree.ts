// Build ATOM tree.

import {
  Structure,
  Chain,
  Residue,
  AminoAcids,
  Node,
  Tree,
  aa
} from 'atom';

import insulin from './sequences/4ins';
import trp from './sequences/1l2y';

import Sequence from './Sequence';
import Monomer from './Monomer';
import state from './state';


const tree = new Tree();
tree.touchType = 'Monomer';
tree.touchOuterDepth = 1;


addStructure(trp);
addStructure(insulin);


// Add sequence and recalculate longest sequence
function addStructure(structure: any) {
  var sequenceNode = new Sequence(structure.key, false);
  tree.root.add(sequenceNode);
  structure.chains.forEach((chain: any) => {
    var chainNode = new Chain(chain.name);
    sequenceNode.add(chainNode);
    chain.residues.forEach((residue: any, chainIndex: number) => {
      var monomerNode = new Monomer(residue.label, AminoAcids[residue.symbol], chainIndex, '#0000ff');
      chainNode.add(monomerNode);
    });
  });

  console.log('Calculating maximum sequence length...');
  if (sequenceNode.residues.length > state.maxResidues) {
    state.maxResidues = sequenceNode.residues.length;
  }
  console.log(state.maxResidues);
}


export default tree;
