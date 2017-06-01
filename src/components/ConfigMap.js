import {receipts_data} from "../data/receipts_data";
import {expenditure_data} from "../data/expenditure_data";

let appConfig = {
	"app.title" : "Story Generator",
	"app.version" : "ALPHA"
		
};

let homeComponent = {
	"primary_header": "OpenBudgets India", // Text Only
	"secondary_header" : "Story Generator", // Text 
	"description" : "Select an indicator to generate the visualizations"
}

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
			"height" : "",
		}
	},
	"bottom_logo" : { // To represent organization logo.
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
		],
	}
}
let appComponents = {
	"homeComponent" : homeComponent,

	"leftSideBarComponent" :leftSideBarComponent

}

export {appConfig, homeComponent, leftSideBarComponent, appComponents};