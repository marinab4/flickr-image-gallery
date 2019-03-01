import './styles.css';
import * as loadingScreen from './loading-screen';
import * as readyScreen from './ready-screen';
import * as stateFactory from './state';

const htmlTemplate = `
  <div class="fg-loading-screen">
    <span class="fg-loading-screen-loader">Loading...</span>
  </div>
  <div class="fg-ready-screen">
    <div class="fg-image-grid"></div>
    <div class="fg-pagination"></div>
  </div>
`;

export function setup() {
  const rootNode = document.querySelector('flickr-gallery');
  if (rootNode === null) {
    return;
  }

  rootNode.innerHTML = htmlTemplate;

  const state = stateFactory.create();

  loadingScreen.create(rootNode, state);
  readyScreen.create(rootNode, state);
}
