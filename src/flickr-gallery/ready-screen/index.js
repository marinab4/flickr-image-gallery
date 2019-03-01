import './styles.css';
import * as pagination from './pagination';
import * as imageGrid from './image-grid';

export function create(rootNode, state) {
  const node = rootNode.querySelector('.fg-ready-screen');

  pagination.setup(rootNode,state);
  imageGrid.setup(rootNode,state);

  updateOnImageDataChanged();
  state.onImageDataChanged(updateOnImageDataChanged);

  function updateOnImageDataChanged() {
    if (!state.hasImageData()) {
      node.style.display = 'none';
    } else {
      node.style.display = '';
    }
  }
}
