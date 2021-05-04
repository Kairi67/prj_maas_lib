<template lang="pug">
.records-grid
  v-skeleton-loader(v-if="loading" type="card-avatar, article")
  v-skeleton-loader(v-if="loading" type="card-avatar, article")
  v-skeleton-loader(v-if="loading" type="card-avatar, article")
  v-card.c-card01(v-else v-for='(record, i) in records', :key='i')
    v-tooltip(top)
      template(v-slot:activator="{ on, attrs }")
        v-img(
          v-bind="attrs"
          v-on="on"
          :src='record.fields.imageUrl[0].url'
          style="cursor: pointer; border-radius: 8px;" height='200px'
          @click='handleToLink(record.fields.link)'
          )
      span {{record.fields.link}}
    v-card-text
      v-card-title.pa-0.mb-3.font-weight-bold.text-h5 {{ record.fields.title }}
      .description_area
        .description_area_bold {{record.fields.subtitle}}
        .description_area_text {{ record.fields.description }}
      v-chip-group.mb-2(column)
        div(v-for="item in record.fields.category")
          v-chip.my-2(color='indigo', text-color='white' @click='handleSortByTags(item)') {{ item }}
        v-chip.my-2(color='teal', text-color='white') {{ record.fields.country }}
      div(style="display: flex; align-items: baseline; justify-content: space-between;")
        .text-body-2 Author:
          span.font-weight-bold {{ record.fields.author }}
        v-btn.mr-4(icon @click="handleUpdateCounts(record.id, record.fields.counts)")
          v-icon.mr-2(color="blue lighten-2") mdi-thumb-up
          div {{ record.fields.counts }}
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
    fetchListItems: {
      type: Function,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    recordImage(record) {
      return record.fields.imageUrl[0].url;
    },
  },
  methods: {
    async handleUpdateCounts(id, counts) {
      try {
        await updateCount(id, counts);
      } finally {
        this.fetchListItems();
      }
    },
    handleSortByTags(tag) {
      this.$emit('clicked', tag);
    },
    handleToLink(url) {
      window.open(url, '_blank');
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
.records-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  grid-gap: 1.8rem;
  padding: 3.2rem 1.6rem 1.6rem;
  @include layoutSp {
    padding: 1.6rem 0rem 1.6rem;
  }
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.description_area {
  margin-bottom: 0px;
  font-size: 14.4px;
  line-height: 1.6;
  color: #333333;
  letter-spacing: 0.5px;
  &_bold {
    font-weight: bold;
  }
  &_text {
    margin-bottom: 8px;
  }
}
.c-card01 {
  box-shadow: none !important;
}
</style>
