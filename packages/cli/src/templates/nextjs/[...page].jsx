import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import React from 'react';
import { KhulnasoftComponent, khulnasoft, useIsPreviewing, Khulnasoft } from '@khulnasoft.com/react';

/*
  Initialize the Khulnasoft SDK with your organization's API Key
  The API Key can be found on: https://khulnasoft.com/account/settings
*/
khulnasoft.init('<<<YOUR_API_KEY>>>');

export async function getStaticProps({ params }) {
  /*
    Fetch the first page from Khulnasoft that matches the current URL.
    The `userAttributes` field is used for targeting content,
    learn more here: https://www.khulnasoft.com/c/docs/targeting-with-khulnasoft
  */
  const page = await khulnasoft
    .get('<<<MODEL_NAME>>>', {
      userAttributes: {
        urlPath: '/' + (params?.page?.join('/') || ''),
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  /*
    Fetch all published pages for the current model.
    Using the `fields` option will limit the size of the response
    and only return the `data.url` field from the matching pages.
  */
  const pages = await khulnasoft.getAll('<<<MODEL_NAME>>>', {
    fields: 'data.url', // only request the `data.url` field
    options: { noTargeting: true },
    limit: 0,
  });

  return {
    paths: pages.map(page => `${page.data?.url}`),
    fallback: true,
  };
}

export default function Page({ page }) {
  const router = useRouter();
  /*
    This flag indicates if you are viewing the page in the Khulnasoft editor.
  */
  const isPreviewing = useIsPreviewing();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  /*
    Add your error page here. This will happen if there are no matching
    content entries published in Khulnasoft.
  */
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        {/* Add any relevant SEO metadata or open graph tags here */}
        <title>{page?.data.title}</title>
        <meta name="description" content={page?.data.descripton} />
      </Head>
      <div style={{ padding: 50, textAlign: 'center' }}>
        {/* Put your header or main layout here */}
        Your header
      </div>

      {/* Render the Khulnasoft page */}
      <KhulnasoftComponent model="page" content={page} />

      <div style={{ padding: 50, textAlign: 'center' }}>
        {/* Put your footer or main layout here */}
        Your footer
      </div>
    </>
  );
}

/* 
  This is an example of registering a custom component to be used in Khulnasoft.com. 
  You would typically do this in the file where the component is defined.
*/

const MyCustomComponent = props => (
  <div>
    <h1>{props.title}</h1>
    <p>{props.description}</p>
  </div>
);

/*
  This is a simple example of a custom component, you can view more complex input types here:
  https://www.khulnasoft.com/c/docs/custom-react-components#input-types
*/
Khulnasoft.registerComponent(MyCustomComponent, {
  name: 'ExampleCustomComponent',
  inputs: [
    { name: 'title', type: 'string', defaultValue: 'I am a React component!' },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'Find my source in /pages/[...page].js',
    },
  ],
});

// Register a custom insert menu to organize your custom componnets
// https://www.khulnasoft.com/c/docs/custom-components-visual-editor#:~:text=than%20this%20screenshot.-,organizing%20your%20components%20in%20custom%20sections,-You%20can%20create
Khulnasoft.register('insertMenu', {
  name: 'My Components',
  items: [{ item: 'ExampleCustomComponent', name: 'My React Component' }],
});
