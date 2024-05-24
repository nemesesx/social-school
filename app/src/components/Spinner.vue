<template>
  <div
    v-if="loading"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
  >
    <ProgressSpinner />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    console.log("spinner");
  },
};
</script>

<style scoped>
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.z-50 {
  z-index: 50;
}
</style>
