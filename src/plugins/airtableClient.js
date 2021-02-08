import Airtable from 'airtable';
Airtable.configure({ apiKey: process.env.VUE_APP_API_TOKEN });
const base = Airtable.base(process.env.VUE_APP_AIR_TABLE_APP);

export const getListMaas = () => {
  return base(process.env.VUE_APP_AIR_TABLE_NAME).select({});
};
