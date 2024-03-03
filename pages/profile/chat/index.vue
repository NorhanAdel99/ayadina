<template>
  <ui-main-title> الملف الشخصي </ui-main-title>
  <profile-tabs></profile-tabs>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <ui-base-card>
        <!-- '/subCategory/'+content.id -->
        <NuxtLink :to="localePath('/profile/chat/' + `${room.id}`)" v-for="room in rooms" :key="room.id"
          class="mb-3 border-bottom pb-3 text-dark d-block">
        
          <template v-if="room.members && room.members.length > 0">
            <div class="d-flex gap-10 mb-3 align-items-center">
              <img :src="room.members[0].image" class="circleImg">
              <div>
                <h6 class="mb-1">{{ room.members[0].name }}</h6>

                <p>{{ room.last_message_created_dt }}</p>
              </div>
            </div>
            
            <img v-if="room.last_message_body.type === 'file' " :src="room.last_message_body"
              class="roomImg" />
            <p class="text-muted" v-if="room.last_message_body.type === 'text' || room.last_message_body.type !== 'file' || room.last_message_body === ''">
              {{ room.last_message_body }}
            </p>
          </template>
          <!-- rate -->


        </NuxtLink>
      </ui-base-card>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "@/store/authStore.js";
export default {
  data() {
    return {
      visible: false,
      visibleCertainModal: false,
      localePath: useLocalePath(),
      vtype: String,
      rooms: [],
    };
  },
  mounted() {
    this.token = useAuthStore().token;
    console.log(this.token);
    this.$axios
      .get("/get-rooms", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((res) => {
        this.rooms = res.data.data.rooms;


      });
  },
};
</script>
<style scoped>
/* img[src='']{
  display: none;
} */
</style>
