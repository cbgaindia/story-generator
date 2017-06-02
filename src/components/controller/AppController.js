import React from 'react';
import RightSidebar from '../views/rightsidebar/RightSidebar';
import Choropleth from "../views/visualization/Choropleth";
import GraphComponent from "../views/visualization/GraphComponent";
import { expenditure_data } from "../../data/expenditure_data";
import ReportView from "../views/reportview/ReportView";

const exp_data = expenditure_data;
class AppController extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            budgetAttr:"BE",
            viewBy: "choropleth",
            sectorSelected:null, 
            figData: exp_data, 
            indicatorData: null,
            sectorName:null };
        this.handleChange = this.handleChange.bind(this);
        this.onChangeBudgetAttr =this.onChangeBudgetAttr.bind(this);
    }

    componentWillMount() {
        /*
        const indicator_data = this.state.figData.find((sector) => {
                return this.props.params.sector == sector.slugSector;
            }).subIndicators.find((indicator) => {
                return this.props.params.indicator == indicator.slugIndicator;
            });
        let sector_name = this.state.figData.find((sector) => {
            return this.props.params.sector == sector.slugSector; 
        }).sector;

        this.setState({indicatorData:indicator_data, sectorName:sector_name, sectorSelected:this.props.params.sector});
    */
    }

    componentDidUpdate(prevProps, prevState) {
        /*
        const indicator_data = this.state.figData.find((sector) => {
                return this.props.params.sector == sector.slugSector;
            }).subIndicators.find((indicator) => {
                return this.props.params.indicator == indicator.slugIndicator;
            });
        let sector_name = this.state.figData.find((sector) => {
            return this.props.params.sector == sector.slugSector; 
        }).sector;
        
        if(prevState.indicatorData != indicator_data){
            this.setState({indicatorData:indicator_data, sectorName:sector_name, sectorSelected:this.props.params.sector});
        }\
        */
    }

    handleChange(value){
        this.setState({ viewBy: value });
    }

    onChangeBudgetAttr(value){
        this.setState({ budgetAttr :value});
    }
   
    render() {
        return ( 
            <div>
                <div className = "col-lg-10" >
                    <ReportView />
                </div>
                <div className = "col-lg-2 rightsidebar" >
                    <RightSidebar viewByChange={this.handleChange} budgetAttrChange={this.onChangeBudgetAttr}/> 
                </div>
            </div>
            );
        }
    }

AppController.propTypes = {
   params: React.PropTypes.object
};

export default AppController;
