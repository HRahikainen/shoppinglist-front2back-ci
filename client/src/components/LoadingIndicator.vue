<template>
  <div class="col s8 m6 offset-s2 offset-m3">
    <div v-if="loading" class="progress">
      <div class="indeterminate"></div>
    </div>
    <div v-else-if="error" class="center red white-text">
      <strong>An Error Occured In Loading List!</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingIndicator",
  props: ["loading", "error"]
};
</script>