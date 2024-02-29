<template>
  <div>
    <label for="imageUpload">Select Multiple Images:</label>
    <input type="file" id="imageUpload" ref="imageInput" :name="name" multiple accept="image/*" @change="handleImageUpload">

    <div id="previewContainer">
      <div v-for="(image, index) in imagesArray" :key="index" class="image-preview">
        <img :src="image.image" class="preview-image" />
      
        <button @click="removeImage(index)">Remove</button>
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
      imagesArray:[], // Initialize with a copy of the prop
      myImgs: [],
    };
  },
  mounted(){
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
/* Add some styling to the preview images */
.image-preview {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.preview-image {
  max-width: 100px;
  max-height: 100px;
  margin-right: 10px;
}
</style>
