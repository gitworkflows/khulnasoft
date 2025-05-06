import { useContext } from '@khulnasoft.com/mitosis';
import KhulnasoftContext from '../context/khulnasoft.context.lite.js';

/**
 * NO-OP placeholder for react-native BaseText implementation
 */
export default function BaseText(props: { text: string }) {
  const khulnasoftContext = useContext(KhulnasoftContext);
  return (
    <span style={khulnasoftContext.value.inheritedStyles as any}>
      {props.text}
    </span>
  );
}
