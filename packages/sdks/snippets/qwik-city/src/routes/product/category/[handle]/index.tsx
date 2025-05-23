import { component$ } from '@khulnasoft.com/qwik';
import { routeLoader$ } from '@khulnasoft.com/qwik-city';
import { fetchOneEntry } from '@khulnasoft.com/sdk-qwik';

export const useProductDetails = routeLoader$(async ({ params }) => {
  return await fetchOneEntry({
    model: 'product-details',
    apiKey: 'ee9f13b4981e489a9a1209887695ef2b',
    query: {
      'data.handle': params.handle,
    },
  });
});

export default component$(() => {
  const productResource = useProductDetails();

  return (
    productResource.value && (
      <div class="product-details-page">
        <h1>{productResource.value.data?.name}</h1>
        <img
          src={productResource.value.data?.image}
          alt={productResource.value.data?.name}
        />
        <p>{productResource.value.data?.collection.value.data.copy}</p>
        <p>Price: {productResource.value.data?.collection.value.data.price}</p>
      </div>
    )
  );
});
