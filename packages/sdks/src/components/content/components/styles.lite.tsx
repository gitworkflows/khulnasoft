import { useMetadata, useStore } from '@khulnasoft.com/mitosis';
import type { KhulnasoftNonceProp } from '../../../types/khulnasoft-props.js';
import InlinedStyles from '../../inlined-styles.lite.jsx';
import type { CustomFont } from './styles.helpers.js';
import { getCss, getDefaultStyles, getFontCss } from './styles.helpers.js';

interface Props extends KhulnasoftNonceProp {
  cssCode?: string;
  customFonts?: CustomFont[];
  contentId?: string;
  isNestedRender?: boolean;
}

useMetadata({
  rsc: {
    componentType: 'server',
  },
});

export default function ContentStyles(props: Props) {
  const state = useStore({
    injectedStyles: `
${getCss({ cssCode: props.cssCode, contentId: props.contentId })}
${getFontCss({ customFonts: props.customFonts })}
${getDefaultStyles(props.isNestedRender)}
`.trim(),
  });

  return (
    <InlinedStyles
      styles={state.injectedStyles}
      id="khulnasoftio-content"
      nonce={props.nonce}
    />
  );
}
