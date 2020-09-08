<template>
  <div :class="[$style.fz, 'test']">
    <div :class="$style.ab">45564</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" module>
.fz {
  font-size: 100px;
  &:hover {
    font-size: 50px;
  }
  .ab {
    color: white;
  }
}

</style>
