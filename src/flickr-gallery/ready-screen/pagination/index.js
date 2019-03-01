import './styles.css';

export function setup(rootNode, state) {
  const node = rootNode.querySelector('.fg-pagination');

  renderItems();
  updateSelectedItem();

  state.onImageDataChanged(renderItems);
  state.onPageIndexChanged(updateSelectedItem);

  function renderItems() {
    getItems(node).forEach((el) => {
      el.removeEventListener('click', onItemClick, false);
    });

    const pageCount = state.getPageCount();
    const innerHTML = [];
    for (let i = 0; i < pageCount; i++) {
      innerHTML.push(getItemHtml(i));
    }
    node.innerHTML = innerHTML.join('');
    node.querySelectorAll('.fg-pagination-item').forEach((el) => {
      el.addEventListener('click', onItemClick, false);
    });
  }

  function updateSelectedItem() {
    const selectedIndex = state.getPageIndex();
    getItems(node).forEach((el, itemIndex) => {
      if (itemIndex !== selectedIndex) {
        el.classList.remove('fg-pagination-item-selected');
      } else {
        el.classList.add('fg-pagination-item-selected');
      }
    });
  }

  function onItemClick(event) {
    const index = parseInt(event.currentTarget.getAttribute('data-index'), 10);
    state.setPageIndex(index);
  }
}

function getItemHtml(index) {
  return `
    <div class="fg-pagination-item" data-index="${index}">
      <div class="fg-pagination-item-title">${index + 1}</div>
    </div>
  `;
}

function getItems(rootNode) {
  return Array.from(rootNode.querySelectorAll('.fg-pagination-item'));
}
