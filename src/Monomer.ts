import { Structure, Residue, Node } from 'atom';
import { SerializedResidue } from 'atom/lib/tree/Residue';
import { AminoAcid } from 'atom/lib/constants/AminoAcids';

export interface SerializedMonomer extends SerializedResidue {
  color: string;
  chainIndex: number;
}

class Monomer extends Residue {

  color: string;
  chainIndex: number;

  constructor(serializedMonomer: SerializedMonomer);
  constructor(id: string, aminoAcid: AminoAcid, chainIndex: number, color: string);
  constructor(idOrMonomer: string | SerializedMonomer, aminoAcid?: AminoAcid, chainIndex?: number, color?: string) {
    if (typeof idOrMonomer === 'object') {
      var serializedMonomer = idOrMonomer;
      super(serializedMonomer);
      this.chainIndex = serializedMonomer.chainIndex;
      this.color = serializedMonomer.color;
    } else {
      var id = idOrMonomer;
      super(id, aminoAcid, null);
      this.chainIndex = chainIndex;
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
      chainIndex: this.chainIndex,
      color: this.color
    };
  }

}

export default Monomer;
