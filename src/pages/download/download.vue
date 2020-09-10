<template>
  <div :class="$style.wrap">
    <!-- 导航栏 -->
    <div :class="$style.navigation">
      <div :class="$style.navigationReturn">返回</div>
      <div :class="$style.navigationTitle">共享住宅手机下载</div>
      <a href="#" :class="$style.navigationMore">更多</a>
    </div>
    <!-- logo栏 -->
    <div :class="$style.logo">
      <img :class="$style.logoImg" src="../../asset/images/download/logo@2x.png"/>
      <a href="#" :class="$style.logoBtn">点击下载</a>
    </div>
    <!-- 品牌 -->
    <div :class="[$style.brand, $style.brandOne]">
      <div :class="$style.brandTitle">共享住宅App</div>
      <div :class="$style.brandSubTitle">青春作伴归田园</div>
      <a href="#" :class="$style.brandBtn">青春作伴归田园</a>
    </div>
    <!-- 宣传画册 -->
    <div :class="$style.app">
      <img :class="$style.appImg" src="../../asset/images/download/main@2x.png" />
    </div>
    <!-- 品牌 -->
    <div :class="[$style.brand, $style.brandTwo]">
      <div :class="$style.brandTitle">共享住宅App</div>
      <div :class="$style.brandSubTitle">青春作伴归田园</div>
      <a href="#" :class="$style.brandBtn">青春作伴归田园</a>
    </div>
    <!-- 备案号 -->
    <div :class="$style.caseNumber">
      湘ICP备2020017273号
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" module>
%a {
  text-decoration: none;
}

%btn {
  @extend %a;
  width: 96px;
  height: 29px;
  display: block;
  background: #3D7FFF;
  border-radius: 20px;
  border-radius: 20px;
  font-size: 12px;
  color: #FFFFFF;
  line-height: 29px;
  text-align: center;
}

%max-btn {
  @extend %a;
  width: 186px;
  height: 40px;
  display: block;
  background: #3D7FFF;
  border-radius: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 40px;
  text-align: center;
}

.wrap {
  max-width: 700px;
  margin: 0 auto;
}

.navigation {
  display: flex;
  padding: 13px 20px 0;
  justify-content: space-between;
  font-size: 13px;
  color: #000;
  line-height: 18px;
  align-items: center;
  .navigationReturn {
    background-image: url('..//../asset/images/download/back@2x.png');
    background-size: 8px 14px;
    background-repeat: no-repeat;
    background-position: left center;
    padding-left: 14px;
  }
  .navigationTitle {
    font-size: 16px;
    color: #333;
    line-height: 22px;
    font-weight: bolder;
  }
  .navigationMore {
    @extend %a;
    color: #000;
  }
}

.logo {
  display: flex;
  align-items: center;
  padding: 20px 20px 5px;
  border-bottom:1px solid #D8D8D8;
  justify-content: space-between;
  .logoImg {
    width: 95px;
    height: 22px;
  }
  .logoBtn {
    @extend %btn;
  }
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
 
  .brandTitle {
    font-size: 18px;
    color: #000;
    line-height: 25px;
    font-weight: bolder;
  }
  .brandSubTitle {
    font-size: 13px;
    color: #000;
    line-height: 18px;
    margin-top: 11px;
  }
  .brandBtn {
    margin-top: 20px;
    @extend %max-btn;
  }
}
.brandOne {
  margin-top: 20px;
}
.brandTwo {
  margin-top: 25px;
}

.app {
  margin-top: 25px;
  .appImg {
    width: 100%;
  }
}

.caseNumber {
  font-size: 12px;
  color: #000000;
  line-height: 17px;
  margin-top: 15px;
  margin-bottom: 25px;
  text-align: center;
}
</style>
