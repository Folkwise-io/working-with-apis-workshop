const axios = require("axios");

const get = (url) => axios.get(url)

module.exports = {
  get
}