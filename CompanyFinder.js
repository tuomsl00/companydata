const fetch = require('node-fetch');
const DataHandler = require('./DataHandler');
const JsonHelper = require('./JsonHelper')

class CompanyFinder {
  constructor(client) {
    this.client = client;
  }
  async findCompanyLocalDB(business_id) {
      console.log("Finding local db...");
      try {
        const database = this.client.db('local');
        const collection = database.collection("companies");
        const result = await collection.findOne({business_id: business_id});
        delete result._id;  // delete object-id from result
        return result;
      
      } catch (err) {
        return err;
      }
    }
  
  async findCompany(business_id) {
    let result = await new Promise((result, error) => {
      fetch('http://avoindata.prh.fi/bis/v1/'+business_id)
        .then(this.checkResponseStatus)
        .then(async data => {
            const jsonHelper = new JsonHelper();
            let companyObj = jsonHelper.handleJson(data);
            const handler = new DataHandler(this.client);
            await handler.handleCompanyData(companyObj);
            result(companyObj);
        })
        .catch(err => {
          console.log(err);
          result(false);
        });
      });
      return result;
  }
  
  checkResponseStatus(res) {
    if(res.ok){
      return res.json();
    } else {
      throw Error(res.statusText);
    }
  }
}


module.exports = CompanyFinder;