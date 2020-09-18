<template lang="module-html">
  <div class="bg" @click="handleClick">
    test-button1
  </div>
</template>

<script>
import './test-button.module.scss'

export default {
  methods: {
    handleClick() {
      alert('ok')
    }
  }
}
</script>
