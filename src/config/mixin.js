export const loadMore = {
  directives: {
    'load-more': {
      bind: (el, binding) => {
        let windowHeight = window.screen.height;
        let height;
        let setTop;
        let paddingBottom;
        let marginBottom;
        let requestFram;
        let oldScrollTop;
        let scrollEl;
        let heightEl;
        let scrollType = el.attributes.type && el.attributes.type.value;
        let scrollReduce = 200;
        if (scrollType === 2) {
          scrollEl = el;
          heightEl = el.children[0];
        } else {
          scrollEl = document.body;
          heightEl = el;
        }

        el.addEventListener('touchstart', () => {
          height = heightEl.clientHeight;
          setTop = el.offsetTop;
          paddingBottom = 0;
          marginBottom = 0;
        }, false);

        el.addEventListener('scroll', () => {
          loadMore();
        }, false);

        el.addEventListener('touchend', () => {
          oldScrollTop = scrollEl.scrollTop;
          moveEnd();
        }, false);

        const moveEnd = () => {
          requestFram = requestAnimationFrame(() => {
            if (scrollEl.scrollTop !== oldScrollTop) {
              oldScrollTop = scrollEl.scrollTop;
              moveEnd();
            } else {
              cancelAnimationFrame(requestFram);
              height = heightEl.clientHeight;
              loadMore();
            };
          });
        };

        const loadMore = () => {
          if (scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
            binding.value['end']();
          };
        };
      }
    }
  },
  methods: {
    loadStart() {
      this.loadText = '松开刷新';
    },
    loadCancel() {
      this.loadText = '上拉加载';
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
