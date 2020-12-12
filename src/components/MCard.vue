<template lang="pug">
  div.records-grid
    v-card(v-for="record in records" color="gray" max-width="344")
      v-img(:src="record.Images[0].url" height="200px")
      v-card-text {{record.Name}}
      v-card-subtitle {{record.Description}}
      v-card-actions
        v-btn(color='orange lighten-2' text='')
          | Explore
        v-spacer
        v-btn(icon='' @click='show = !show')
          v-icon {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
</template>
<script>
export default {
  components: {},
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      editedItem: {},
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.records-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 0.5rem;
}
</style>
