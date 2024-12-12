import { headers } from 'next/headers'
import {Configuration , PlaidApi , PlaidEnvironments } from 'plaid'
const configuration = new Configuration({
    basePath:PlaidEnvironments.sandbox,
    baseOptions:{
        headers:{
            'PLAID-CLIENT-ID' : process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET':process.env.PLAID_SECRET,
            'env':process.env.PLAID_ENV
        }
    }
})
export const plaidClient = new PlaidApi(configuration);
