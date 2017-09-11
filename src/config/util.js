export function _setLocalHistoryForCurrent(item) {
  let songListsHistory = localStorage.getItem('historyStack');
  songListsHistory = songListsHistory ? JSON.parse(songListsHistory) : [];
  // 如果id存在数组,先剔除,后push
  songListsHistory = songListsHistory.filter((val, idx) => {
    return val.song.id !== item.song.id;
  });
  songListsHistory.push(item);
  localStorage.setItem('historyStack', JSON.stringify(songListsHistory));
};
export function _removeLocalHistoryForCurrent(id) {
  let songListsHistory = localStorage.getItem('historyStack');
  songListsHistory = songListsHistory ? JSON.parse(songListsHistory) : [];
  // 如果id存在数组,先剔除,后push
  songListsHistory = songListsHistory.filter((val, idx) => {
    return val.song.id !== id;
  });
  // 修改本地存储
  localStorage.setItem('historyStack', JSON.stringify(songListsHistory));
  return songListsHistory;
};
