import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Seo from 'components/seo/seo';
import { dataTransform, fetchRelated, fetchNews, fetchQuery } from 'utils/api';
import { export_table_to_csv } from 'utils/download-table';
import SchemeIntroduction from 'components/schemeIntroduction/schemeIntroduction';
import domtoimage from 'dom-to-image';
import DatavizViewControls from 'components/datavizViewControls/datavizViewControls';
import IndicatorSelector from 'components/indicatorSelector/indicatorSelector';
import SchemeDetailsView from 'components/schemeDetailsView/schemeDetailsView';
import RelatedSchemes from 'components/relatedSchemes/relatedSchemes';
import SchemeNews from 'components/schemeNews/schemeNews';

const stateCodes = {
  1: 'Andhra Pradesh',
  2: 'Arunachal Pradesh',
  3: 'Assam',
  4: 'Bihar',
  5: 'Chhattisgarh',
  6: 'Goa',
  7: 'Gujarat',
  8: 'Haryana',
  9: 'Himachal Pradesh',
  10: 'Jharkhand',
  11: 'Karnataka',
  12: 'Kerala',
  13: 'Madhya Pradesh',
  14: 'Maharashtra',
  15: 'Manipur',
  16: 'Meghalaya',
  17: 'Mizoram',
  18: 'Nagaland',
  19: 'Odisha',
  20: 'Punjab',
  21: 'Rajasthan',
  22: 'Sikkim',
  23: 'Tamil Nadu',
  24: 'Telangana',
  25: 'Tripura',
  26: 'Uttar Pradesh',
  27: 'Uttarakhand',
  28: 'West Bengal',
  29: 'Andaman & Nicobar',
  30: 'Chandigarh',
  31: 'Dadra and Nagar Haveli',
  32: 'Daman and Diu',
  33: 'Delhi',
  34: 'Jammu & Kashmir',
  35: 'Ladakh',
  36: 'Lakshadweep',
  37: 'Puducherry',
};

const Scheme = ({ scheme, related, news }) => {
  const [showViz, setShowViz] = useState(true);
  const [activeViz, setActiveViz] = useState('map');
  const [activeIndicator, setActiveIndicator] = useState('');
  const [activeYear, setActiveYear] = useState('2019-20');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {

    // Setting current indicator
    let currentIndicator = Object.keys(scheme.data).find(
      (indicator) => scheme.data[indicator].slug === router.query.indicator
    );
    if (currentIndicator === undefined) currentIndicator = 'indicator_01';
    setActiveIndicator(currentIndicator);
    setLoading(false);
  }, [router]);

  const handleChangeViz = (type) => {
    setShowViz(true);
    setActiveViz(type);
  };

  const handleToggleShowViz = (status) => {
    setShowViz(status);
  };
  const setYearChange = (year) => {
    setActiveYear(year);
  };
  const seo = {
    title: scheme.metadata.name,
    description: scheme.metadata.description,
    url: `https://schemes.openbudgetsindia.org/scheme/${router.query.scheme}`,
  };

  const filterElements = (node) => {
    try {
      return (
        node.getAttribute('id') !== 'hide-this-button' &&
        node.getAttribute('class') !== 'statetooltip' &&
        node.getAttribute('class') !== 'tcontainer' &&
        node.getAttribute('class') !== 'select-container' &&
        node.getAttribute('class') !== 'details__download' &&
        node.nodeType != 8 &&
        node.getAttribute('class') != 'see-details-text'
      );
    } catch (err) {
      return true;
    }
  };

  const handleDownloadReportImage = () => {
    if (activeViz === 'table') export_table_to_csv('table.csv');
    else
      domtoimage
        .toPng(document.getElementById('report-container'), {
          filter: filterElements,
        })
        .then((dataURL) => {
          const link = document.createElement('a');
          link.download = 'Visualization Report.png';
          link.href = dataURL;
          link.click();
        });
  };
  return (
    <>
      <div className="skiptarget">
        <span id="maincontent">-</span>
      </div>

      <main id="main" className="wrapper scheme" tabIndex="-1">
        <div>
          <Seo seo={seo} />
          {!loading && (
            <>
              <SchemeIntroduction data={scheme.metadata} />
              <span className="horizontal-seperator" />

              <div className="scheme__container">
                <DatavizViewControls
                  view={activeViz}
                  handleChangeViz={handleChangeViz}
                />
                {activeIndicator && (
                  <>
                    <IndicatorSelector
                      schemeData={scheme}
                      activeIndicator={activeIndicator}
                      currentSlug={router.query.scheme}
                    />

                    <SchemeDetailsView
                      handleDownloadReportImage={handleDownloadReportImage}
                      showViz={showViz}
                      activeViz={activeViz}
                      handleToggleShowViz={handleToggleShowViz}
                      schemeData={scheme}
                      activeIndicator={activeIndicator}
                      activeYear={activeYear}
                      stateCodes={stateCodes}
                      setYearChange={setYearChange}
                    />
                  </>
                )}
              </div>


              <RelatedSchemes related={related} />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export async function getStaticPaths() {
  const data = await fetchQuery('schemeType', 'Sector Aggregate');
  return {
    paths: data.map((scheme) => ({
      params: {
        scheme: scheme.extras[2].value,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const scheme = await dataTransform(params.scheme);
  const related = await fetchRelated(
    scheme.metadata.name,
    scheme.metadata.type
  );

  return {
    props: { scheme, related},
    revalidate: 1,
  };
}

export default Scheme;
