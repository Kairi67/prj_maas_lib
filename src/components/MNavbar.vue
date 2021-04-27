<template lang="pug">
  v-navigation-drawer(width="250" app)
    v-list-item.py-2
      v-list-item-content
        v-list-item-title.headline MaaS.Land
    v-divider
    div.px-4.py-8
      v-btn(@click="handleToLinkSubmit" block color='indigo') Submit New
    // v-list-item(@click="handleToLinkSubmit")
      v-list-item-icon
        v-icon mdi-pencil
      v-list-item-title Submit New
    v-list(subheader three-line)
      v-subheader Tags 
      v-list-item
        v-list-item-content
         
  //v-app-bar(fixed color='white' flat)
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

<style lang="scss" scoped></style>
