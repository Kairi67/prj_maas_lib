<template lang="pug">
.layout_grid_records
  v-skeleton-loader(v-if="loading" type="card-avatar, article")
  v-skeleton-loader(v-if="loading" type="card-avatar, article")
  v-skeleton-loader(v-if="loading" type="card-avatar, article")
  v-card(v-else v-for='(record, i) in records', :key='i' style="box-shadow: none !important;")
    v-tooltip(top)
      template(v-slot:activator="{ on, attrs }")
        v-img.appender_image(
          v-on="on"
          v-bind="attrs"
          height='200px'
          :src='recordImage(record.fields)'
          @click='handleToLink(record.fields.link)'
        )
      span {{record.fields.link}}
    v-card-text
      v-card-title.pa-0.mb-3.font-weight-bold.text-h5 {{ record.fields.title }}
      .wrapper_description
        .text_subtitle {{record.fields.subtitle}}
        .text_description {{ record.fields.description }}
      v-chip-group.mb-2(column)
        div(v-for="item in record.fields.category")
          v-chip.my-2(color='indigo', text-color='white' @click='handleSortByTags(item)') {{ item }}
        v-chip.my-2(color='teal', text-color='white' @click='handleSortByCountry(record.fields.country)') {{ record.fields.country }}
      div.wrapper_author
        .text-body-2 Author:
          span.font-weight-bold {{ record.fields.author }}
        v-btn.mr-4(icon @click="handleUpdateCounts(record.id, record.fields.counts)")
          v-icon.mr-2(color="blue lighten-2") mdi-thumb-up
          div {{ record.fields.counts }}
</template>
<script>
import AirtableClient from '@/plugins/airtableClient';
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
    return {
      count: 0,
      noimage: require('@/assets/noimage.png'),
    };
  },
  created() {
    //console.log(this.records);
  },

  methods: {
    async handleUpdateCounts(id, counts) {
      try {
        await AirtableClient.updateRecordCounts(id, counts);
      } finally {
        this.fetchListItems();
      }
    },
    handleSortByTags(tag) {
      this.$emit('clickedTag', tag);
    },
    handleSortByCountry(country) {
      this.$emit('clickedCountry', country);
    },
    handleToLink(url) {
      window.open(url, '_blank');
    },
    recordImage(fields) {
      return fields.imageUrl ? fields.imageUrl[0].url : this.noimage;
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
.layout_grid_records {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  grid-gap: 1.8rem;
  padding: 3.2rem 1.6rem 1.6rem;
  @include layoutSp {
    padding: 1.6rem 0rem 1.6rem;
  }
}
.wrapper_author {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.appender_image {
  cursor: pointer;
  border-radius: 8px;
}
.wrapper_description {
  margin-bottom: 0px;
  font-size: 14.4px;
  line-height: 1.6;
  color: #333333;
  letter-spacing: 0.5px;
  .text_subtitle {
    font-weight: bold;
  }
  .text_description {
    margin-bottom: 8px;
  }
}
</style>
