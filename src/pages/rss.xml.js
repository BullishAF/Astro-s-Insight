import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function get(context) {
	const blog = await getCollection('blog');
	// Return an object with the `rss` function, which will be used to generate the RSS feed
	return rss({
		// `<title>` field in output xml
		title: 'astroBlog',
		// `<description>` field in output xml
		description: 'A humble Astronaut’s guide to the stars',
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: blog.map((post) => ({
			title: post.title,
			description: post.description,
			pubDate: post.date,
			link: post.url,
		})),
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
	});
}
