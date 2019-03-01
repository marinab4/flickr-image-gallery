const baseUrl = 'https://api.flickr.com/services/rest/';
const apiKey = '24bbc792e21caf756db53553600018f9';

const defaultSearchTag = 'positano';
const defaultItemsPerPage = 50;

export function fetchImageList(searchTag, itemsPerPage) {
  if (typeof searchTag === 'undefined') {
    searchTag = defaultSearchTag;
  }

  if (isNaN(itemsPerPage)) {
    itemsPerPage = defaultItemsPerPage;
  }

  return new Promise((resolve, reject) => {
    const query = [
      'method=flickr.photos.search',
      `api_key=${apiKey}`,
      `tags=${searchTag}`,
      `per_page=${itemsPerPage}`,
      'format=json',
      'nojsoncallback=1'
    ].join('&');

    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(response => response.json())
      .then((data) => {
        if (data.stat === 'ok') {
          return data.photos.photo;
        }
        throw new Error('Incorrect Flickr API response: ' + JSON.stringify(data));
      })
      .then(list => list.map(imageData => getImageDetails(imageData)))
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

// see https://www.flickr.com/services/api/misc.urls.html
function getImageDetails(rawImageData) {
  const {
    id: imageId,
    farm: farmId,
    server: serverId,
    title,
    secret
  } = rawImageData;

  const constructUrl = (imageId, farmId, serverId, secret, imageSize) =>
    `https://farm${farmId}.staticflickr.com/${serverId}/${imageId}_${secret}_${imageSize}.jpg`;

  return {
    id: imageId,
    title,
    urls: {
      thumb: constructUrl(imageId, farmId, serverId, secret, 'm'),
      big: constructUrl(imageId, farmId, serverId, secret, 'h')
    }
  };
}
