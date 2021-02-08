<template lang="pug">
  v-app-bar(color='white' flat='')
    v-container.fill-height
      v-toolbar-title MaaS.Land
      v-spacer
      v-text-field(@change="updateField($event)" label="search" outlined hide-details rounded)
      v-spacer
      v-btn(text='' @click="handleToLinkSubmit") SUBMIT
      v-btn(text='' @click="handleToLinkProfile") PROFILE
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    updateField(event) {
      console.log(event);
    },
    handleToLinkSubmit() {
      window.open('https://airtable.com/shr1OE5Z8PNcm2bNa', '_blank');
    },
    handleToLinkProfile() {},
  },
};
</script>
