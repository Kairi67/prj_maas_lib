<template lang="pug">
  div.records-grid
    v-card(v-for="(record, i) in records" :key='i' color="gray" max-width="344")
      v-img(:src="record.Images[0].url" height="200px")
      v-card-title {{record.Name}}
      v-card-text
        div(class="my-2 subtitle-1") Italy
        div {{record.Description}}
      v-card-actions
        v-chip(depressed color="dark") {{record.Type}}
        v-tooltip(bottom)
          template(v-slot:activator="{ on, attrs }")
            v-btn(text underline color="dark" v-bind="attrs" v-on="on" @click="handleToLink(record.Link)") LINK
          span {{record.Link}}
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
      show: false,
    };
  },
  mounted() {},
  methods: {
    handleToLink(url) {
      window.open(url, '_blank');
    },
    handleShowDetail(name) {
      console.log(name);
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.records-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 3.2rem 1.6rem;
  padding: 1.6rem;
}
</style>
