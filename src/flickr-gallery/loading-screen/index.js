import './styles.css';

export function create(rootNode, state) {
  const node = rootNode.querySelector('.fg-loading-screen');

  state.onImageDataChanged(() => {
    if (state.hasImageData()) {
      node.style.display = 'none';
    } else {
      node.style.display = '';
    }
  });
}
