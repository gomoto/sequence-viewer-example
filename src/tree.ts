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

const tree = new Tree();
tree.touchType = 'Residue';
addStructure(insulin);
addStructure(trp);
var residueCounts = tree.root.children.map((seq) => {
  return seq.countNodes('Residue');
});
tree.root.setProperty('max', Math.max(...residueCounts));

function addStructure(structure: any) {
  var structureNode = new Structure(structure.key);
  tree.root.add(structureNode);
  // Add residue indexing as a feature of Structure nodes!
  structureNode.setProperty('residues', []);
  structureNode.on('nodeAdded', (node: Node) => {
    if (node.type === 'Residue') {
      let residues = <Residue[]> structureNode.getProperty('residues');
      residues.push(<Residue> node);
    }
  });
  structure.chains.forEach((chain:any) => {
    var chainNode = new Chain(chain.name);
    structureNode.add(chainNode);
    chain.residues.forEach((residue:any) => {
      var residueNode = new Residue(residue.label, AminoAcids[aa.singleToName(residue.symbol)], 'C');
      residueNode.setProperty('color', '#0000ff');
      chainNode.add(residueNode);
    });
  });
}


export default tree;
