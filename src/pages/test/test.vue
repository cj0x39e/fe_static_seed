<template>
  <div :class="$style.test">
    <div />
    hihihi
    <my-button />
    <img src="../../asset/china@2x.jpg">
    <my-dialog />
  </div>

</template>

<script>
import MyButton from '~/ui-components/my-button/my-button.vue'
import MyDialog from '~/ui-components/my-dialog/my-dialog.vue'

export default {
  components: {
    MyButton,
    MyDialog
  }
}
</script>

<style lang="scss" module>
.test {
  background-color: red;
  height: 100px;
  font-size: 10px;
}
</style>
