<template lang="pug">
  div
    v-app-bar(v-if="$vuetify.breakpoint.xs" flat fixed)
      v-toolbar-title MaaS.Land
      v-spacer
      v-app-bar-nav-icon(@click="drawer = true")
    v-navigation-drawer(app v-model="drawer" width="240")
      v-list-item.pa-4
        v-list-item-content(@click="handleGetList")
          v-list-item-title.mb-3.heading_title MaaS.Land
          v-list-item-subtitle Awesome Mobility Tech
          v-list-item-subtitle products for your next project.
      div.px-4.pt-4.pb-4
        v-btn.btn_auth(v-if="!$auth.isAuthenticated" @click="handleLoginAction" block outlined)
          v-icon(left) mdi-account-arrow-left
          | Logout
        v-btn.btn_auth(v-else @click="handleLogoutAction" block outlined)
          v-icon(left) mdi-account-arrow-right
          | Logout
      v-divider
      div.px-4.pt-6.pb-4
        v-btn.btn_submit(@click="handleToLinkSubmit" block outlined)
          v-icon(left) mdi-plus
          | Submit New
      v-list
        v-list-item.text_category(@click="handleGetList") ALL
        v-list-item(v-for='(category, i) in filterCategory', :key='i' link color='indigo' style='min-height:42px;')
          v-list-item-content
            v-list-item-title.text_category(@click="handleSortByTags(category)") {{category}}
</template>
<script>
export default {
  props: {
    categorys: {
      type: Array,
      required: true,
    },
    fetchListItems: {
      type: Function,
    },
  },
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    filterCategory: {
      get: function () {
        return [...new Set(this.categorys)].filter(Boolean).sort();
      },
    },
  },
  methods: {
    async handleGetList() {
      await this.fetchListItems();
    },
    handleSortByTags(tag) {
      this.$emit('clicked', tag);
    },
    handleToLinkSubmit() {
      window.open('https://airtable.com/shr1OE5Z8PNcm2bNa', '_blank');
    },
    handleLoginAction() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    handleLogoutAction() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.heading_title {
  font-weight: 500;
  font-size: 2rem;
  color: #333;
}
.text_category {
  font-size: 15.4px;
  color: #333 !important;
  font-weight: 500;
}
.btn_auth {
  color: #fff !important;
  background-color: #3f51b5;
  font-size: 15.4px !important;
  border: 2px solid #3f51b5;
}

.btn_submit {
  color: #3f51b5 !important;
  font-size: 15.4px !important;
  border: 2px solid #3f51b5;
}
</style>
