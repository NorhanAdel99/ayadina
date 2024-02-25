import { defineStore } from 'pinia'
import axios from 'axios'
const baseURL = 'https://iadeena.com/api/'
// const userStore = useUserStore()
// const instance = axios.create({
//   baseURL: baseURL,
//   // timeout: 1000
// })
let data =  axios.get('https://iadeena.com/api/about').data
const STORE_NAME = 'bla'

export const useStore = defineStore('main', {
  state: () => ({
    settings: {
      fontSize: 14,
      tabSize: 2,
      zoomLevel: 0,
    },
    data: data
  }),
getters:{
  getData: (state) => state.data
//  console.log(getData);


},
  actions: {
    updateSettings(partialSettings) {
      this.settings = {
        ...this.settings,
        ...partialSettings,
      }
      localStorage.setItem(STORE_NAME, JSON.stringify(this.settings))
    },
  },
  // persist: true,
})

   // getters: {
  //    orders: (state)  => state.orders  
  //   //  orders(state) {
  //   //   return state.orders
  //   // },
  // },
  // actions: {
  //   async getIP({ commit }) {
  //     const ip = await this.$axios.$get("https://iadeena.com/api/");
  //     commit("SET_IP", ip);
  //   },
  // },
  // instance.interceptors.request.use(
  //   function (config) {
  //     // take token from pinia and add it in request header.
  //     if (userStore.token) {
  //       config.headers.Authorization = userStore.token
  //     }
  //     return config
  //   },
  //   function (error) {
  //     return Promise.reject(error)
  //   }
  // )