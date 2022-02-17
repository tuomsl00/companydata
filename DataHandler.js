class DataHandler {
    constructor(client) {
        this.client = client;
    }
    async handleCompanyData(companyObj) {
        try {
          const database = this.client.db('local');
          const collection = database.collection("companies");
          const result = await collection.replaceOne({"business_id": companyObj.business_id}, companyObj, {upsert: true});
        } catch (err) {
          console.log(err);
        }
      
      }
}

module.exports = DataHandler;