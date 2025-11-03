 <template>
      <div class="flex-center gap-10 flex-wrap mb-3">
          <ui-base-button link :to="path('/profile/specialOrders')" mode="btn main_btn transparent_btn border-0 shadow profileTab">
              {{ $t("MySpecificRequests") }} 
          </ui-base-button>
          <ui-base-button link :to="path('/profile/Rate')" mode="btn main_btn transparent_btn border-0 shadow profileTab">
              {{ $t("myRates") }} 
          </ui-base-button>
          <ui-base-button link :to="path('/profile/chat')"  mode="btn main_btn transparent_btn border-0 shadow profileTab">
              {{ $t("conversation") }} 
          </ui-base-button>
          <ui-base-button link :to="path('/profile/settings')" mode=" btn main_btn transparent_btn border-0 shadow profileTab">
              {{ $t("Settings") }} 
  
          </ui-base-button>
      </div>
  </template>

<script>
export default {
  data() {
    return {
      path: useLocalePath()
    }
}
}
</script>
<style scoped>
.main_btn{
    border: unset !important
}
</style>