<template>
  <Carousel
    :value="subCategories"
    :numVisible="6"
    :numScroll="1"
    :responsiveOptions="responsiveOptions"
    class="mb-3"
  >
    <template #item="slotProps">
      <div
        @click="selectCategory(slotProps.data , slotProps.index)"
        :class="[{active: activeIndex === slotProps.index}, 'surface-border m-2 text-center py-3 main_border p-2 rounded-3 categoryTab']"

      >
        <h6 class="mb-1">{{ slotProps.data.name }}</h6>
        <img :src="slotProps.data.image" alt="" class="tabImg" />
      </div>
      <!-- <Button> dwdhoui</Button> -->
    </template>
  </Carousel>
</template>

<script>
import Tag from "primevue/tag";
import Carousel from "primevue/carousel";
// import Button from 'primevue/Button'
export default {
  emits: ["selectCategory"],
  components: { Tag, Carousel },
  data() {
    return {
      products: null,
      activeIndex: null,
      axios: useNuxtApp().$axios,
      responsiveOptions: [
        {
          breakpoint: "1400px",
          numVisible: 4,
          numScroll: 1,
        },
        {
          breakpoint: "1199px",
          numVisible: 3,
          numScroll: 1,
        },
        {
          breakpoint: "767px",
          numVisible: 2,
          numScroll: 1,
        },
        {
          breakpoint: "575px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
      subCategories: [],
    };
  },
  methods: {
    // getSeverity(status) {
    //     switch (status) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // }

    selectCategory(category , index) {
      // Add the active class to the clicked category
      this.activeIndex = index;

      // Emit the selected category ID
      this.$emit("selectCategory", category.id);
    },
  },
  mounted() {
    this.axios
      .get(`/sub-categories/${useRoute().params.id}`)
      .then((res) => {
        console.log(res.data.data);
        this.subCategories = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
