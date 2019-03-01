import * as modal from '../modal';
import './styles.css';

export function setup(rootNode, state) {
  const node = rootNode.querySelector('.fg-image-grid');

  renderItems();

  state.onImageDataChanged(renderItems);
  state.onPageIndexChanged(renderItems);

  function renderItems() {
    getItems(node).forEach((el) => {
      el.removeEventListener('click', onItemClick, false);
    });

    const innerHTML = [];
    state.getCurrentPageItems().forEach((obj, i) => {
      innerHTML.push(getItemHtml(obj, i));
    });
    node.innerHTML = innerHTML.join('');

    getItems(rootNode).forEach((el) => {
      el.addEventListener('click', onItemClick, false);
    });
  }

  function onItemClick(event) {
    const imageId = event.currentTarget.getAttribute('data-id');
    modal.show(state.getImageDataById(imageId).urls.big);
  }
}

function getItems(rootNode) {
  return Array.from(rootNode.querySelectorAll('.fg-image-grid-item'));
}

function getItemHtml(data) {
  return `
    <div class="fg-image-grid-cell">
      <div class="fg-image-grid-item" data-id="${data.id}">
        <div class="fg-image-grid-img" style="background-image: url('${data.urls.thumb}')" title="${data.title}">
        </div>
      </div>
    </div>
  `;
}
