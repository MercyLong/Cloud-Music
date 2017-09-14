/**
 * 根据秒数计算多少分多少秒
 * @param {Int} timestamp
 */

const ComputedMinsAndSecond = (timestamp) => {
  var mins = parseInt(timestamp / 60);
  var seconds = parseInt(timestamp % 60);
  mins = mins < 10 ? `0${mins}` : mins;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${mins}:${seconds}`;
};

/*
@时间格式化过滤器
Y - fullyear
y - shortyear
M - month
d - day
D - week
H - hours
m - minutes
S - seconds
*/
const formatDate = (timestapm, format) => {
  if (format && timestapm) {
    var currentTime = new Date(timestapm);
    var o = {
      'M+': currentTime.getMonth() + 1, // month
      'd+': currentTime.getDate(), // day
      'h+': currentTime.getHours(), // hour
      'm+': currentTime.getMinutes(), // minute
      's+': currentTime.getSeconds(), // second
      'q+': Math.floor((currentTime.getMonth() + 3) / 3), // quarter
      'S': currentTime.getMilliseconds() // millisecond
    };

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (currentTime.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return format;
  };
};

const addMeasurement = (number, offset, word) => {
  let intNumber = parseInt(number);
  let integer = intNumber / Math.pow(10, offset);
  if (integer > 10) {
    let prefixNumber = integer.toFixed(1);
    return `${prefixNumber}${word}`;
  } else {
    return intNumber;
  }
};

export {
  ComputedMinsAndSecond,
  formatDate,
  addMeasurement
};
