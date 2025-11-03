import { defineStore } from "pinia";
export const counterStore = defineStore("counter", {
  state: () => ({
    count: 1,
  }),
  getters: {
    countPlusOne() {
      return this.count + 1
    },
  },
  actions:{
    increase(){
      this.count--
    },
    decrease(){
      this.count++
    },
    $reset(){
      this.count = 1
    }
  }
});
