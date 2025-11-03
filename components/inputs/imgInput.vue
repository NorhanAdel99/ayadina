<template>
  <div class="position-relative">
    <div class="mb-2 font-bold text-center">
      <span class="m-end-5"> {{ $t('uploadImage') }}</span>
      <span class="text-danger">*</span>
    </div>
    <div v-if="imageUrl" @click="removeImage" class="removeSrc text-danger">
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </div>
    <label :for="id" class="base-image-input">
      <img v-if="imageUrl" :src="imageUrl" alt="Image Preview" loading="lazy" />
      <span v-if="!imageUrl" class="select">
        <font-awesome-icon icon="fa-solid fa-upload" />
      </span>
      <input type="file" @change="handleFileChange" hidden :id="id" :name="name" accept="image/*" />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    additionalValue: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
      default: null,
    },
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:modelValue", "removeImage"],

  data() {
    return {
      imageUrl: null,
    };
  },
  mounted() {
    this.imageUrl = this.modelValue;
  },
  methods: {
    
    handleFileChange(e) {
     
      const file = e.target.files[0];
      const reader = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
          // this.$emit("update:modelValue",  e.target.result);
          
        };
      } else {
        this.imageUrl = null;
        // this.$emit("update:modelValue", null);
      }
      console.log('this input change ')
      console.log(this.imageUrl)
    },
    validateImageFile(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif" , "image/jpg" , "image/webp"  , "image/avif" , "image/svg"]; // Specify exact MIME types
  if (allowedTypes.includes(file.type)) {
    return true;
  } else {
    this.$toast.add({ detail: this.$t("uploadImageError"), life: 3000, severity: "error" });
    return false; // Return false for invalid files
  }
},
    removeImage() {
      this.imageUrl = null;
      this.$emit("update:modelValue", null);
      this.$emit("removeImage", this.index); // Emit the name of the image
    },
  },
};
</script>
