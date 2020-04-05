/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	__experimentalAlignmentHookSettingsProvider as AlignmentHookSettingsProvider,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RadioControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { name as buttonBlockName } from '../button/';

const ALLOWED_BLOCKS = [ buttonBlockName ];
const BUTTONS_TEMPLATE = [ [ 'core/button' ] ];

// Inside buttons block alignment options are not supported.
const alignmentHooksSetting = {
	isEmbedButton: true,
};

function ButtonsEdit( { className, attributes, setAttributes } ) {
	const { blockDirection } = attributes;

	return (
		<div className={ `${ className } is-direction-${ blockDirection }` }>
			<AlignmentHookSettingsProvider value={ alignmentHooksSetting }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ BUTTONS_TEMPLATE }
					__experimentalMoverDirection={ blockDirection }
				/>
			</AlignmentHookSettingsProvider>
			<InspectorControls>
				<PanelBody title={ __( 'Buttons Settings' ) }>
					<RadioControl
						label={ __( 'Direction' ) }
						selected={ blockDirection }
						options={ [
							{ label: __( 'Horizontal' ), value: 'horizontal' },
							{
								label: __( 'Vertical' ),
								value: 'vertical',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( {
								blockDirection: value,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}

export default ButtonsEdit;
