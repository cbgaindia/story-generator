import health from 'public/Images/schemesLogos/health.png';
import agri from 'public/Images/schemesLogos/Agriculture and Allied Activities.png';
import agg_bud from 'public/Images/schemesLogos/Aggregate Budget Indicators.png';
import rcpt_ind from 'public/Images/schemesLogos/Receipts Indicators.png';
import edu from 'public/Images/schemesLogos/Education.png';
import food from 'public/Images/schemesLogos/Food, Civil Supplies and Cooperation.png';
import forest from 'public/Images/schemesLogos/Forests and Environment.png';
import irrig from 'public/Images/schemesLogos/Irrigation and Water Resources.png';
import power from 'public/Images/schemesLogos/Power and Energy.png';
import works from 'public/Images/schemesLogos/Public Works.png';
import rural from 'public/Images/schemesLogos/Rural Development.png';
import social from 'public/Images/schemesLogos/Social Welfare.png';
import urban from 'public/Images/schemesLogos/Urban Development and Housing.png';

const SchemesData = {
  dash_desc: 'The Sector Dashboard is a tool that facilitates comparison of aggregate budget indicators across different states and years. The indicators of expenditure data have been classified into eleven social and economic sectors. It enables users to make inter-state comparison of budget data by generating simple and interactive visualisations, which can be downloaded for reuse. Detailed descriptions are included to help users understand the specificities of calculation for the indicators presented. The dashboard also provides data on a few macro and receipts indicators across states.',
  health: {
    logo: health,
    data_count: 1,
    desc: 'Health',
  },
  receipts: {
    logo: rcpt_ind,
    data_count: 1,
    desc: 'receipts',
  },
  aggregate_budget: {
    logo: agg_bud,
    data_count: 1,
    desc: 'receipts',
  },
  education: {
    logo: edu,
    data_count: 1,
    desc: 'Education',
  },
  agriculture: {
    logo: agri,
    data_count: 1,
    desc: 'Agriculture and Allied Activities',
  },
  food: {
    logo: food,
    data_count: 1,
    desc: 'Food, Civil Supplies and Cooperation',
  },
  environment: {
    logo: forest,
    data_count: 1,
    desc: 'Forest and Environment',
  },
  rural_development: {
    logo: rural,
    data_count: 1,
    desc: 'Rural Development',
  },
  power: {
    logo: power,
    data_count: 1,
    desc: 'Power and Energy',
  },
  irrigation: {
    logo: irrig,
    data_count: 1,
    desc: 'Irrigation and Water Resources',
  },
  public_works: {
    logo: works,
    data_count: 1,
    desc: 'Public Works',
  },
  urban_development_and_housing: {
    logo: urban,
    data_count: 1,
    desc: 'urban',
  },
  comingsoon: [
    {
      title: 'Social Welfare',
      slug: '#',
      logo: social,
      data_count: 0,
      desc: 'Social Welfare',
    },
  ],
};

export default SchemesData;
