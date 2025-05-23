import { trimHtml } from './utils'; // Update this import to match your file structure

describe('trimHtml', () => {
  const baseHtml = `
    <div class="khulnasoft-personalization-container" style="display: block;">
      <template data-variant-id="khulnasoft-123-0">
        <div>Variant 1 Content</div>
      </template>
      <template data-variant-id="khulnasoft-123-1">
        <div>Variant 2 Content</div>
      </template>
      <script id="variants-script-khulnasoft-123">
        (function() {
          var variants = [
            {"query":[{"property":"itemInCart","operator":"is","value":"item1"}]},
            {"query":[{"property":"itemInCart","operator":"is","value":"item2"}]}
          ];
          // ... rest of the script ...
        })();
      </script>
      <div>Default Content</div>
    </div>
  `;

  it('should return winning variant content when a variant matches', () => {
    const userAttributes = { itemInCart: 'item1' };
    const result = trimHtml(baseHtml, { userAttributes }).html;
    expect(result).toContain(
      '<div class="khulnasoft-personalization-container" style="display: block;">'
    );
    expect(result).toContain('<div>Variant 1 Content</div>');
    expect(result).not.toContain('<template');
    expect(result).not.toContain('<script');
    expect(result).not.toContain('Default Content');
  });

  it('should return default content when no variant matches', () => {
    const userAttributes = { itemInCart: 'item3' };
    const result = trimHtml(baseHtml, { userAttributes }).html;
    expect(result).toContain(
      '<div class="khulnasoft-personalization-container" style="display: block;">'
    );
    expect(result).toContain('<div>Default Content</div>');
    expect(result).not.toContain('<template');
    expect(result).not.toContain('<script');
    expect(result).not.toContain('Variant 1 Content');
    expect(result).not.toContain('Variant 2 Content');
  });

  it('should handle multiple personalization containers', () => {
    const multipleContainersHtml = `
      ${baseHtml}
      <div class="other-content">Some other content</div>
      ${baseHtml.replace('khulnasoft-123', 'khulnasoft-456')}
    `;
    const userAttributes = { itemInCart: 'item2' };
    const result = trimHtml(multipleContainersHtml, { userAttributes }).html;
    const occurrences = (result.match(/Variant 2 Content/g) || []).length;
    expect(occurrences).toBe(2);
    expect(result).toContain('<div class="other-content">Some other content</div>');
    expect(result).not.toContain('Default Content');
  });

  it('should preserve additional attributes on the container div', () => {
    const htmlWithExtraAttributes = baseHtml.replace(
      'class="khulnasoft-personalization-container"',
      'class="khulnasoft-personalization-container extra-class" data-test="value"'
    );
    const userAttributes = { itemInCart: 'item1' };
    const result = trimHtml(htmlWithExtraAttributes, { userAttributes }).html;
    expect(result).toContain('class="khulnasoft-personalization-container extra-class"');
    expect(result).toContain('data-test="value"');
  });

  it('should not modify content when no personalization container is present', () => {
    const htmlWithoutContainer = '<div>Regular content</div>';
    const userAttributes = { itemInCart: 'item1' };
    const result = trimHtml(htmlWithoutContainer, { userAttributes }).html;
    expect(result).toBe(htmlWithoutContainer);
  });

  it('should handle empty variants array', () => {
    const htmlWithEmptyVariants = baseHtml.replace(
      `var variants = [
            {"query":[{"property":"itemInCart","operator":"is","value":"item1"}]},
            {"query":[{"property":"itemInCart","operator":"is","value":"item2"}]}
          ];
`,
      'var variants = [];'
    );
    const userAttributes = { itemInCart: 'item1' };
    const result = trimHtml(htmlWithEmptyVariants, { userAttributes }).html;
    expect(result).toContain('<div>Default Content</div>');
  });

  it('should handle malformed JSON in variants', () => {
    const htmlWithMalformedJson = baseHtml.replace('"query":[{', '"query":[{malformed');
    const userAttributes = { itemInCart: 'item1' };
    const result = trimHtml(htmlWithMalformedJson, { userAttributes }).html;
    expect(result).toContain('<div>Default Content</div>');
  });

  const baseHtmlWithDates = `
  <div class="khulnasoft-personalization-container" style="display: block;">
    <template data-variant-id="khulnasoft-123-0">
      <div>Current Variant</div>
    </template>
    <template data-variant-id="khulnasoft-123-1">
      <div>Future Variant</div>
    </template>
    <template data-variant-id="khulnasoft-123-2">
      <div>Past Variant</div>
    </template>
    <script id="variants-script-khulnasoft-123">
      (function() {
        var variants = [
          {"query":[],"startDate":"2023-01-01T00:00:00Z","endDate":"2025-12-31T23:59:59Z"},
          {"query":[],"startDate":"2026-01-01T00:00:00Z","endDate":"2027-12-31T23:59:59Z"},
          {"query":[],"startDate":"2020-01-01T00:00:00Z","endDate":"2022-12-31T23:59:59Z"}
        ];
        // ... rest of the script ...
      })();
    </script>
    <div>Default Content</div>
  </div>
`;

  it('should return the current variant when within date range', () => {
    const userAttributes = { date: '2024-06-15T12:00:00Z' };
    const result = trimHtml(baseHtmlWithDates, { userAttributes }).html;
    expect(result).toContain('<div>Current Variant</div>');
    expect(result).not.toContain('Future Variant');
    expect(result).not.toContain('Past Variant');
    expect(result).not.toContain('Default Content');
  });

  it('should return default content when current date is before all variant start dates', () => {
    const userAttributes = { date: '2019-06-15T12:00:00Z' };
    const result = trimHtml(baseHtmlWithDates, { userAttributes }).html;
    expect(result).toContain('<div>Default Content</div>');
    expect(result).not.toContain('Current Variant');
    expect(result).not.toContain('Future Variant');
    expect(result).not.toContain('Past Variant');
  });

  it('should return default content when current date is after all variant end dates', () => {
    const userAttributes = { date: '2028-06-15T12:00:00Z' };
    const result = trimHtml(baseHtmlWithDates, { userAttributes }).html;
    expect(result).toContain('<div>Default Content</div>');
    expect(result).not.toContain('Current Variant');
    expect(result).not.toContain('Future Variant');
    expect(result).not.toContain('Past Variant');
  });

  it('should handle variants with only start date', () => {
    const htmlWithOnlyStartDate = baseHtmlWithDates.replace(
      '"startDate":"2023-01-01T00:00:00Z","endDate":"2025-12-31T23:59:59Z"',
      '"startDate":"2023-01-01T00:00:00Z"'
    );
    const userAttributes = { date: '2024-06-15T12:00:00Z' };
    const result = trimHtml(htmlWithOnlyStartDate, { userAttributes }).html;
    expect(result).toContain('<div>Current Variant</div>');
  });

  it('should handle variants with only end date', () => {
    const htmlWithOnlyEndDate = baseHtmlWithDates.replace(
      '"startDate":"2023-01-01T00:00:00Z","endDate":"2025-12-31T23:59:59Z"',
      '"endDate":"2025-12-31T23:59:59Z"'
    );
    const userAttributes = { date: '2024-06-15T12:00:00Z' };
    const result = trimHtml(htmlWithOnlyEndDate, { abTests: {} }).html;
    expect(result).toContain('<div>Current Variant</div>');
  });

  const baseHtmlWithAbTest = `
  <div class="khulnasoft-component khulnasoft-component-test-content-1" data-name="page" data-source="Rendered by Khulnasoft.com">
    <template data-template-variant-id="variant-1">
      <div class="khulnasoft-content" khulnasoft-content-id="test-content-1" khulnasoft-model="page">
        Variant 1 Content
      </div>
    </template>
    <template data-template-variant-id="variant-2">
      <div class="khulnasoft-content" khulnasoft-content-id="test-content-1" khulnasoft-model="page">
        Variant 2 Content
      </div>
    </template>
    <script id="variants-script-test-content-1">
      // A/B test script content
    </script>
    <div class="khulnasoft-content" khulnasoft-content-id="test-content-1" khulnasoft-model="page">
      Default Content
    </div>
  </div>
`;

  it('should select the winning A/B test variant', () => {
    const options = {
      userAttributes: {},
      abTests: { 'test-content-1': 'variant-1' },
    };
    const result = trimHtml(baseHtmlWithAbTest, options).html;
    expect(result).toContain('Variant 1 Content');
    expect(result).not.toContain('Variant 2 Content');
    expect(result).not.toContain('Default Content');
    expect(result).not.toContain('<template');
    expect(result).not.toContain('<script');
  });

  it('should keep default content if winning variant is not found', () => {
    const options = {
      userAttributes: {},
      abTests: { 'test-content-1': 'non-existent-variant' },
    };
    const result = trimHtml(baseHtmlWithAbTest, options).html;
    expect(result).toContain('Default Content');
    expect(result).not.toContain('Variant 1 Content');
    expect(result).not.toContain('Variant 2 Content');
    expect(result).not.toContain('<template');
    expect(result).not.toContain('<script');
  });

  it('should handle multiple A/B tests', () => {
    const htmlWithMultipleTests = `
    ${baseHtmlWithAbTest}
    <div class="khulnasoft-component-test-content-2" data-name="page">
      <template data-template-variant-id="variant-a">
        <div class="khulnasoft-content" khulnasoft-content-id="test-content-2" khulnasoft-model="page">
          Variant A Content
        </div>
      </template>
      <template data-template-variant-id="variant-b">
        <div class="khulnasoft-content" khulnasoft-content-id="test-content-2" khulnasoft-model="page">
          Variant B Content
        </div>
      </template>
      <script id="variants-script-test-content-2">
        // A/B test script content
      </script>
      <div class="khulnasoft-content" khulnasoft-content-id="test-content-2" khulnasoft-model="page">
        Default Content 2
      </div>
    </div>
  `;
    const options = {
      userAttributes: {},
      abTests: {
        'test-content-1': 'variant-2',
        'test-content-2': 'variant-a',
      },
    };
    const result = trimHtml(htmlWithMultipleTests, options).html;
    expect(result).toContain('Variant 2 Content');
    expect(result).toContain('Variant A Content');
    expect(result).not.toContain('Variant 1 Content');
    expect(result).not.toContain('Variant B Content');
    expect(result).not.toContain('Default Content');
    expect(result).not.toContain('Default Content 2');
    expect(result).not.toContain('<template');
    expect(result).not.toContain('<script');
  });

  it('should process A/B tests before personalization containers', () => {
    const htmlWithAbTestAndPersonalization = `
  <div class="khulnasoft-component khulnasoft-component-test-content-1" data-name="page" data-source="Rendered by Khulnasoft.com">
    <template data-template-variant-id="variant-1">
      <div class="khulnasoft-content" khulnasoft-content-id="test-content-1" khulnasoft-model="page">
        Variant 1 Content
      </div>
    </template>
    <template data-template-variant-id="variant-2">
      <div class="khulnasoft-content" khulnasoft-content-id="test-content-1" khulnasoft-model="page">
        <div>Variant 2 Content</div>
          <div class="khulnasoft-personalization-container" style="display: block;">
      <template data-variant-id="khulnasoft-123-0">
        <div>Personalized 1 Content</div>
      </template>
      <template data-variant-id="khulnasoft-123-1">
        <div>Personalized 2 Content</div>
      </template>
      <script id="variants-script-khulnasoft-123">
        (function() {
          var variants = [
            {"query":[{"property":"itemInCart","operator":"is","value":"item1"}]},
            {"query":[{"property":"itemInCart","operator":"is","value":"item2"}]}
          ];
          // ... rest of the script ...
        })();
      </script>
      <div>Default Content</div>
    </div>
      </div>
    </template>
    <script id="variants-script-test-content-1">
      // A/B test script content
    </script>
    <div class="khulnasoft-content" khulnasoft-content-id="test-content-1" khulnasoft-model="page">
      Default Content
    </div>
  </div>
  `;
    const options = {
      userAttributes: { itemInCart: 'item1' },
      abTests: { 'test-content-1': 'variant-2' },
    };
    const result = trimHtml(htmlWithAbTestAndPersonalization, options).html;
    expect(result).toContain('Variant 2 Content');
    expect(result).not.toContain('Variant 1 Content');
    expect(result).not.toContain('Default Content');
    // The actual personalized content will depend on the userAttributes and filterWithCustomTargeting implementation
    expect(result).toContain('Personalized 1 Content');
    expect(result).not.toContain('<template');
    expect(result).not.toContain('<script');
  });

  it('should not modify content when no A/B test matches', () => {
    const options = {
      userAttributes: {},
      abTests: { 'non-existent-content': 'some-variant' },
    };
    const result = trimHtml(baseHtmlWithAbTest, options).html;
    expect(result).toContain('Default Content');
    expect(result).toContain('<template');
    expect(result).toContain('<script');
  });
});
