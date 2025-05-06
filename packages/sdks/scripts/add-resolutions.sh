#!/bin/bash
# You'll need to install `jq`: https://stedolan.github.io/jq/

# Sets `@khulnasoft.com/mitosis-cli` resolution symlinks in `../package.json`. Assumes `mitosis` repo lives besides this one.
echo "$(jq '.resolutions."@khulnasoft.com/mitosis-cli" = "link:../mitosis/packages/cli" | .resolutions."@khulnasoft.com/mitosis" = "link:../mitosis/packages/core"' ../../package.json)" >../../package.json
