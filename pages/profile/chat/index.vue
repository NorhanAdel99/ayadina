<template>
  <ui-main-title> الملف الشخصي </ui-main-title>
  <profile-tabs></profile-tabs>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <ui-base-card>
        <!-- '/subCategory/'+content.id -->
        <NuxtLink
          :to="localePath('/profile/chat/' + `${room.id}`)"
          v-for="room in rooms"
          :key="room.id"
          class="mb-3 border-bottom pb-3 text-dark d-block"
        >
        <template v-if="room.members && room.members.length > 0">
          <div class="d-flex gap-10 mb-3">
            <img :src="room.members[0].image" class="circleImg" />
            <div>
              <h6 class="mb-1">{{ room.members[0].name }}</h6>
              <!-- <p>{{ room.members[0].id }}</p> -->
            </div>
          </div>
          </template>
          <!-- rate -->
          <p class="text-muted">
            <img :src="room.last_message_body " class="circleImg" />
                            <!-- {{ room.last_message_body }} -->
                        </p>
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
      rooms: [
        // {
        //     id: 'c1',
        //     name: 'طارق محمد ',
        //     rateDate: '12/12/2023',
        //     description: 'هذا النص مثال لنص ممكن ان يستبدل هذا النص مثال لنص ممكن ان يستبدل هذا النص مثال لنص ممكن ان يستبدل ل',
        //     img: new URL('../../assets/imgs/logo.png', import.meta.url)
        // },
        // {
        //     id: 'c2',
        //     name: 'طارق  احمد ',
        //     rateDate: '12/12/2023',
        //     description: 'هذا النص مثال لنص ممكن ان يستبدل هذا النص مثال لنص ممكن ان يستبدل هذا النص مثال لنص ممكن ان يستبدل ل',
        //     img: new URL('../../assets/imgs/sport.png', import.meta.url)
        // },
        // {
        //     id: 'c3',
        //     name: 'طارق هاني ',
        //     rateDate: '12/12/2023',
        //     description: 'هذا النص مثال لنص ممكن ان يستبدل هذا النص مثال لنص ممكن ان يستبدل هذا النص مثال لنص ممكن ان يستبدل ل',
        //     img: new URL('../../assets/imgs/sport.png', import.meta.url)
        // }
      ],
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
        console.log(this.rooms)
    
      });
  },
};
</script>
