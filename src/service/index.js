import * as api from 'config/api';
import {
  fetch
} from 'config/fetch';
/*
 **@ 拉取首页推荐列表的信息
 */
var fetchRecommendList = () => {
  return fetch('GET', api.getRecommendList, {}).then((result) => {
    return result;
  });
};
/*
 **@ 拉取首页最新音乐的信息
 */
var fetchNewSongList = () => {
  return fetch('GET', api.getNewSongs, {}).then((result) => {
    return result;
  });
};
/*
 **@ 拉取排行榜信息
 */
var fetchTopList = (index) => {
  return fetch('GET', api.getTopList, {
    idx: index
  }).then((result) => {
    return result;
  });
};
/*
 **@ 拉取热门搜索（来自网易云音乐线上API）
 */
var fetchHotSearch = () => {
  return fetch('POST', api.getHotSearch, {
    params: 'TZxiajqEwm/OYmnCDUbrx/PRDxxjECOcYHeTIN4EEgA=',
    encSecKey: 'dfc3d48bd246c007ff9746445dc885df8fe27e704423daa7fdaeed1b526bf3586c2ffee7996ad3f46730005f193b29942022e8e378b90c33ef6dfed504f72fcd8fa39f84186ac5057293183c4d3a35da66ed249811ab6765fe19493d7d49feac62bd1a7562ce2344e1b2efe4cc1ae8d26bffb0f69b09e1e82fa57178a360abad'
  }).then((result) => {
    return result;
  });
};
/*
 **@ 搜索多项匹配
 */
var fetchMultiSearchResults = (keyword) => {
  return fetch('GET', api.getMultiSearchResults, {
    keywords: keyword
  }).then((result) => {
    return result;
  });
};
/*
 **@ 搜索歌曲
 */
var fetchSongSearchResults = (keyword) => {
  return fetch('GET', api.getSearchResults, {
    keywords: keyword
  }).then((result) => {
    return result;
  });
};
/*
 **@ 获取音乐详情
 */
var fetchSongDetail = (songId) => {
  return fetch('GET', api.getSongDetail, {
    ids: songId
  }).then((result) => {
    return result;
  });
};
/*
 **@ 获取音乐歌词
 */
var fetchSongLRC = (songId) => {
  return fetch('GET', api.getSongLRC, {
    id: songId
  }).then((result) => {
    return result;
  });
};
/*
 **@ 获取音乐地址
 */
var fetchSongAudioUrl = (songId) => {
  return fetch('GET', api.getSongAudioUrl, {
    id: songId
  }).then((result) => {
    return result;
  });
};
/*
 **@ 获取MV详情
 */
var fetchVideoDetail = (videoId) => {
  return fetch('GET', api.getVideoDetail, {
    mvid: videoId
  }).then((result) => {
    return result;
  });
};
/*
 **@ 获取MV评论
 */
var fetchMvComments = (id, offset = 0, limit = 20) => {
  return fetch('GET', api.getMvComments, {
    id: id,
    offset: offset,
    limit: limit
  }).then((result) => {
    return result;
  });
};
/*
 **@ 获取MV相似推荐
 */
var fetchMvRecommends = (id) => {
  return fetch('GET', api.getMvRecommend, {
    mvid: id
  }).then((result) => {
    return result;
  });
};
/*
 **@ 获取歌单详情
 */
var fetchPlayListDetail = (id) => {
  return fetch('GET', api.getPlayListDetail, {
    id: id
  }).then((result) => {
    return result;
  });
};
/*
 **@ 获取banner位置
 */
var fetchBannerList = () => {
  return fetch('GET', api.getBannerList, {}).then((result) => {
    return result;
  });
};
/*
 **@ 获取专辑信息
 */
var fetchAlbumDetail = (id) => {
  return fetch('GET', api.getAlbumDetail, {
    id: id
  }).then((result) => {
    return result;
  });
};

/*
 **@ 获取歌手热门信息
 */
var fetchArtistDetail = (id) => {
  return fetch('GET', api.getArtistDetail, {
    id: id
  }).then((result) => {
    return result;
  });
};

/*
 **@ 获取歌手专辑信息
 */
var fetchArtistAlbum = (options) => {
  return fetch('GET', api.getArtistAlbum, options).then((result) => {
    return result;
  });
};
/*
 **@ 获取歌手MV信息
 */
var fetchArtistMv = (options) => {
  return fetch('GET', api.getArtistMv, options).then((result) => {
    return result;
  });
};
/*
 **@ 获取歌手介绍信息
 */
var fetchArtistDesc = (id) => {
  return fetch('GET', api.getArtistDesc, { id: id }).then((result) => {
    return result;
  });
};

/*
 **@ 获取精品歌单
 */
var fetchHighQualityPlayList = (options) => {
  return fetch('GET', api.getHighQualityPlayList, options).then((result) => {
    return result;
  });
};
/*
 **@ 获取全部分类歌单
 */
var fetchClassifyPlayListData = (options) => {
  return fetch('GET', api.getClassifyPlayListData, options).then((result) => {
    return result;
  });
};

/*
 **@ 获取分类歌单标签
 */
var fetchClassifyPlayListCat = (options) => {
  return fetch('GET', api.getClassifyPlayListCat, options).then((result) => {
    return result;
  });
};

/*
 **@ 获取全部精品歌单
 */
var fetchHighQualityPlayListData = (options) => {
  return fetch('GET', api.getHighQualityPlayList, options).then((result) => {
    return result;
  });
};
export {
  fetchRecommendList,
  fetchNewSongList,
  fetchTopList,
  fetchHotSearch,
  fetchMultiSearchResults,
  fetchSongSearchResults,
  fetchSongDetail,
  fetchSongLRC,
  fetchSongAudioUrl,
  fetchVideoDetail,
  fetchMvComments,
  fetchMvRecommends,
  fetchPlayListDetail,
  fetchBannerList,
  fetchAlbumDetail,
  fetchArtistDetail,
  fetchArtistAlbum,
  fetchArtistMv,
  fetchArtistDesc,
  fetchHighQualityPlayList,
  fetchClassifyPlayListData,
  fetchClassifyPlayListCat,
  fetchHighQualityPlayListData
};
