import { Structure, Residue, Node } from 'atom';
import { SerializedResidue } from 'atom/lib/tree/Residue';
import { AminoAcid } from 'atom/lib/constants/AminoAcids';

export interface SerializedMonomer extends SerializedResidue {
  color: string;
}

class Monomer extends Residue {

  color: string;

  constructor(serializedMonomer: SerializedMonomer);
  constructor(id: string, aminoAcid: AminoAcid, color: string);
  constructor(idOrMonomer: string | SerializedMonomer, aminoAcid?: AminoAcid, color?: string) {
    if (typeof idOrMonomer === 'object') {
      var serializedMonomer = idOrMonomer;
      super(serializedMonomer);
      this.color = serializedMonomer.color;
    } else {
      var id = idOrMonomer;
      super(id, aminoAcid, null);
      this.color = color;
    }
    this.type = 'Monomer';
  }

  serialize(): SerializedMonomer {
    return {
      id: this.id,
      type: this.type,
      isOn: this.isOn,
      aminoAcid: this.aminoAcid.name,
      ss: this.ss,
      color: this.color
    };
  }

}

export default Monomer;
