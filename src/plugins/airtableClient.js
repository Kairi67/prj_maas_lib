import Airtable from 'airtable';
Airtable.configure({ apiKey: process.env.VUE_APP_API_TOKEN });
const base = Airtable.base(process.env.VUE_APP_AIR_TABLE_APP);

export const getListMaas = () => {
  return base(process.env.VUE_APP_AIR_TABLE_NAME).select({ maxRecords: 50 });
};

export const updateCount = (id, counts) => {
  return base(process.env.VUE_APP_AIR_TABLE_NAME).update([
    {
      id: id,
      fields: { counts: (counts += 1) },
    },
  ]);
};

export const findRecordByCategory = (category) => {
  return base(process.env.VUE_APP_AIR_TABLE_NAME).select({
    maxRecords: 50,
    filterByFormula: `FIND('${category}', {category}) > 0`,
  });
};
