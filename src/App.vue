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
import { getListMaas } from '@/plugins/airtableClient';
export default {
  components: {
    MHeader,
    MCard,
  },
  data() {
    return {
      records: [],
      dialog: false,
      editedItem: {},
      loading: false,
    };
  },
  mounted() {
    this.fetchListItems();
  },
  methods: {
    showEditDialog(item) {
      this.editedItem = item || {};
      this.dialog = !this.dialog;
    },
    async fetchListItems() {
      await getListMaas().eachPage((response) => {
        console.log(response);
        this.records = response.map((item) => item.fields);
      });
    },
  },
};
</script>

<style scoped>
#app {
  max-width: 1100px;
  margin: 0 auto;
}
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
