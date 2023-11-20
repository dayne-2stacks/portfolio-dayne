const contentful = require('contentful');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request to get all entries from Contentful.');

    // Initialize Contentful client
    const client = contentful.createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    });

    try {
        // Fetch all entries from Contentful
        const entries = await client.getEntries();

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: entries.items
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error retrieving entries from Contentful"
        };
    }
};
