<template>
  <div>
    <div class="text-grey-base font-light"><slot name="label"></slot></div>
    <div class="text-xl"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'AppItemLabeled',
}
</script>
