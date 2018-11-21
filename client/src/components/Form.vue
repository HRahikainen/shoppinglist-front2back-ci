<template>
    <div class="row">
            <form class="col s12" v-on:submit.prevent>
                <div class="row">
                    <div class="input-field col s8 m6 offset-s2 offset-m3">
                        <input id="input-item" type="text" name="item" placeholder="Item to remember" :value="value" v-on="listeners">
                        <label for="input-item">Add list item:</label>
                    </div>
                </div>
            </form>
        </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    value: String
  },
  computed: {
    listeners () {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit('input', event.target.value)
      }
    }
  }
}
</script>