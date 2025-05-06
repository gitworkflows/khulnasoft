# Khulnasoft.com plugins

For step-by-step instructions on using and making plugins with Khulnasoft, see the official documentation, starting with [Intro to Plugins](https://www.khulnasoft.com/c/docs/plugins-intro).

Example plugins:

- [Rich text](rich-text)
- [Cloudinary](cloudinary)
- [Shopify](shopify)
- [Async dropdown](async-dropdown)
- [Campaign app](example-app-campaign-khulnasoft)


## Plugin Testing/Deployment Steps

Our plugins are hosted on npm under package @khulnasoft.com . You can check this url to see details of any plugin 
https://www.npmjs.com/package/@khulnasoft.com/[plugin-name]

- Test your changes by running the plugin locally and raise a PR [Documentation](https://www.khulnasoft.com/c/docs/make-a-plugin#step-4-add-your-plugin-to-khulnasoft)
- Once the PR is reviewed or meanwhile, make a dev release for testing

### Dev Release:
- cd to the root directory of the plugin you wish to deploy. for e.g `cd plugins/smartling`
- Ensure node version is 18.0+
- Remove node_modules and dist from utils. `rm -rf node_modules/ dist/`
- Re-install all modules in utils. `npm i`
- `npm run release:dev`
- Test your plugin in khulnasoft. Navigate to [Space settings](https://khulnasoft.com/account/space). Edit the Plugins in Integrations Section. Add the dev release plugin version (@khulnasoft.com/smartling-plugin@19.0.0-1).

Once the changes look fine, go ahead for patch/prod release

### Patch Release:
- Merge approved PR into main
- Check out main branch and take latest pull.
- Follow step 1 to 4 from [Dev Release](#dev-release)
- `npm run release:patch`
- Purge the jsdeliver cdn cache. Visit https://www.jsdelivr.com/tools/purge and type in url specific to the plugin required for e.g. https://cdn.jsdelivr.net/npm/@khulnasoft.com/plugin-smartling@latest
- (optional): Verify changes here https://cdn.jsdelivr.net/npm/@khulnasoft.com/[plugin-name]
- Test production plugin on khulnasoft app
- Raise a PR for the updated version in package.json and package-lock.json so that released version and repo version remain consistent