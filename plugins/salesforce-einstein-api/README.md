# Khulnasoft.com Salesforce Einestein Api plugin

Easily connect your SalesForce Einestein API to your Khulnasoft.com content!

## Installation

On any khulnasoft space, go to the [integrations tab](https://khulnasoft.com/app/integrations) and in the `Advanced Configurations` section all the way to the end, add a custom plugin `@khulnasoft.com/plugin-sfcc-einstein-api`,
you'll be prompted to enter the following data:
* Einstein API Client ID.
* Einstein Site ID.

Follow [Einstein API docs](https://metamind.readme.io/docs/what-you-need-to-call-api) to get the required configurations.

Then hit the connect button. Now you can use the `EinsteinRecommender` type as input to your custom components, symbols, or as a custom targeting attribute. When used as an input type, you will be able to search and select a specific Recommender type to provide to your component and consume.

#### Example of a Custom Component with EinsteinRecommender input type:

Example of a custom component called 'ProductRecommendations' that receives an `EinsteinRecommender` as input:

```JSX
import React from 'react'
import {Khulnasoft} from '@khulnasoft.com/react'
import ProductRecommendations from './ProductRecommendations' // this is your custom component

Khulnasoft.registerComponent(ProductRecommendations, {
    name: 'ProductRecommendations',
    inputs: [
        {
            name: 'recommender',
            type: 'EinsteinRecommender',
            required: true
        }
    ]
})
```

To read more about using custom components in Khulnasoft see [this article](https://www.khulnasoft.com/c/docs/custom-components-setup).
