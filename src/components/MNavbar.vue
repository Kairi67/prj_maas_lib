<template lang="pug">
  div
    v-app-bar(v-if="$vuetify.breakpoint.xs" flat fixed)
      v-toolbar-title MaaS.Land
      v-spacer
      v-app-bar-nav-icon(@click="drawer = true")
    v-navigation-drawer(width="240" app v-model="drawer")
      v-list-item.pa-4
        v-list-item-content(@click="handleGetList")
          v-list-item-title.mb-3(style='font-weight:500; font-size:2rem; color:#333') MaaS.Land
          v-list-item-subtitle Awsome Mobility Tech
          v-list-item-subtitle products for your next project.
      v-divider
      div.px-4.pt-6.pb-4
        v-btn.btn_submit(@click="handleToLinkSubmit" block outlined)
          v-icon(left) mdi-plus 
          | Submit New
      v-list
        v-list-item(@click="handleGetList" style="font-size: 15.4px; color: #333 !important; font-weight: 500;") ALL
        v-list-item(v-for='(category, i) in filterCategory', :key='i' link color='indigo' style='min-height:42px;')
          v-list-item-content
            v-list-item-title(@click="handleSortByTags(category)" style="font-size: 15.4px; color: #333; font-weight: 500;") {{category}}
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
  mounted() {},
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
  },
};
</script>
<style lang="scss" scoped>
.btn_submit {
  color: #3f51b5 !important;
  font-size: 15.4px !important;
  border: 2px solid #3f51b5;
}
</style>
