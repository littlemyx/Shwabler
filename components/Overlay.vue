<template>
  <div class="overlay">
    <slot/>
  </div>
</template>


<style scoped>
.overlay {
  z-index: 100;
  left: 0;
  top: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
