export const loadMore = {
  directives: {
    'load-more': {
      bind: (el, binding) => {
        const windowHeight = window.screen.height;
        const scrollReducer = 150;
        let offset;
        let scrollTop;
        let height;
        let isTriggerEvent;
        el.addEventListener('touchmove', () => {
          offset = el.offsetTop;
          scrollTop = document.body.scrollTop;
          height = el.clientHeight;
          isTriggerEvent = (windowHeight + scrollTop >= offset + height + scrollReducer);
          touchMove();
        }, false);
        el.addEventListener('touchend', () => {
          touchEnd();
        }, false);
        const touchMove = () => {
          if (isTriggerEvent) {
            binding.value['start']();
          } else {
            return false;
          }
        };
        const touchEnd = () => {
          if (isTriggerEvent) {
            binding.value['end']();
          }
        };
      }
    }
  }
};

let isSupportImageType = (type) => {
  let imageType = `image/${type}`;
  let canvas = document.createElement('canvas');
  let base64Url = canvas.toDataURL(imageType);
  let isSupport = (base64Url.indexOf(imageType) > -1) ? 1 : 0;
  return isSupport;
};
let changeImageType = (imageUrl, type) => {
  let reg = /\.(\w+)$/;
  if (isSupportImageType(type) && imageUrl) {
    return {
      imageUrl: imageUrl.replace(reg, `.${type}`),
      imageType: type
    };
  } else {
    return {
      imageUrl: imageUrl,
      imageType: 'jpg'
    };
  }
};
export const getImageUrl = {
  methods: {
    getImageUrl(path, size = 40, type = 'jpg') {
      if (!path) {
        return false;
      } else if (/^\/static\/images/.test(path)) {
        return path;
      }
      let { imageUrl, imageType } = changeImageType(path, type);
      let prefix = `?imageView&thumbnail=${size}x0&quality=75&tostatic=0&type=${imageType}`;
      return `${imageUrl}${prefix}`;
    }
  }
};
export const replaceImageUrl = {
  tinyImageUrl(path, size = 40) {
    let prefix = `?imageView&thumbnail=${size}x0&quality=75&tostatic=0`;
    return `${path}${prefix}`;
  },
  isSupportImageType(type) {
    let imageType = `image/${type}`;
    let canvas = document.createElement('canvas');
    let base64Url = canvas.toDataURL(imageType);
    let isSupport = (base64Url.indexOf(imageType) > -1) ? 1 : 0;
    return isSupport;
  },
  //  查看浏览器是否支持webp格式的图片
  changeImageType(imageUrl, type) {
    let reg = /\.(\w+)$/;
    if (this.isSupportImageType(type) && imageUrl) {
      return imageUrl.replace(reg, `.${type}`);
    } else {
      return imageUrl;
    }
  }
};
