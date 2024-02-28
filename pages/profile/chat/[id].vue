<template>
  <base-container>
    <ui-breadCrumb :to="localePath('/profile/chat')">
      <template v-slot:mainPage>المحادثه </template>
      <template v-slot:currentPage> تفاصيل المحادثه </template>
    </ui-breadCrumb>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <ui-base-card class="chatContiner">
          <div class="p-3">
            <div class="row">
              <div class="col-md-7">
                <div class="d-flex gap-2 align-items-center mb-3 sender">
                  <img src="@/assets/imgs/G2.png" a alt="" class="userImgc" />
                  <div class="containMessege">
                    messege
                    <div class="messege"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-end">
              <div class="col-md-7">
                <div class="d-flex gap-2 align-items-center mb-3 reciever">
                  <div class="containMessege ">
                    messege
                    <div class="messege"></div>
                  </div>
                  <img src="@/assets/imgs/G2.png" alt="" class="userImgc" />
                </div>
              </div>
            </div>
          </div>
          <div class="inputContainer p-2">
         
            <input type="text" class="flex-grow" placeholder="اكتب رسالتك.." @keyup.enter="sendMessage" />
            <ui-base-button mode="sendMsg main_btn sm">
              <font-awesome-icon :icon="['fas', 'paper-plane']" class="iconSend" />
              <span class="send"> ارسال </span>
            </ui-base-button>
          </div>
        </ui-base-card>
      </div>
    </div>
  </base-container>
</template>
<script>
export default {
  data() {
    return {
      localePath: useLocalePath()
    };
  }
}
</script>



