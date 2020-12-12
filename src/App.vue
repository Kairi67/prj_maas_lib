<template lang="pug">
  v-app
    v-content.container.align-center.px-1
      h2.font-weight-light.mb-2 MaaS.Land
      v-container(fluid class="grey lighten-5 mb-6" style="min-height: 100vh;")
        m-card(:records="records")
</template>
<script>
import MCard from '@/components/MCard';
import axios from 'axios';
export default {
  components: {
    MCard,
  },
  data() {
    return {
      records: {},
      dialog: false,
      editedItem: {},
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
    fetchItems() {
      const env = process.env;
      axios
        .get(
          `https://api.airtable.com/v0/${env.VUE_APP_AIR_TABLE_APP}/${env.VUE_APP_AIR_TABLE_NAME}`,
          { headers: { Authorization: 'Bearer ' + env.VUE_APP_API_TOKEN } }
        )
        .then((response) => {
          this.records = response.data.records.map((item) => {
            return item.fields;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
