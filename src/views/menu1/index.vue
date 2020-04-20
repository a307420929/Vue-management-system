<template>
  <div class="menu1">
    <div>menu1</div>
    <div class="wrapper">
      <div class="box1"></div>
      <div class="box2"></div>
      <div class="box3"></div>
      <div class="box4"></div>
      <div class="box5"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu1',
  computed: {}
}
</script>

<style lang="scss" scoped>
.menu1 {
  display: block;
  .wrapper div {
    height: 1rem;
  }
  .box1 {
    width: 1rem;
    background-color: coral;
  }
  .box2 {
    width: 4rem;
    background-color: skyblue;
  }
  .box3 {
    width: 6rem;
    background-color: palegreen;
  }
  .box4 {
    width: 8rem;
    background-color: wheat;
  }
  .box5 {
    width: 54px;
    background-color: darkred;
  }
}
</style>
