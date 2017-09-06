let getRecommendList;
let getNewSongs;
let getTopList;
let baseUrl;
let onlineMuiscUrl;
let getHotSearch;
let getSearchResults;
let getMultiSearchResults;
let getSongDetail;
/* global __DEV__ */
if (__DEV__) {
  baseUrl = '//127.0.0.1:3000';
  onlineMuiscUrl = '//music.163.com';
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
export {
  getRecommendList,
  getNewSongs,
  getTopList,
  getHotSearch,
  getSearchResults,
  getMultiSearchResults,
  getSongDetail
};
