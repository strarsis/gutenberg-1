/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

export default function useTemplatePartPost( postId, slug, theme ) {
	return useSelect(
		( select ) => {
			if ( postId ) {
				return (
					select( 'core' ).getEntityRecord(
						'postType',
						'wp_template_part',
						postId
					) && postId
				);
			}

			if ( slug && theme ) {
				const posts = select( 'core' ).getEntityRecords(
					'postType',
					'wp_template_part',
					{
						slug,
						meta: { theme },
					}
				);
				const foundPost =
					posts &&
					posts.find(
						( post ) =>
							post.slug === slug &&
							post.meta &&
							post.meta.theme === theme
					);
				return foundPost && foundPost.id;
			}
		},
		[ postId, slug, theme ]
	);
}
