<template>
  <li class="collection-item">
    <div class="valign-wrapper">
      <p id="item-name" style="word-break:break-all; width:100%;">{{ name }}</p>
      <i
        @click="$emit('remove')"
        id="remove-button"
        class="secondary-content tiny material-icons"
        style="cursor:pointer;"
      >clear</i>
    </div>
  </li>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    name: {
      type: String,
      default: ""
    }
  }
};
</script>
