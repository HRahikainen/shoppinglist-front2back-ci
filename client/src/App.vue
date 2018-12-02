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
        <p class="red-text text-darken-2 flow-text center" v-if="!shoppingList.length && !loading && !error">No items on the list yet.</p>
        <LoadingIndicator v-bind:error="error" v-bind:loading="loading"/>
    </div>
  </div>
</template>

<script>

import Form from './components/Form.vue'
import ListItem from './components/ListItem.vue'
import LoadingIndicator from './components/LoadingIndicator.vue'
import axios from 'axios';

export default {
  name: 'app',
  components: {
    Form,
    ListItem,
    LoadingIndicator
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
    axios
      .get('http://localhost:3000/items')
      .then(response => {
        if (response.status == 200) {
            response.data.item_list.forEach(el =>this.shoppingList.push(el.name));
        }
      })
      .catch(error => {
        // eslint-disable-next-line 
        console.log(error)
        this.error = true;
        this.loading = false;
      })
      .finally(() => this.loading = false)
  },
  methods: {

        addItem() {
            this.shoppingList.push(this.newItem);
            this.saveList();
            this.newItem = '';
            
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
            //this.saveList();
            axios.post("http://localhost:3000/items/1/delete", {})
            // eslint-disable-next-line 
            .then(res => {
                if (res.status == 204) {
                    this.loading = false;
                    // eslint-disable-next-line
                    console.log("Removed");
                }
            }).catch(() => {
                this.error = true;
                this.loading = false;
            })
        },

        saveList() {
            axios.post("http://localhost:3000/items/create", {name : this.newItem})
            // eslint-disable-next-line 
            .then(response=>response.data.item_list.forEach(el =>this.shoppingList.push(el.name))).catch(err => {});
        },

        removeItems() {
            this.shoppingList = [];
            //this.saveList();
        }
    }
}
</script>