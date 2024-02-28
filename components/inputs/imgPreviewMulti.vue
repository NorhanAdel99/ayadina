
<template>
  
  <div>
    <label for="imageUpload">Select Multiple Images:</label>
    <input type="file" id="imageUpload" ref="imageInput" :name="name" multiple accept="image/*" @change="handleImageUpload">

    <div id="previewContainer">

      <div v-for="(preview, index) in imagePreviews" :key="index" class="image-preview">
        <img :src="preview.url" class="preview-image" />
        <input v-model="preview.name" placeholder="Image Name" />
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
      imagePreviews: [],
    };

  },

  methods: {
    handleImageUpload() {
  const input = this.$refs.imageInput;
  const files = input.files;

  // Display preview for each selected image
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.imagePreviews.push({
        url: e.target.result,
        name: `Image ${this.imagePreviews.length + 1}`, // Default name, you can customize it
      });

      // Emit a custom event with the updated images array
      this.$emit('update:images', this.imagePreviews);
    };

    reader.readAsDataURL(file);
  }
},
  

    removeImage(index) {
      this.imagePreviews.splice(index, 1);
      // Emit a custom event with the updated images array after removal
      this.$emit('update:images', this.imagePreviews);
      
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

