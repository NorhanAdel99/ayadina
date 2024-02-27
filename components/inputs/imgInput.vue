<template>

  <div class="position-relative" >
    <div v-if="imageUrl" @click="removeImage" class="removeSrc text-danger">
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </div>
    <label :for="id" class="base-image-input">
      <img v-if="imageUrl" :src="imageUrl" alt="Image Preview"  />
      <span v-if="!imageUrl" class="select">
        <font-awesome-icon icon="fa-solid fa-upload" />
      </span>
      <input type="file" @change="handleFileChange" hidden :id="id" :name="name"/>
    </label>

    <!-- <div v-else>
        <p>No image selected</p>
      </div> -->
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
    multiple:{
      type: Boolean,
      required: true,
    }
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
    handleFileChange(event) {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
          this.$emit("update:modelValue", reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        this.imageUrl = null;
        this.$emit("update:modelValue", null);
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
