import { Structure, Residue, Node } from 'atom';
import { SerializedStructure } from 'atom/lib/tree/Structure';
import Monomer from './Monomer';

export interface SerializedSequence extends SerializedStructure {}

class Sequence extends Structure {

  residues: Monomer[];

  constructor(serializedSequence: SerializedSequence);
  constructor(id: string);
  constructor(idOrSequence: string | SerializedSequence) {
    if (typeof idOrSequence === 'object') {
      var serializedSequence = idOrSequence;
      super(serializedSequence);
    } else {
      var id = idOrSequence;
      super(id);
    }
    this.type = 'Sequence';

    // index monomers as they are added.
    // this provides monomer indexing across chains.
    this.residues = [];
    this.on('nodeAdded', (node: Node) => {
      if (node.type === 'Monomer') {
        this.residues.push(<Monomer> node);
      }
    });
  }

  serialize(): SerializedSequence {
    return {
      id: this.id,
      type: this.type,
      isOn: this.isOn
    };
  }

}

export default Sequence;
