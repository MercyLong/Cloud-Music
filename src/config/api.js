let getRecommendList;
let getNewSongs;
let getTopList;
let baseUrl;
let onlineMuiscUrl;
let getHotSearch;
let getSearchResults;
let getMultiSearchResults;
let getSongDetail;
let getSongLRC;
let getSongAudioUrl;
let getVideoDetail;
let getMvRecommend;
let getMvComments;
/* global __DEV__ */
if (__DEV__) {
  baseUrl = 'api';
  onlineMuiscUrl = '';
} else {
  baseUrl = 'XXX.com';
}
getRecommendList = `${baseUrl}/personalized`;
getNewSongs = `${getRecommendList}/newsong`;
getTopList = `${baseUrl}/top/list`;
getHotSearch = `${onlineMuiscUrl}/weapi/search/hot`;
getSearchResults = `${baseUrl}/search`;
getMultiSearchResults = `${getSearchResults}/multimatch`;
getSongDetail = `${baseUrl}/song/detail`;
getSongLRC = `${baseUrl}/lyric`;
getSongAudioUrl = `${baseUrl}/music/url`;
getVideoDetail = `${baseUrl}/mv`;
getMvRecommend = `${baseUrl}/simi/mv`;
getMvComments = `${baseUrl}/comment/mv`;
export {
  getRecommendList,
  getNewSongs,
  getTopList,
  getHotSearch,
  getSearchResults,
  getMultiSearchResults,
  getSongDetail,
  getSongLRC,
  getSongAudioUrl,
  getVideoDetail,
  getMvRecommend,
  getMvComments
};
