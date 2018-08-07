module.exports = data => {
  // remove keys point to undefined value
  const keys = Object.keys(data).filter(key => undefined !== data[key]);
  if (keys.length) {
    return '?' + keys.map(key => `${key}=${data[key]}`).join('&');
  } else {
    return '';
  }
};