import { Structure, Residue, Node } from 'atom';
import { SerializedStructure } from 'atom/lib/tree/Structure';
import Monomer from './Monomer';

export interface SerializedSequence extends SerializedStructure {
  areLabelsVisible: boolean;
}

class Sequence extends Structure {

  areLabelsVisible: boolean;
  residues: Monomer[];

  constructor(serializedSequence: SerializedSequence);
  constructor(id: string, areLabelsVisible: boolean);
  constructor(idOrSequence: string | SerializedSequence, areLabelsVisible?: boolean) {
    if (typeof idOrSequence === 'object') {
      var serializedSequence = idOrSequence;
      super(serializedSequence);
      this.areLabelsVisible = serializedSequence.areLabelsVisible;
    } else {
      var id = idOrSequence;
      super(id);
      this.areLabelsVisible = areLabelsVisible;
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
      isOn: this.isOn,
      areLabelsVisible: this.areLabelsVisible
    };
  }

}

export default Sequence;
