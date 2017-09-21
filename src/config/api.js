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
let getPlayListDetail;
let getBannerList;
let getAlbumDetail;
let getArtistDetail;
let getArtistAlbum;
let getArtistMv;
let getArtistDesc;
let getHighQualityPlayList;
let getClassifyPlayListData;
let getClassifyPlayListCat;
/* global __DEV__ */
if (__DEV__) {
  baseUrl = '/api';
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
getPlayListDetail = `${baseUrl}/playlist/detail`;
getBannerList = `${baseUrl}/banner`;
getAlbumDetail = `${baseUrl}/album`;
getArtistDetail = `${baseUrl}/artists`;
getArtistAlbum = `${baseUrl}/artist/album`;
getArtistMv = `${baseUrl}/artist/mv`;
getArtistDesc = `${baseUrl}/artist/desc`;
getHighQualityPlayList = `${baseUrl}/top/playlist/highquality`;
getClassifyPlayListData = `${baseUrl}/top/playlist`;
getClassifyPlayListCat = `${baseUrl}/playlist/catlist`;
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
  getMvComments,
  getPlayListDetail,
  getBannerList,
  getAlbumDetail,
  getArtistDetail,
  getArtistAlbum,
  getArtistMv,
  getArtistDesc,
  getHighQualityPlayList,
  getClassifyPlayListData,
  getClassifyPlayListCat
};
