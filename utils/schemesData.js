import health from 'public/Images/schemesLogos/health.png';

import agri 	from 'public/Images/schemesLogos/Agriculture and Allied Activities.png';
import agg_bud  from 'public/Images/schemesLogos/Aggregate Budget Indicators.png';
import rcpt_ind from 'public/Images/schemesLogos/Receipts Indicators.png';
import edu 	from 'public/Images/schemesLogos/Education.png';
import food	from 'public/Images/schemesLogos/Food, Civil Supplies and Cooperation.png';
import forest	from 'public/Images/schemesLogos/Forests and Environment.png';
import irrig	from 'public/Images/schemesLogos/Irrigation and Water Resources.png';
import power	from 'public/Images/schemesLogos/Power and Energy.png';
import works 	from 'public/Images/schemesLogos/Public Works.png';
import rural    from 'public/Images/schemesLogos/Rural Development.png';
import social	from 'public/Images/schemesLogos/Social Welfare.png';
import urban    from 'public/Images/schemesLogos/Urban Development and Housing.png';


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
  comingsoon : [
          {
	    title: "Agriculture and Allied Activities",
	    slug: "#",
	    logo: agri,
	    data_count: 0,
	    desc: 'Agriculture and Allied Activities',
	  },
	  {
	    title: "Aggregate Budget Indicators",
	    slug: "#",
	    logo: agg_bud,
	    data_count: 0,
	    desc: 'Aggregate Budget Indicators',
	  },
	  {
	    title: "Education",
	    slug: "#",
	    logo: edu,
	    data_count: 0,
	    desc: 'Education',
	  },
	  {
	    title: "Food, Civil Supplies and Cooperation",
	    slug: "#",
	    logo: food,
	    data_count: 0,
	    desc: 'Food, Civil Supplies and Cooperation',
	  },
	  {
	    title: "Forests and Environment",
	    slug: "#",
	    logo: forest,
	    data_count: 0,
	    desc: 'Forests and Environment',
	  },
	  {
	    title: "Irrigation and Water Resources",
	    slug: "#",
	    logo: irrig,
	    data_count: 0,
	    desc: 'Irrigation and Water Resources',
	  },
	  {
	    title: "Power and Energy",
	    slug: "#",
	    logo: power,
	    data_count: 0,
	    desc: 'Power and Energy',
	  },
	  {
	    title: "Rural Development",
	    slug: "#",
	    logo: rural,
	    data_count: 0,
	    desc: 'Rural Development',
	  },
	  {
	    title: "Social Welfare",
	    slug: "#",
	    logo: social,
	    data_count: 0,
	    desc: 'Social Welfare',
	  },
	  {
	    title: "Urban Development and Housing",
	    slug: "#",
	    logo: urban,
	    data_count: 0,
	    desc: 'urban',
	  },
	  {
	    title: "Public Works",
	    slug: "#",
	    logo: works,
	    data_count: 0,
	    desc: 'Public Works',
	  },
  ]

};



export default SchemesData;
