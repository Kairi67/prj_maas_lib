<template lang="pug">
  v-app#app
    m-header
    v-main.grey.lighten-3
      v-container.loading-wrap(v-if="loading")
        v-progress-circular(indeterminate :size="40" :width="4")
      v-container(v-else)
        v-row
          v-col
            v-sheet(min-height='80vh' rounded='lg')
              m-card(:records="records")
</template>
<script>
import MHeader from '@/components/MHeader';
import MCard from '@/components/MCard';
import axios from 'axios';
export default {
  components: {
    MHeader,
    MCard,
  },
  data() {
    return {
      records: {},
      dialog: false,
      editedItem: {},
      loading: true,
    };
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    showEditDialog(item) {
      this.editedItem = item || {};
      this.dialog = !this.dialog;
    },
    async fetchItems() {
      const env = process.env;
      try {
        await axios
          .get(
            `https://api.airtable.com/v0/${env.VUE_APP_AIR_TABLE_APP}/${env.VUE_APP_AIR_TABLE_NAME}`,
            { headers: { Authorization: 'Bearer ' + env.VUE_APP_API_TOKEN } }
          )
          .then((response) => {
            this.loading = false;
            this.records = response.data.records.map((item) => item.fields);
          });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.loading-wrap {
  text-align: center;
  display: flex;
  align-items: center;
  height: 100%;
}

.v-progress-circular {
  margin: 1rem auto;
}
</style>
