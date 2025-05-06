#!/bin/bash
# You'll need to install `jq`: https://stedolan.github.io/jq/

# Removes `@khulnasoft.com/sdk-react-native` resolution from the list of resolutions in `package.json``
echo "$(jq 'del(.resolutions."@khulnasoft.com/sdk-react-native")' package.json)" >package.json
