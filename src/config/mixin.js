export const loadMore = {
  directives: {
    'load-more': {
      bind: (el, binding) => {
        const windowHeight = window.screen.height;
        const scrollReducer = 0;
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
