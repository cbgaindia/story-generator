import { receipts_data } from "../data/receipts_data";
import { expenditure_data }  from "../data/expenditure_data";
import { expenditure_metadata } from "../data/expenditure_metadata";
import { receipts_metadata } from "../data/receipts_metadata";
import { expenditure_concordance_data } from "../data/expenditure_concordance_data";
import { DataKindBLR } from "../styles/DataKindBLR.png";
let appConfig = {
	"app.title" : "Story Generator",
	"app.version" : "ALPHA"
		
};

let homeComponent = {
	"primary_header": "OpenBudgets India", // Text Only
	"secondary_header" : "Story Generator", // Text 
	"description" : "The Story Generator is a tool that facilitates comparison of aggregate budget indicators across different states and years. It incorporates data from both the expenditure and the receipts side of State Budgets. The indicators of expenditure data have been classified into twelve social and economic sectors. It enables users to make inter-state comparison of budget data by generating simple and interactive visualisations, which can be downloaded for reuse. Detailed descriptions are included to help users understand the specificities of calculation for the indicators presented. ",
	"contributor_organizations" : [{
		"url": "https://raw.githubusercontent.com/cbgaindia/portal-design/master/logo_OBI/logo_types/light_bg_logo/draft_final/logo_with_text/draft_final.png",
		"alt":"OpenBudgetsIndia Logo",
		"image_name":"OpenBudgetsIndia Logo",
		"id":"openbudgetsindia_logo",
		"height": "35",
		"link":"https://openbudgetsindia.org/"
	},{
		"url": "images/DataKindBLR.png",
		"alt":"DataKind Bangalore Logo",
		"image_name":"DataKind Bangalore Logo",
		"id":"datakind_logo",
		"height":"30",
		"link" : "http://www.datakind.org/chapters/datakind-blr"
	}]
};

let leftSideBarComponent = {
	"top_logo": {
		"format" : "text", // text/img
		"text_config" : {
			"text" : "Story Generator", // Null for img and text value if top-logo-format is  
			"release_version" : "ALPHA" // Alpha/PreALPHA/BETA	
		},
		"img_config" :{
			"source": "https://raw.githubusercontent.com/cbgaindia/portal-design/master/logo_OBI/logo_types/light_bg_logo/draft_final/logo_with_text/draft_final.png", // null if text else provide link for images.	
			"width": "270",
			"height" : ""
		}
	},
	"bottom_logo" : { // To represent organization logo.
			"contributor_organizations" : [{
			"url": "https://raw.githubusercontent.com/cbgaindia/portal-design/master/logo_OBI/logo_types/light_bg_logo/draft_final/logo_with_text/draft_final.png",
			"alt":"OpenBudgetsIndia Logo",
			"image_name":"OpenBudgetsIndia Logo",
			"id":"openbudgetsindia_logo",
			"height": "20",
			"link":"https://openbudgetsindia.org/"
		},{	
			"url": "images/DataKindBLR.png",
			"alt":"DataKind Bangalore Logo",
			"image_name":"DataKind Bangalore Logo",
			"id":"datakind_logo",
			"height":"13",
			"link" : "http://www.datakind.org/chapters/datakind-blr"
		}],

		"img_config" :{
			"source": "https://raw.githubusercontent.com/cbgaindia/portal-design/master/logo_OBI/logo_types/light_bg_logo/draft_final/logo_with_text/draft_final.png", // null if text else provide link for images.	
			"width": "250", //Image width
			"height" : "", // Image height
			"link" : "https://openbudgetsindia.org/" // Hyperlink to the organization
		}
	},
	"selection_panel" :{
		"panels" : [
		{
			"isActive" : "true",
			"title" : "Expenditure",
			"title_slug" : "expenditure",
			"heirarchy_level" : "2",
			"data" : expenditure_data	
		},{
			"isActive" : "false",
			"title" : "Receipts",
			"title_slug" : "receipts",
			"heirarchy_level" : "1",
			"data" : receipts_data
		}
		]
	}
};

let appController = {
	dataseries: [{
		"title" : "Expenditure",
		"title_slug" : "expenditure",
		"heirarchy_level" : "2",
		"data" : expenditure_data,
		"primary_header" : "record",
		"secondary_header" : "category_name",
		"meta_data" : expenditure_metadata,
		"addtional_meta_data" : expenditure_concordance_data
	}
	,
	{
		"title" : "Receipts",
		"title_slug" : "receipts",
		"heirarchy_level" : "1",
		"data" : receipts_data,
		"primary_header" : "record",
		"secondary_header" : "null",
		"meta_data" : receipts_metadata,
		"addtional_meta_data" : receipts_metadata
	}]
};

let appComponents = {
	"homeComponent" : homeComponent,
	"leftSideBarComponent" :leftSideBarComponent,
	"appController" : appController
};


export {appConfig, homeComponent, leftSideBarComponent, appComponents, appController};