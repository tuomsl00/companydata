require('dotenv').config();

const { MongoClient } = require("mongodb");

const CompanyFinder = require('./CompanyFinder');

class getMethodHandler {
    constructor(app) {
        var uri = process.env.MONGOURI;
        process.env.MONGOURI
        const client = new MongoClient(uri);
        client.connect();

        app.get('/api/company/:business_id', async (req, res) => {

            let business_id = req.params.business_id;
            var result;
            let bid = business_id.split('-');

            //  Check if valid business-id
            if (bid.length == 2 && bid[0].toString().length == 7 && bid[1].toString().length == 1) {
                const finder = new CompanyFinder(client);
                result = await finder.findCompany(business_id);
            //  If for some reason we didn't get the companydata from the server we try to get it from local db.
                if (!result) {
                    result = await finder.findCompanyLocalDB(business_id);
                }
            } else {
                return res.status(400).send({Error: 'Invalid business_id'})
            }
        
            if (!result) result = {};
        
            return res.status(200).send(result);
        })
    }
}

module.exports = getMethodHandler;