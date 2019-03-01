import * as flickrApi from '../flickr-api';
import * as eventDispatcherFactory from './event-dispatcher';

const eventImageDataChanged = 'on-image-data-changed';
const eventPageIndexChanged = 'on-page-index-changed';

const itemsPerPage = 10;

export function create() {
  const eventDispatcher = eventDispatcherFactory.create();

  let imageData = null;
  let pageIndex = NaN;

  loadData();

  return {
    hasImageData: () => imageData !== null,
    onImageDataChanged: (fn) => {
      eventDispatcher.on(eventImageDataChanged, fn);
    },
    getPageIndex: () => pageIndex,
    setPageIndex: (index) => {
      if (index === pageIndex) {
        return;
      }
      pageIndex = index;
      eventDispatcher.trigger(eventPageIndexChanged);
    },
    onPageIndexChanged: (fn) => {
      eventDispatcher.on(eventPageIndexChanged, fn);
    },
    getPageCount: () => {
      if (!Array.isArray(imageData)) {
        return 0;
      }
      return Math.ceil(imageData.length / itemsPerPage);
    },
    getCurrentPageItems: () => {
      if (!Array.isArray(imageData)) {
        return [];
      }
      return imageData.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
    },
    getImageDataById: (id) => {
      if (!Array.isArray(imageData)) {
        return null;
      }

      const result = imageData.filter(obj => obj.id === id)[0];
      if (typeof result === 'undefined') {
        return null;
      }
      return result;
    }
  };

  function loadData() {
    flickrApi.fetchImageList()
      .then(onDataLoaded)
      .catch(console.log);
  }

  function onDataLoaded(data) {
    imageData = data;
    pageIndex = 0;

    eventDispatcher.trigger(eventImageDataChanged);
    eventDispatcher.trigger(eventPageIndexChanged);
  }
}
