<template lang="pug">
  v-app#app
    m-navbar(
      :categorys="categorys"
      :fetchListItems="fetchListItems"
      @clicked="handleSortByTags"
      )
    v-main.grey.lighten-3
      v-container(fluid)
        v-row
          v-col
            m-card(
              :records="records"
              :loading="loading"
              :fetchListItems="fetchListItems"
               @clicked="handleSortByTags"
              )
</template>
<script>
import MNavbar from '@/components/MNavbar';
import MCard from '@/components/MCard';
import { getListMaas, findRecordByCategory } from '@/plugins/airtableClient';
export default {
  components: {
    MNavbar,
    MCard,
  },
  data() {
    return {
      records: [],
      categorys: [],
      dialog: false,
      editedItem: {},
      loading: true,
    };
  },
  mounted() {
    this.fetchListItems();
  },
  methods: {
    async fetchListItems() {
      try {
        this.loading = true;
        await getListMaas().eachPage((response) => {
          this.records = response.map((item) => item);
          this.categorys = response.flatMap((data) => data.fields.category);
          this.loading = false;
        });
      } finally {
        this.loading = false;
      }
    },
    async handleSortByTags(tag) {
      try {
        this.loading = true;
        await findRecordByCategory(tag).eachPage((record) => {
          this.records = record.map((item) => item);
          this.loading = false;
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
#app {
  margin: 0 auto;
}
.v-application--wrap {
  display: flex;
  flex-direction: row !important;
}
</style>
