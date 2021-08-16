import Airtable from 'airtable';
Airtable.configure({ apiKey: process.env.VUE_APP_API_TOKEN });
const base = Airtable.base(process.env.VUE_APP_AIR_TABLE_APP);

export default class AirtableClient {
  static getRecordLists() {
    return base(process.env.VUE_APP_AIR_TABLE_NAME).select({
      maxRecords: 50,
      sort: [{ field: 'counts', direction: 'desc' }],
    });
  }
  static updateRecordCounts(id, counts) {
    return base(process.env.VUE_APP_AIR_TABLE_NAME).update([
      {
        id: id,
        fields: { counts: (counts += 1) },
      },
    ]);
  }
  static findRecordByCategory(category) {
    return base(process.env.VUE_APP_AIR_TABLE_NAME).select({
      maxRecords: 50,
      filterByFormula: `FIND('${category}', {category}) > 0`,
    });
  }
  static findRecordByCountry(country) {
    return base(process.env.VUE_APP_AIR_TABLE_NAME).select({
      maxRecords: 50,
      filterByFormula: `Search('${country}', {country})`,
    });
  }
}
