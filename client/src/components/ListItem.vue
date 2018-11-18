<template>
    <li class="collection-item">
        <div class="valign-wrapper">
            <p style="word-break:break-all; width:100%;">{{ name }}</p>
            <!--<i v-on:click="$emit(\'remove\')" class="secondary-content tiny material-icons" style="cursor:pointer;">clear</i>-->
        </div>
    </li>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    name: String
  }
}
</script>