// worker.js
const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const csv = require('csv-parser');
require("./../models")
const Agent = require('./../models/Agent');
const User = require('./../models/User');
const Account = require('./../models/Account');
const PolicyCategory = require('./../models/PolicyCategory');
const PolicyCarrier = require('./../models/PolicyCarrier');
const PolicyInfo = require('./../models/PolicyInfo');

async function processCSV(filePath) {
    if (!filePath) {
        return
    }
    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                const promise = []
                for (const row of results) {
                    var agent = Agent({ name: row['agent'] });
                    promise.push(agent.save())

                    var user = User({
                        firstName: row['firstname'],
                        dob: new Date(row['dob']),
                        address: row['address'],
                        phoneNumber: row['phone'],
                        state: row['state'],
                        zipCode: row['zip'],
                        email: row['email'],
                        gender: row['gender'],
                        userType: row['userType']
                    });
                    promise.push(user.save())

                    const account = Account({ name: row['account_name'], userId: user._id });
                    promise.push(account.save())

                    const policyCategory = PolicyCategory({ categoryName: row['category_name'] });
                    promise.push(policyCategory.save())

                    const policyCarrier = PolicyCarrier({ companyName: row['company_name'] });
                    promise.push(policyCarrier.save())

                    const policyInfo = PolicyInfo({
                        policyNumber: row['policy_number'],
                        policyStartDate: new Date(row['policy_start_date']),
                        policyEndDate: new Date(row['policy_end_date']),
                        policyCategoryCollectionId: policyCategory._id,
                        companyCollectionId: policyCarrier._id,
                        userId: user._id
                    });
                    promise.push(policyInfo.save())
                }

                await Promise.all(promise)
                parentPort.postMessage({ message: 'Data successfully processed and uploaded', filePath });
            } catch (err) {
                parentPort.postMessage(`Error: ${err.message}`);
            }
        });
}

processCSV(workerData?.filePath);
