<template>
  <AppLabel :for="name" class="cursor-pointer" :name="name"
    ><slot></slot>
    <input :id="name" type="file" class="hidden" @change="previewFile" />
    <div v-if="src" class="flex flex-col justify-center items-center">
      <div>Prévisualisation</div>
      <img :src="src" alt="preview de l'image" class="w-32 h-32 rounded-full" />
    </div>
  </AppLabel>
</template>

<script>
export default {
  name: 'ProfilePictureUpdate',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      src: '',
    }
  },
  methods: {
    previewFile(event) {
      const picture = event.target.files[0]
      this.$emit('file', picture)

      if (!picture) {
        this.src = ''
        return
      }

      this.src = URL.createObjectURL(picture)
    },
  },
}
</script>
