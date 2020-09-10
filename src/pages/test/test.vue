<template>
  <div :class="$style.test">
    <div></div>
    hihihi
    <my-button />
    <img src="../../asset/images/tuliu_logo.png">
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
  background-image: url('../../asset/images/risk.png');
  height: 100px;
  font-size: 10px;
}
</style>