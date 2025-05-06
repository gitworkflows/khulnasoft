import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '@/components/container';
import PostBody from '@/components/post-body';
import Header from '@/components/header';
import PostHeader from '@/components/post-header';
import Layout from '@/components/layout';
import PostTitle from '@/components/post-title';
import Head from 'next/head';
import { khulnasoft, KhulnasoftContent, useIsPreviewing } from '@khulnasoft.com/react';
import '@khulnasoft.com/widgets';

// Post model created to display a specific blog post.
// read more at: https://www.khulnasoft.com/blog/creating-blog
export default function Post({ post }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();
  if (!router.isFallback && !post && !isPreviewing) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <KhulnasoftContent
              {...(!isPreviewing && { content: post })}
              modelName="post"
              options={{ includeRefs: true }}
              isStatic
            >
              {(data, loading, fullContent) =>
                data && (
                  <article>
                    <Head>
                      <title>{data.title} | Next.js Blog Example with Khulnasoft.com</title>
                      <meta property="og:image" content={data.image} />
                    </Head>
                    {data.author?.value && (
                      <PostHeader
                        title={data.title}
                        coverImage={data.image}
                        date={data.lastUpdated}
                        author={data.author.value?.data}
                      />
                    )}
                    <p>{data.intro}</p>
                    <PostBody content={fullContent} />
                  </article>
                )
              }
            </KhulnasoftContent>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug;

  /*
    usage of khulnasoft sdks to fetch data
    more examples at https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/core  */

  let post =
    (await khulnasoft
      .get('post', {
        // Content API params are detailed in this doc
        // https://www.khulnasoft.com/c/docs/query-api
        includeRefs: true,
        query: {
          'data.slug': slug,
        },
      })
      .toPromise()) || null;

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await khulnasoft.getAll('post', {
    options: { noTargeting: true },
  });
  return {
    paths: allPosts?.map(post => `/blog/${post.data.slug}`) || [],
    fallback: true,
  };
}
