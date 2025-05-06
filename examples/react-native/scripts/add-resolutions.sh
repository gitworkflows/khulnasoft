#!/bin/bash
# You'll need to install `jq`: https://stedolan.github.io/jq/

# Sets `@khulnasoft.com/sdk-react-native` resolution symlinks in `package.json`
echo "$(jq '.resolutions."@khulnasoft.com/sdk-react-native" = "link:../../packages/sdks/output/react-native"' package.json)" >package.json
