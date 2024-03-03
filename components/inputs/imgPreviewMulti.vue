<template>
  <div>


    <div id="previewContainer" class="d-flex align=items-center gap-10 my-2">
      <label for="imageUpload" class="base-image-input">
      <input
        type="file"
        id="imageUpload"
        ref="imageInput"
        :name="name"
        multiple
        accept="image/*"
        @change="handleImageUpload"
        hidden
      />
      <span class="select">
        <font-awesome-icon icon="fa-solid fa-upload" />
      </span>
    </label>
      <div
        v-for="(image, index) in imagesArray"
        :key="index"
        class="base-image-input"
      >
        <img :src="image.image" class="preview-image" />

        <!-- <button @click="removeImage(index)">Remove</button> -->
        <!-- <span class="select"  @click="removeImage(index)">
        <font-awesome-icon icon="fa-solid fa-upload" />
      </span> -->
        <div class="removeSrc text-danger" @click="removeImage(index)">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: Array,
    name: {
      type: String,
    },
  },
  data() {
    return {
      imagesArray: [], // Initialize with a copy of the prop
      myImgs: [],
    };
  },
  mounted() {
    this.imagesArray = this.images;
    this.myImgs = this.images;
  },
  methods: {
    handleImageUpload() {
      const input = this.$refs.imageInput;
      const files = input.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        this.myImgs.push(file);

        reader.onload = (e) => {
          this.imagesArray.push({
            image: e.target.result,
            name: `Image ${this.imagesArray.length + 1}`,
          });
          // this.imagesArray.push(...this.images)

          // Emit a custom event with the updated images array
          this.$emit("update", this.myImgs);
          // this.$emit("updateMyImgs", this.myImgs);
        };

        reader.readAsDataURL(file);
      }
    },
    removeImage(index) {
      this.imagesArray.splice(index, 1);
      // Emit a custom event with the updated images array after removal
      this.$emit("update", this.imagesArray);
    },
  },
};
</script>

<style scoped>
.base-image-input img {
  border-radius: 20px;
  object-fit: cover;
}
</style>
