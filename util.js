function getObjFromLS(key) {
  return JSON.parse(getFromLocalStorage(key));
}

function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function saveObjToLS(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}
