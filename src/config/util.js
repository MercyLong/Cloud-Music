export function _setLocalHistoryForCurrent(key, item) {
  let songListsHistory = localStorage.getItem(key);
  songListsHistory = songListsHistory ? JSON.parse(songListsHistory) : [];
  // 如果id存在数组,先剔除,后push

  songListsHistory = songListsHistory.filter((val, idx) => {
    return (val.id || val.song.id) !== item.song.id;
  });
  songListsHistory.push(item);
  localStorage.setItem(key, JSON.stringify(songListsHistory));
};
export function _removeLocalHistoryForCurrent(key, id) {
  let songListsHistory = localStorage.getItem(key);
  songListsHistory = songListsHistory ? JSON.parse(songListsHistory) : [];
  // 如果id存在数组,先剔除,后push
  songListsHistory = songListsHistory.filter((val, idx) => {
    return val.song.id !== id;
  });
  // 修改本地存储
  localStorage.setItem(key, JSON.stringify(songListsHistory));
  return songListsHistory;
};
export function _setCurrentSongInLocal(songInfo) {
  console.log(songInfo);
  if (songInfo.song) {
    localStorage.setItem('currentSong', JSON.stringify(songInfo.song));
  };
};

export function _setLocalSearchHistory(key, keyword) {
  let searchHistory = localStorage.getItem(key);
  searchHistory = searchHistory ? JSON.parse(searchHistory) : [];
  // 如果id存在数组,先剔除,后push
  searchHistory = searchHistory.filter((val, idx) => {
    return val !== keyword;
  });
  searchHistory.unshift(keyword);
  localStorage.setItem(key, JSON.stringify(searchHistory));
};
export function _removeLocalSearchHistory(key, keyword) {
  let songListsHistory = localStorage.getItem(key);
  songListsHistory = songListsHistory ? JSON.parse(songListsHistory) : [];
  // 如果id存在数组,先剔除,后push
  songListsHistory = songListsHistory.filter((val, idx) => {
    return val !== keyword;
  });
  // 修改本地存储
  localStorage.setItem(key, JSON.stringify(songListsHistory));
  return songListsHistory;
};
