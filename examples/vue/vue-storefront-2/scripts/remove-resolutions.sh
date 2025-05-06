#!/bin/bash
# You'll need to install `jq`: https://stedolan.github.io/jq/

# Removes `@khulnasoft.com/sdk-vue` resolution from the list of resolutions in `package.json``
echo "$(jq 'del(.resolutions."@khulnasoft.com/sdk-vue")' package.json)" >package.json
