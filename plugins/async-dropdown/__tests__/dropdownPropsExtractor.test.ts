import { getMassagedProps } from '../src/helpers/dropdownPropsExtractor';

describe('Get Massaged Props', () => {
  const mock = jest.fn();
  const locale = 'en-CA';

  const khulnasoftPluginContext = {
    context: {
      designerState: { editingContentModel: { data: { toJSON: mock } } },
    },
  };

  describe('should throw', () => {
    it.each([[null], [undefined], [''], [' '], [{}], [73], [[]]])('when url is %o', invalidUrl => {
      try {
        getMassagedProps({ field: { options: { url: invalidUrl } } });
        fail('Should have thrown');
      } catch (e) {
        expect(e.message).toBe('Missing { url: "" } required option');
      }
    });

    it.each([[null], [undefined], [{}], [73], [[]]])('when mapper is %o', invalidMapper => {
      try {
        getMassagedProps({
          field: {
            options: { url: 'any-url', mapper: invalidMapper },
          },
        });
        fail('Should have thrown');
      } catch (e) {
        expect(e.message).toBe('Missing { mapper: "" } required option');
      }
    });

    it('when templated url with missing component tokens', () => {
      const templatedUrl = 'https://www.domain.net/v2/{{locale}}/endpoint/{{componentVariable}}';
      const khulnasoftComponentVariables: { [key: string]: string } = { anotherVariable: 'X' };
      const khulnasoftPluginObject = {
        object: { get: (key: string): any => khulnasoftComponentVariables[key] },
      };
      mock.mockReturnValue({ locale });
      try {
        getMassagedProps({
          field: {
            options: {
              url: templatedUrl,
              mapper: '() => {}',
              dependencyComponentVariables: ['componentVariable'],
            },
          },
          ...khulnasoftPluginContext,
          ...khulnasoftPluginObject,
        });
        fail('Should have thrown');
      } catch (e) {
        expect(e.message).toBe('Tokens {{componentVariable}} not replaced');
      }
    });
  });

  describe('should return', () => {
    beforeAll(() => {
      mock.mockReturnValue({ locale });
    });

    it('url after replacing templated url with context tokens', () => {
      const templatedUrl = 'https://www.domain.net/v2/{{locale}}/endpoint';
      const expectedUrl = `https://www.domain.net/v2/${locale}/endpoint`;

      const actual = getMassagedProps({
        field: { options: { url: templatedUrl, mapper: '() => {}' } },
        ...khulnasoftPluginContext,
      });

      expect(actual.url).toBe(expectedUrl);
    });

    it('url after replacing templated url with component tokens', () => {
      const templatedUrl = 'https://www.domain.net/v2/{{locale}}/endpoint/{{componentVariable}}';
      const A_VALUE = 'A VARIABLE';
      const khulnasoftComponentVariables: { [key: string]: string } = { componentVariable: A_VALUE };
      const khulnasoftPluginObject = {
        object: { get: (key: string): any => khulnasoftComponentVariables[key] },
      };
      const actual = getMassagedProps({
        field: {
          options: {
            url: templatedUrl,
            mapper: '() => {}',
            dependencyComponentVariables: ['componentVariable'],
          },
        },
        ...khulnasoftPluginContext,
        ...khulnasoftPluginObject,
      });

      const expectedUrl = `https://www.domain.net/v2/${locale}/endpoint/${A_VALUE}`;
      expect(actual.url).toBe(expectedUrl);
    });

    it('replaces templated url with nested component tokens', () => {
      const templatedUrl = 'https://www.domain.net/v2/{{targeting.locale.0}}/users';

      const khulnasoftComponentVariables = { targeting: { locale: [locale] } };
      const khulnasoftPluginObject = {
        object: { get: (key: string): any => khulnasoftComponentVariables[key] },
      };
      const actual = getMassagedProps({
        field: {
          options: {
            url: templatedUrl,
            mapper: '() => {}',
            dependencyComponentVariables: ['componentVariable'],
          },
        },
        ...khulnasoftPluginContext,
        ...khulnasoftPluginObject,
      });

      const expectedUrl = `https://www.domain.net/v2/${locale}/users`;
      expect(actual.url).toBe(expectedUrl);
    });

    it('mapper function as mapper', () => {
      const expected = '() => {}';

      const actual = getMassagedProps({
        field: { options: { url: 'any-url', mapper: expected } },
        ...khulnasoftPluginContext,
      });

      expect(actual.mapper).toBe(expected);
    });
  });
});
