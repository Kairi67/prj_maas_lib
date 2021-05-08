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
               @clickedTag="handleSortByTags"
               @clickedCountry="handleSortByCountry"
            )
</template>
<script>
import MNavbar from '@/components/MNavbar';
import MCard from '@/components/MCard';
import AirtableClient from '@/plugins/airtableClient';
export default {
  components: {
    MNavbar,
    MCard,
  },
  data() {
    return {
      records: [],
      categorys: [],
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
        await AirtableClient.getRecordLists().eachPage((response) => {
          this.records = response.map((item) => {
            return item;
          });
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
        await AirtableClient.findRecordByCategory(tag).eachPage((record) => {
          this.records = record.map((item) => item);
          this.loading = false;
        });
      } finally {
        this.loading = false;
      }
    },
    async handleSortByCountry(country) {
      try {
        this.loading = true;
        await AirtableClient.findRecordByCountry(country).eachPage((record) => {
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
<style lang="scss" scoped>
@mixin layoutSp {
  @media screen and (max-width: 800px) {
    @content;
  }
}
#app {
  margin: 0 auto;
}
.v-application--wrap {
  display: flex;
  flex-direction: row !important;
}
</style>
