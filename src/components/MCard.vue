<template lang="pug">
.records-grid
  v-skeleton-loader(v-if="loading" type="card-avatar, article")  
  v-skeleton-loader(v-if="loading" type="card-avatar, article") 
  v-skeleton-loader(v-if="loading" type="card-avatar, article") 
  v-card.c-card01(v-else v-for='(record, i) in records', :key='i')
    v-img(:src='record.fields.imageUrl[0].url', height='200px' @click='handleToLink(record.link)')
    v-card-text
      v-card-title.pa-0.mb-2.font-weight-bold.text-h5 {{ record.fields.title }}
      .description-text {{ record.fields.description }}
      v-chip-group.mb-2(column)
        v-chip.my-2(@click='handleSortByTags', small, color='indigo', text-color='white') {{ record.fields.category }}
        v-chip.my-2(small, color='indigo', text-color='white') {{ record.fields.category }}
        v-chip.my-2(small, color='teal', text-color='white') {{ record.fields.country }}
      div(style="display: flex; align-items: baseline; justify-content: space-between;")
        .text-body-2 Author:
          span.font-weight-bold {{ record.fields.author }}
        v-btn.mr-4(icon @click="handleUpdateCounts(record.id)")
          v-icon.mr-2(color="blue lighten-2") mdi-thumb-up
          div {{ record.fields.counts }}
    // v-card-actions
      v-btn(@click='handleExpandDetail(i)' text color="teal accent-4") Learn More
    // v-expand-transition
      v-card.transition-fast-in-fast-out.v-card--reveal(v-show="is OpenIndex === i" v-if='isOpen' style='height: 100%;')
        v-card-text.pb-0
          p.display-1.text--primary {{record.title}}
          p {{record.description}}
        v-card-actions.pt-0
          v-btn(color='teal accent-4' @click='isOpen = false') C
</template>
<script>
import { updateCount } from '@/plugins/airtableClient';
export default {
  components: {},
  props: {
    records: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
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
    async handleUpdateCounts(id) {
      console.log(id);
      try {
        await updateCount(id);
      } finally {
        location.reload();
      }
    },
    handleSortByTags() {
      console.log('here');
    },
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
  grid-gap: 1.2rem;
  padding: 3.2rem 1.6rem 1.6rem;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.description-text {
  margin-bottom: 8px;
}

.c-card01 {
  box-shadow: none !important;
}
</style>
