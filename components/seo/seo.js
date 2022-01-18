import Head from 'next/head';

const Seo = ({ seo }) => {
  const title = seo.title
    ? `${seo.title} - Sector Dashboard`
    : 'Sector Dashboard | Open Budgets India';
  const description = seo.description
    ? seo.description
    : 'A tool that facilitates comparison of aggregate budget indicators across different states and years across twelve social and economic sectors.';

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
      <meta name="application-name" content="Sector Dashboard" />
    </Head>
  );
};

export default Seo;
