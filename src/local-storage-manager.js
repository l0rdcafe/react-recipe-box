const localStorageManager = {
  set: obj => {
    const currState = JSON.stringify(obj);
    localStorage.setItem("recipe-item", currState);
  },
  get: () => {
    const currState = localStorage.getItem("recipe-item");
    return JSON.parse(currState);
  }
};

export default localStorageManager;
