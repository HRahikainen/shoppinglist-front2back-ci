<template>
  <div class="container" id="app">
   <h1 class="center">{{ title }}</h1>
   <Form v-model="newItem" @keydown.enter="validateInput"/>
   <div class="row">
        <div class="col s12 m6 offset-m3" id="shopping-list" v-if="shoppingList.length">
            <ul class="collection with-header">
                <ListItem v-for="(item, index) in shoppingList" v-bind:name="item" v-bind:key="index" @remove="removeItem(index)"/>
            </ul>
            <a class="waves-effect waves-light btn-small" v-if="shoppingList.length > 1" @click="removeItems">Remove
                All
            </a>
        </div>
        <p class="red-text text-darken-2 flow-text center" v-if="!shoppingList.length">No items on the list yet.</p>
    </div>
  </div>
</template>

<script>

import Form from './components/Form.vue'
import ListItem from './components/ListItem.vue'
// import axios from 'axios';

export default {
  name: 'app',
  components: {
    Form,
    ListItem
  },
  data () {
    return {
     title: 'Shopping list',
     newItem: '',    // Current value of input field "item"
     shoppingList: [],
     loading: true,
     error: false 
    };
  },
  mounted () {
    /*axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        this.shoppingList = response.data.forEach(el => el.name);
      })
      .catch(error => {
        // eslint-disable-next-line 
        console.log(error)
        this.error = true
      })
      .finally(() => this.loading = false)*/
  },
  methods: {

        addItem() {
            this.shoppingList.push(this.newItem);
            this.newItem = '';
            this.saveList();
            //axios.post("/items/create")
        },
        validateInput() {
            // Only one or more letters, digits, dots or commas allowed
            // between start and end of the input string.
            const expr = /^[a-zA-Z0-9.,]+$/;
            const MAX_STR_LENGTH = 30;
            if (expr.test(this.newItem) && (this.newItem.length <= MAX_STR_LENGTH)) {
                this.addItem();
            }
        },

        removeItem(index) {
            this.shoppingList.splice(index, 1);
            this.saveList();
        },

        saveList() {
            //const stringifiedList = JSON.stringify(this.shoppingList);
            // Save to db
            //console.log("Saved " + stringifiedList[0]);
        },

        removeItems() {
            this.shoppingList = [];
            this.saveList();
        }
    }
}
</script>