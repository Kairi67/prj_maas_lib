<template lang="pug">
  v-navigation-drawer(width="240" app)
    v-list-item.pa-4
      v-list-item-content(@click="handleGetList")
        v-list-item-title.mb-3(style='font-weight:500; font-size:2rem;') MaaS.Land
        v-list-item-subtitle Awsome Mobility Tech
        v-list-item-subtitle products for your next project.
    v-divider
    div.px-4.pt-6.pb-4
      v-btn.btn_submit(@click="handleToLinkSubmit" block) Submit New
    v-list
      v-list-item(v-for='(category, i) in filterCategory', :key='i' link color='indigo')
        v-list-item-content
          v-list-item-title(style="font-size: 15px; color: #3f51b5;") {{category}}
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
    return {};
  },
  mounted() {},
  computed: {
    filterCategory: {
      get: function () {
        return [...new Set(this.categorys)].filter(Boolean);
      },
    },
  },
  methods: {
    async handleGetList() {
      await this.fetchListItems();
    },
    handleToLinkSubmit() {
      window.open('https://airtable.com/shr1OE5Z8PNcm2bNa', '_blank');
    },
  },
};
</script>
<style lang="scss" scoped>
.btn_submit {
  background-color: #3f51b5 !important;
  color: white !important;
  font-size: 16px;
}
</style>
