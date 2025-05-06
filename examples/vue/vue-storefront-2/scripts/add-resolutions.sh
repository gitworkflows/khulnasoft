#!/bin/bash
# You'll need to install `jq`: https://stedolan.github.io/jq/

# Sets `@khulnasoft.com/sdk-vue` resolution symlinks in `package.json`
echo "$(jq '.resolutions."@khulnasoft.com/sdk-vue" = "link:../../../packages/sdks/output/vue"' package.json)" >package.json
