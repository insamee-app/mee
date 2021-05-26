<template>
  <AppLabel :for="name" class="cursor-pointer" :name="name"
    ><slot></slot>
    <input
      :id="name"
      type="file"
      class="hidden"
      accept="image/png, image/jpg, image/jpeg"
      @change="previewFile"
    />
    <div v-if="src" class="flex flex-col justify-center items-center mt-4">
      <div>Prévisualisation</div>
      <div
        class="w-32 h-32 overflow-hidden rounded-full flex flex-row justify-center items-center"
      >
        <img :src="src" alt="preview de l'image" />
      </div>
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
    return { loading: false, src: '' }
  },
  methods: {
    previewFile(event) {
      const picture = event.target.files[0]

      if (!picture) {
        this.$emit('file', picture)
        this.src = ''
        return
      }

      const img = new Image()
      img.src = URL.createObjectURL(picture)
      img.onload = this.onLoad(img, picture.name, picture.size).bind(this)
    },
    onLoad(img, name, size) {
      const SERVER_SIZE = 60_000
      const MAX_WIDTH = 256
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      return function () {
        const scale = MAX_WIDTH / img.width
        const height = img.height * scale

        canvas.setAttribute('width', MAX_WIDTH)
        canvas.setAttribute('height', height)
        ctx.drawImage(img, 0, 0, MAX_WIDTH, height)

        // Higher compression for bigger picture
        const data = canvas.toDataURL(
          'image/jpeg',
          size > SERVER_SIZE ? 0.7 : 0.9
        )

        this.src = data
        this.$emit('file', this.dataURLtoFile(data, name))
      }
    },
    dataURLtoFile(dataurl, filename) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new File([u8arr], filename, { type: mime })
    },
  },
}
</script>
