module.exports = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1000);
  }, 1000);
});
