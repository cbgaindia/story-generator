import Head from 'next/head';

const Seo = ({ seo }) => {
  const title = seo.title
    ? `${seo.title} - Story Generator`
    : 'Story Generator | Open Budgets India';
  const description = seo.description
    ? seo.description
    : 'Find downloadable data, visualisations and other useful information related to a number of schemes run by the Union and State GovernmentsFind downloadable data, visualisations and other useful information related to a number of schemes run by the Union and State Governments.';

  const url = seo.url ? seo.url : 'https://schemes.openbudgetsindia.org/';
  return (
    <Head>
      {title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </>
      )}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {url && <meta property="og:url" content={url} />}
      <meta name="application-name" content="Story Generator" />
    </Head>
  );
};

export default Seo;
