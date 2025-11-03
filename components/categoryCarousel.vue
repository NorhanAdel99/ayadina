<template>
  <div class="contain_categories" :class="{ 'not_space': subCategories?.length < 3 }">
    <div v-for="category in subCategories" :key="category.id">
      <div
        @click="
          selectCategory(category, index, category.id),
            handleCategoryClick(category.id)
        "
        :class="[
          { active: category.id === id },
          'surface-border  text-center rounded-3 categoryTab',
          {
            singleCategory:
              subCategories.length === 1 ||
              subCategories.length === 2 ||
              subCategories.length === 3 ||
              subCategories.length === 4,
          },
        ]"
      >
        <span>{{ category.name }}</span> 
      </div>
    </div>
  </div>
</template>

<script>
import Tag from "primevue/tag";
import Carousel from "primevue/carousel";

export default {
  emits: ["selectCategory"],
  components: { Tag, Carousel },
  data() {
    return {
      products: null,
      activeIndex: null,
      axios: useNuxtApp().$axios,
      id: null,
      responsiveOptions: [
        {
          breakpoint: "1400px",
          numVisible: 6,
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
    selectCategory(category, index, id) {
      this.activeIndex = null;
      if (category.id === this.id) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
      }

      console.log(category.id);
    },
    handleCategoryClick(subCategoryId) {
      this.id = subCategoryId;
      this.$emit("selectCategory", this.id);
    },
  },

  mounted() {
    this.axios
      .get(`/sub-categories/${useRoute().params.id}`)
      .then((res) => {
        this.subCategories = res.data.data;
        console.log(this.subCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang="scss">
.categoryTab {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #12a7d8;
  cursor: pointer;
  background: #d5ebf2;
  height: 100%;
  font-weight: bold;
  font-size: 15px;
  padding: 10px 10px;
  flex-wrap: nowrap;
  white-space: nowrap;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    font-size: 13px;
  }
}
.tabImg {
  width: 35px;
  height: 35px;
}
.p-component {
  font-family: inherit !important;
}
.categoryTab {
  gap: 15px;
}
html[lang="en"] .categoryTab {
  flex-direction: row !important;
}
// .p-carousel-item {
//   max-width: 189px;
// }
.p-carousel-items-container {
  display: flex;
  flex-direction: row-reverse;
  direction: rtl;
}

html[lang="ar"] .p-carousel-items-content {
  direction: rtl;
}
html[lang="en"] .p-carousel-items-container {
  flex-direction: unset;
  direction: ltr !important;
}
.p-carousel-item .singleCategory {
  min-width: 220px;
  margin: auto !important;
  min-height: 100% !important;
  width: 200px;
}
.fixed_width {
  // .p-carousel-item .singleCategory {
  //   max-width: 90% !important;
  // margin: 0 10px ;
  //}
}
.contain_categories {
  display: flex;

  align-items: center;
  gap: 10px;
  overflow-x: auto;
}
</style>
