<template>
  <div :class="$style.bg" @click="handleClick">
    asdfasdfasdf
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert('ok')
    }
  }
}
</script>

<style lang="scss" module>
.bg {
  background-color: black;
}
</style>

