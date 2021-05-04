<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 z-30">
    <div class="relative bg-grey-light opacity-30 w-full h-full"></div>
    <div class="absolute top-0 bottom-0 left-0 right-0">
      <div class="w-full h-full flex flex-col justify-center p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
}
</script>
