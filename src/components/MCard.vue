<template lang="pug">
  div.records-grid
    v-card.hover(v-for="(record, i) in records" :key='i' color="gray" max-width="344")
      v-img(:src="record.imageUrl[0].url" height="200px")
      v-card-title {{record.title}}
      v-card-subtitle
        div(class="my-2 subtitle-1") {{record.country}}
      v-card-actions
        v-chip-group(column)
          v-chip(depressed color="lime") {{record.category}}
          v-chip(depressed color="lime") {{record.category}}
      v-card-actions
        v-btn(@click='handleExpandDetail(i)' text color="teal accent-4") Learn More
        v-tooltip(bottom)
          template(v-slot:activator="{ on, attrs }")
            v-btn(text color="teal accent-4" v-bind="attrs" @click="handleToLink(record.link)") Link
          span {{record.link}}
      v-expand-transition
        v-card.transition-fast-in-fast-out.v-card--reveal(v-show="isOpenIndex === i" v-if='isOpen' style='height: 100%;')
          v-card-text.pb-0
            p.display-1.text--primary {{record.title}}
            p {{record.description}}
          v-card-actions.pt-0
            v-btn(color='teal accent-4' @click='isOpen = false') Close
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
      isOpen: false,
      isOpenIndex: null,
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
    handleExpandDetail(i) {
      this.isOpenIndex = this.isOpenIndex === i ? null : i;
      this.isOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.records-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 3.2rem 1.6rem;
  padding: 1.6rem;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
