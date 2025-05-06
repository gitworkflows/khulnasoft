import { getKhulnasoftSearchParams } from './index.js';

const querystring =
  'someotherValue=jklsjfdal&abc=klfdjklgfds&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=037948e52eaf4743afed464f02c70da4&khulnasoft.overrides.037948e52eaf4743afed464f02c70da4=037948e52eaf4743afed464f02c70da4&khulnasoft.overrides.page%3A%2F=037948e52eaf4743afed464f02c70da4&preview_theme_id=128854393017';

const url = new URL(`localhost:3000/about-us?${querystring}`);

describe('Get Khulnasoft SearchParams', () => {
  test('correctly extracts all khulnasoft params from a query object', () => {
    const output = getKhulnasoftSearchParams(url.searchParams);
    expect(output).toMatchSnapshot();
  });
});
