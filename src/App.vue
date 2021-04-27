<template lang="pug">
  v-app#app
    m-navbar
    v-main.grey.lighten-3
      v-container(fluid)
        v-row
          v-col
            m-card(:records="records" :loading="loading")
</template>
<script>
import MNavbar from '@/components/MNavbar';
import MCard from '@/components/MCard';
import { getListMaas } from '@/plugins/airtableClient';
export default {
  components: {
    MNavbar,
    MCard,
  },
  data() {
    return {
      records: [],
      recordId: '',
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
          console.log(response);
          this.records = response.map((item) => item);
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
  /* max-width: 1100px; */
  margin: 0 auto;
}

.v-application--wrap {
  display: flex;
  flex-direction: row !important;
}
</style>
