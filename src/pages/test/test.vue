<template>
  <div :class="$style.test">
    hihihi
    <my-button />
  </div>
  
</template>

<script>
import MyButton from '~/ui-components/my-button/MyButton.vue'

export default {
  components: {
    MyButton
  }
}
</script>


<style lang="scss" module>
.test {
  background-color: red;
}
</style>