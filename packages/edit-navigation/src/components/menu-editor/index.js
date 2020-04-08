/**
 * External dependencies
 */
import { find } from 'lodash';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import {
	BlockEditorKeyboardShortcuts,
	BlockEditorProvider,
	BlockList,
	ObserveTyping,
	WritingFlow,
	__experimentalBlockNavigationList,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Panel, PanelBody, Button } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import useNavigationBlocks from './use-navigation-blocks';
import MenuEditorShortcuts from './shortcuts';

export default function MenuEditor( {
	menuId,
	blockEditorSettings,
	onDelete,
} ) {
	const kind = 'root';
	const name = 'menu';

	const [ blocks, setBlocks, saveBlocks ] = useNavigationBlocks( menuId );
	const isLargeViewport = useViewportMatch( 'medium' );
	const entities = useSelect( ( select ) =>
		select( 'core' ).getEntitiesByKind( kind )
	);

	const entity = find( entities, { kind, name } );

	const deleteMenu = async ( recordId ) => {
		const path = `${ entity.baseURL + '/' + recordId + '?force=true' }`;
		const deletedRecord = await apiFetch( {
			path,
			method: 'DELETE',
		} );
		return deletedRecord.previous;
	};

	const askToDelete = async () => {
		if (
			// eslint-disable-next-line no-alert
			window.confirm( __( 'Are you sure you want to delete this menu?' ) )
		) {
			const deletedMenu = await deleteMenu( menuId );
			onDelete( deletedMenu );
		}
	};

	return (
		<div className="edit-navigation-menu-editor">
			<BlockEditorKeyboardShortcuts.Register />
			<MenuEditorShortcuts.Register />

			<BlockEditorProvider
				value={ blocks }
				onInput={ ( updatedBlocks ) => setBlocks( updatedBlocks ) }
				onChange={ ( updatedBlocks ) => setBlocks( updatedBlocks ) }
				settings={ {
					...blockEditorSettings,
					templateLock: 'all',
				} }
			>
				<BlockEditorKeyboardShortcuts />
				<MenuEditorShortcuts saveBlocks={ saveBlocks } />
				<Panel className="edit-navigation-menu-editor__panel">
					<PanelBody
						title={ __( 'Navigation structure' ) }
						initialOpen={ isLargeViewport }
					>
						{ !! blocks.length && (
							<__experimentalBlockNavigationList
								blocks={ blocks }
								selectedBlockClientId={ blocks[ 0 ].clientId }
								selectBlock={ () => {} }
								showNestedBlocks
								showAppender
							/>
						) }
					</PanelBody>
				</Panel>
				<Panel className="edit-navigation-menu-editor__panel">
					<PanelBody title={ __( 'Navigation menu' ) }>
						<div className="components-panel__header-actions">
							<Button isPrimary onClick={ saveBlocks }>
								{ __( 'Save navigation' ) }
							</Button>
							<Button isPrimary onClick={ askToDelete }>
								{ __( 'Delete navigation' ) }
							</Button>
						</div>
						<WritingFlow>
							<ObserveTyping>
								<BlockList />
							</ObserveTyping>
						</WritingFlow>
					</PanelBody>
				</Panel>
			</BlockEditorProvider>
		</div>
	);
}
