<template>
  <div class="container" id="app">
    <h1 class="center">{{ title }}</h1>
    <p class="center" v-if="authenticated">
      <a @click="logout">Logout</a>
    </p>
    <LoginForm v-if="!authenticated" @authenticated="setAuthenticated"/>
    <Form v-if="authenticated" v-model="newItem" @keydown.enter="validateInput"/>
    <div class="row" v-if="authenticated">
      <div class="col s12 m6 offset-m3" id="shopping-list" v-if="shoppingList.length">
        <ul class="collection with-header">
          <ListItem
            v-for="(item, index) in shoppingList"
            v-bind:name="item.name"
            v-bind:key="index"
            @remove="removeItem(index)"
          />
        </ul>
        <a
          class="waves-effect waves-light btn-small"
          v-if="shoppingList.length > 1"
          @click="removeItems"
        >
          Remove
          All
        </a>
      </div>
      <p
        class="red-text text-darken-2 flow-text center"
        v-if="!shoppingList.length && !loading && !error"
      >No items on the list yet.</p>
      <LoadingIndicator v-bind:error="error" v-bind:loading="loading"/>
    </div>
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm.vue";
import Form from "./components/Form.vue";
import ListItem from "./components/ListItem.vue";
import LoadingIndicator from "./components/LoadingIndicator.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    LoginForm,
    Form,
    ListItem,
    LoadingIndicator
  },
  data() {
    return {
      title: "Shopping list",
      newItem: "", // Current value of input field "item"
      shoppingList: [], // Array of item objs
      loading: true,
      error: false,
      authenticated: false
    };
  },
  mounted() {
    // Get all items from database
    this.loading = true;
    axios
      .get("http://localhost:3000/items")
      .then(response => {
        if (response.status == 200) {
          response.data.item_list.forEach(el => this.shoppingList.push(el));
        }
      })
      .catch(error => {
        // eslint-disable-next-line
        console.log(error);
        this.error = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      axios
        .get("http://localhost:3000/users/logout")
        .then(response => {
          if (response.status == 200) {
            // eslint-disable-next-line
            console.log("Logged out");
            this.authenticated = false;
          }
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    addItem() {
      // Add pseudo obj and meanwhile save to database.
      this.shoppingList.push({ name: this.newItem });
      this.saveList();
      this.newItem = "";
    },
    validateInput() {
      // Only one or more letters, digits, dots or commas allowed
      // between start and end of the input string.
      const expr = /^[a-zA-Z0-9.,]+$/;
      const MAX_STR_LENGTH = 30;
      if (expr.test(this.newItem) && this.newItem.length <= MAX_STR_LENGTH) {
        this.addItem();
      }
    },

    removeItem(index) {
      let removedItem = this.shoppingList.splice(index, 1); // Array of deleted el.
      this.loading = true;
      axios
        .post(`http://localhost:3000/items/${removedItem[0]._id}/delete`, {})
        // eslint-disable-next-line
        .then(res => {
          if (res.status == 204) {
            // eslint-disable-next-line
            console.log("Removed");
          }
          this.loading = false;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
          // Return deleted item back on server error.
          this.shoppingList.splice(index, 0, removedItem[0]);
        });
    },

    saveList() {
      this.loading = true;
      axios
        .post("http://localhost:3000/items/create", { name: this.newItem })
        // eslint-disable-next-line
        .then(response => {
          // New item was added
          if (response.status == 201) {
            this.shoppingList.pop(); // Pop the placeholder obj w/o id
            this.shoppingList.push(response.data.item); // Push full obj
          } else if (response.status == 200) {
            // Exists already, remove placeholder
            this.shoppingList.pop();
          }
          this.loading = false;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
    },

    removeItems() {
      this.loading = true;
      axios
        .post("http://localhost:3000/items/all/delete", {})
        .then(res => {
          if (res.status == 204) {
            this.shoppingList = [];
          }
          this.loading = false;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
    }
  }
};
</script>