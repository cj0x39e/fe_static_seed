<template lang="module-html">
  <div class="test">
    <div/>
    hihihi
    compiler1112
    <template v-pre>
      <span @click="isShow=true">显示1111212aaaaaaa</span>
      <span v-if="isShow">隐藏</span>
      <test-button :class="'test1'"/>
    </template>

    <!-- <template v-pre>
      <vant-button :class="$style.test">aaaa</vant-button>
      <img src="../../asset/images/download/logo@2x.png">
      <div v-for="i of items" :key="i">{{a}}</div>
    </template> -->
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
