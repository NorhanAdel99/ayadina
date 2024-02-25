<template>
    <!-- <ui-main-title class="d-flex align-content-between justify-content-between">
        {{ $t("Notification") }} 
        <button @click="deleteNotify(notify.id)">  <font-awesome-icon
              />                حذف جميع الاشعارات
</button>
    </ui-main-title> -->
    <div  v-if="notifecation.length=== 0" class="text-center">
        {{  $t("no_notification") }}
    </div>
    <div class="row justify-content-center" v-else>
        <div class="col-md-8">
            <ui-main-title class="d-flex align-content-between justify-content-between">
        {{ $t("Notification") }} 
        <button @click="deleteAll()">
                         حذف جميع الاشعارات
</button>
    </ui-main-title>
           <ui-base-card>
            <transition-group name="fade">

            <div class="border-bottom pb-2 mb-2" v-for="notify in notifecation" :key="notify.id">
                <div v-if="notify.data.type">
                    <div class="d-flex align-content-between justify-content-between">
                        <NuxtLink  class="text-dark" :to="localePath('/profile')" ><p> {{ notify.data.message }} </p> </NuxtLink>
                    <small> {{notify.created_at  }}</small>
                    <button @click="deleteNotify(notify.id)">  <font-awesome-icon
                :icon="['fas', 'trash-can']"
                class="f-13 text-danger"
              /></button>
                </div>
            </div>
            </div>
            </transition-group>
     
           </ui-base-card>
        </div>
    </div>
    <Toast/>
</template>
<script>
import { useAuthStore } from "@/store/authStore";
export default {
    data(){
        return{
         axios: useNuxtApp().$axios,
         token:"",
         notifecation:[]
  
        }
    },
    mounted() {
    this.token = useAuthStore().user.token;
    this.GetNotifcaion();
    
  },
  methods:{
    GetNotifcaion(){
        this.axios.get('/notifications' ,{
            headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }).then((res)=>{
            this.notifecation =res.data.data.notifications.data
            console.log(this.notifecation)
        })
    },
    async deleteNotify(id) {
  try {
    const response = await this.$axios.delete(`/delete-notification/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
     if(response.data.key === 'success'){
        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 ,severity: 'info' });
        this.notifecation = this.notifecation.filter(notify => notify.id !== id);
       }
      else if(response.data.key === 'unauthenticated'){
        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 ,severity: 'warn' });
       }
       else if(response.data.key === 'fail'){
        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 ,severity: 'error' });
       }
  } catch (error) {
    this.$toast.add({ detail: `${error}`, life: 3000 ,severity: 'error' });

  }
},
async deleteAll() {
  try {
    const response = await this.$axios.delete("delete-notifications", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
     if(response.data.key === 'success'){
        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 ,severity: 'info' });
        this.notifecation = [];
       }
      else if(response.data.key === 'unauthenticated'){
        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 ,severity: 'warn' });
       }
       else if(response.data.key === 'fail'){
        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 ,severity: 'error' });
       }
  } catch (error) {
    this.$toast.add({ detail: `${error}`, life: 3000 ,severity: 'error' });

  }
}
  }
}
</script>
<style scoped>
button{
    border: none;
    background: transparent;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
