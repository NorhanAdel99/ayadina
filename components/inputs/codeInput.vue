<template>
  <div class="contain-otp flex-center mb-3">
    <v-otp-input ref="otpInput" input-classes="otp-input" separator="-" :num-inputs="4" :should-auto-focus="true"
      :is-input-num="true" :conditionalClass="['one', 'two', 'three', 'four']" :placeholder="['*', '*', '*', '*']"
      @on-change="handleOnChange" @on-complete="handleOnComplete" />
    <!-- @complete="completed = true"  -->
  </div>
</template>
<script>


import VOtpInput from 'vue3-otp-input';
export default {

  components: {VOtpInput },
  data() {
    return {
      localePath: useLocalePath(),
      axios: useNuxtApp().$axios,
      value : '',
      
    }
  },
  methods: {
    handleOnComplete(value) {
      console.log('OTP completed: ', value);

 
    },
    handleOnChange(value) {
      console.log('OTP changed: ', value);
    },
   
  }
}
</script>
