const { default: Axios } = require("axios")

export const api = {
  getEndpoints: (callback) => {
    Axios({
      method: "get",
      url: `${process.env.VUE_APP_API}/endpoints`,
    }).then((response) => {
      callback(response.data)
    })
  },
  checkLoggedIn: async () => {
    return Axios.post(`${process.env.VUE_APP_API}/admin/login`).then(res => {
      return res.status
    })
  },
  getOne: (endpoint, nsfw, callback) => {
    Axios({
      method: "get",
      url: `${process.env.VUE_APP_API}/${nsfw ? "nsfw" : "sfw"}/${endpoint}`,
    }).then((response) => {
      callback(response.data)
    })
  }
}
