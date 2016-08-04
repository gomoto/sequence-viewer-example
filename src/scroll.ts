import Scroller from './Scroller';
import state from './state';

var width = state.width - (state.stickyColumn ? state.stickyColumnWidth : 0);
var height = state.height - (state.stickyRow ? state.stickyRowHeight : 0);
var maxScroll = {
  x: state.maxResidues * state.residueWidth - width,
  y: 2 * state.residueHeight - height
};

var scroller = new Scroller(0, 0, maxScroll.x, maxScroll.y);

export default scroller;
