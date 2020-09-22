<template>
  <div class="container">
    <div class="title">欢迎使用 STATIC VUE !</div>
    <div class="sub-title">ui components 示例</div>
    <hello-nav />
    <div class="sub-title">图片示例</div>
    <img src="../../asset/images/china@2x.jpg">
    <div class="sub-title">字体展示</div>
    <div class="iconfont iconwelcome" />
    <div />
    <template v-pre>
      <div class="sub-title">js components 示例</div>
      <hello-button />
      <div class="sub-title">vant components 示例</div>
      <van-slider v-model="sliderValue" />
    </template>

  </div>
</template>

<script>
import HelloNav from '~/ui-components/hello-nav/hello-nav.vue'
export default {
  components: {
    HelloNav
  }
}
</script>
