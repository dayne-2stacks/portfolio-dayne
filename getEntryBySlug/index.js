const contentful = require('contentful');

// Configure Contentful client
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  // Check if a slug was provided in the query string
  const slug = req.query.slug;

  try {
    if (slug) {
      // Fetch a single entry from Contentful with the provided slug
      const entry = await client.getEntries({
        'fields.slug': slug,
        content_type: 'blogPost', // Replace with your content type ID
        limit: 1,
      });

      // Assuming the slug is unique and there's only one entry per slug
      if (entry.items.length > 0) {
        context.res = {
          status: 200, // OK
          body: entry.items[0],
          headers: {
            'Content-Type': 'application/json',
          },
        };
      } else {
        context.res = {
          status: 404, // Not Found
          body: "The post with the provided slug does not exist.",
          headers: {
            'Content-Type': 'application/json',
          },
        };
      }
    } 
  } catch (error) {
    context.log.error('Error accessing Contentful:', error);
    context.res = {
      status: 500, // Internal Server Error
      body: "An error occurred while fetching the blog posts.",
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
