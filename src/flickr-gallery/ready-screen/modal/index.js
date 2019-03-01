import './styles.css';

let isActive = false;

export function show(imageUrl) {
  if (isActive) {
    return;
  }
  isActive = true;

  const div = document.createElement('div');
  div.innerHTML = createHtml(imageUrl);
  document.body.appendChild(div);

  const dialogNode = div.querySelector('.fg-modal-dialog');
  const imageContainerNode = div.querySelector('.fq-modal-image-container');
  const bgNode = div.querySelector('.fg-modal-bg');
  const closeButton = div.querySelector('.fg-modal-close-button');

  const onClose = () => {
    destroy();
  };

  bgNode.addEventListener('click', onClose, false);
  closeButton.addEventListener('click', onClose, false);

  const imagePreloader = document.createElement('div');
  imagePreloader.className = 'fg-modal-image-preloader';

  const img = document.createElement('img');
  const onImageLoaded = () => {
    const margin = 20;
    const imageAspectRatio = img.naturalWidth / img.naturalHeight;
    const maxWidth = document.documentElement.clientWidth - margin * 2;
    const maxHeight = document.documentElement.clientHeight - margin * 2;

    let width = Math.min(maxWidth, Math.floor(maxHeight * imageAspectRatio));

    dialogNode.style.width = `${width}px`;
    dialogNode.style.height = 'auto';

    imageContainerNode.appendChild(img);

    dialogNode.classList.add('fq-modal-is-ready');
  };
  img.addEventListener('load', onImageLoaded, false);
  img.src = imageUrl;
  imagePreloader.appendChild(img);
  document.body.appendChild(imagePreloader);

  function destroy() {
    img.removeEventListener('load', onImageLoaded, false);
    bgNode.removeEventListener('click', onClose, false);
    closeButton.removeEventListener('click', onClose, false);
    document.body.removeChild(imagePreloader);
    div.parentNode.removeChild(div);
    isActive = false;
  }
}

function createHtml() {
  return `
    <div class="fg-modal">
      <div class="fg-modal-bg"></div>
      <div class="fg-modal-dialog">
        <div class="fg-modal-loading-screen">
          <span>Loading...</span>
        </div>
        <div class="fq-modal-ready-screen">
          <div class="fq-modal-image-container"></div>
          <div class="fg-modal-close-button"></div>
        </div>
      </div>
    </div>
  `;
}
