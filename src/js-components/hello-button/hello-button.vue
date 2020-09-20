<template>
  <button type="button" class="container" @click="handleClick">
    hello button
  </button>
</template>

<script>

export default {
  methods: {
    handleClick() {
      alert('你好，世界!')
    }
  }
}
</script>
