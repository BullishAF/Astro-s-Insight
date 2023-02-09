import rss from '@astrojs/rss';

import { formatBlogPosts } from '../js/utils';

const postImportResult = import.meta.glob('./blog/**/*.md', { eager: true });
const posts = formatBlogPosts(Object.values(postImportResult));
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function get(context) {
	return rss({
		stylesheet: '/rss/styles.xsl',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.frontmatter.title,
			link: post.url,
			description: post.frontmatter.description,
			pubDate: post.frontmatter.date,
			customData: `
                <author>${post.frontmatter.author}</author>
            `,
		})),
	});
}
