 <template>
      <div class="flex-center gap-10 flex-wrap mb-3">
          <ui-base-button link :to="localePath('/profile/specialOrders')" mode="btn main_btn transparent_btn border-0 shadow profileTab">
              {{ $t("My_specific_requests") }} 
          </ui-base-button>
          <ui-base-button link :to="localePath('/profile/Rate')" mode="btn main_btn transparent_btn border-0 shadow profileTab">
              {{ $t("myRates") }} 
          </ui-base-button>
          <ui-base-button link :to="localePath('/profile/chat')"  mode="btn main_btn transparent_btn border-0 shadow profileTab">
              {{ $t("conversation") }} 
          </ui-base-button>
          <ui-base-button link :to="localePath('/profile/settings')" mode=" btn main_btn transparent_btn border-0 shadow profileTab">
              {{ $t("Settings") }} 
  
          </ui-base-button>
      </div>
  </template>
<style scoped>
.main_btn{
    border: unset !important
}
</style>