import React from 'react';
import RightSidebar from '../views/rightsidebar/RightSidebar';
import ReportView from "../views/reportview/ReportView";
import { appController } from "../ConfigMap";

class AppController extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            heirarchyLevel : this.props.params.heirarchy_level,
            categorySlug : this.props.params.category,
            recordSlug : this.props.params.record,
            series : this.props.route.panelName,
            viewBy: "choropleth",
            budgetAttr : "BE",
            categoryName :null,
            sectorSelected:null, 
            recordData: null,
            sectorName:null,
            recordNotes : null,
            addtional_details :  null
        };
        this.handleChange = this.handleChange.bind(this);
        this.onChangeBudgetAttr =this.onChangeBudgetAttr.bind(this);
        this.setCategoryName = this.setCategoryName.bind(this);
        this.setNotes = this.setNotes.bind(this);
        this.setCategorySlug = this.setCategorySlug.bind(this);
        this.setRecordSlug = this.setRecordSlug.bind(this);
        this.setRecordData = this.setRecordData.bind(this);
        this.setYearChange = this.setYearChange.bind(this);
        this.setAdditionalDetails = this.setAdditionalDetails.bind(this);
    }

    componentWillMount(){    
        this.setCategoryName();
        this.setRecordData();
        this.setState({heirarchyLevel : this.props.params.heirarchy_level,
            categorySlug : this.props.params.category,
            recordSlug : this.props.params.record,
            series : this.props.route.panelName});
        this.setNotes();
        this.setAdditionalDetails();
    }

    componentDidUpdate(prevProps, prevState) {    
        //
        if(prevState.categorySlug != this.props.params.category && this.props.params.heirarchy_level == 2){
            this.setCategorySlug();
            this.setCategoryName();
        }

        if(prevState.recordSlug != this.props.params.record || prevState.categorySlug != this.props.params.category){
            this.setRecordSlug();
            this.setRecordData();
        }

        if(prevState.categorySlug != this.props.params.category || prevState.recordSlug != this.props.params.record || prevState.heirarchyLevel != this.props.params.heirarchy_level){
            this.setNotes();
        }
        
        if(prevProps.params.category != this.props.params.category && this.state.heirarchyLevel == 2){
            this.setAdditionalDetails();
        }
        
        if(prevProps.params.record != this.props.params.record && this.state.heirarchyLevel == 1){
            this.setAdditionalDetails();
        }
    }
    setCategorySlug(){
        this.setState({categorySlug:this.props.params.category});
    }

    setRecordSlug(){
        this.setState({recordSlug:this.props.params.record});
    }

    setRecordData(){
        let currentState = this.state;
        if(this.props.params.heirarchy_level == 2 ){
            let recordData = appController.dataseries.find(function(series){
                return series.title_slug == currentState.series;
                }).data.find(function(category){
                    return category.category_slug == currentState.categorySlug;       
                    }).sub_records.find(function(record){
                        return record.record_slug == currentState.recordSlug;
                        });
            this.setState({recordData:recordData});
        }
        else
        {
            let recordData = appController.dataseries.find(function(series){
                 return series.title_slug == currentState.series;
                    }).data.find(function(record){
                        return record.record_slug == currentState.recordSlug;
                            });
            this.setState({recordData:recordData});
        }
    }


    setCategoryName(){
        let currentState = this.state;
        let categoryName = appController.dataseries.find(function(series){
            if (series.title_slug == currentState.series)
            {
                return series;
            }
        }).data.find(function(category){
            if(category.category_slug == currentState.categorySlug){
                return category;
            }
        }).category_name;
        this.setState({categoryName:categoryName});
    }

    setNotes(){
        let currentState = this.state;
        let currentProps = this.props;
        if(this.props.params.heirarchy_level == 2 ){
            let recordNotes = appController.dataseries.find(function(series){
                return series.title_slug == currentState.series;
                    }).meta_data.find(function(record){
                        return (record.category_slug == currentProps.params.category && record.record_slug == currentProps.params.record);
                        });
        this.setState({recordNotes:recordNotes});
        }
        if(this.props.params.heirarchy_level == 1 ){
            let recordNotes = appController.dataseries.find(function(series){
            {
                return series.title_slug == currentState.series;
            }
            }).meta_data.find(function(record){
            {    
                return record.record_slug == currentProps.params.record;
            }
        });
        this.setState({recordNotes:recordNotes});
        }
    }

    setAdditionalDetails(){
        let currentState = this.state;
        let currentProps = this.props;
        if(this.props.params.heirarchy_level == 2 ){
            let additionalDetails = appController.dataseries.find(function(series){
                return series.title_slug == currentState.series;
                }).addtional_meta_data.find(function(category){
                    return (category.category_slug == currentProps.params.category);
                    });
        this.setState({addtional_details:additionalDetails});
        }
        else{
            let additionalDetails = appController.dataseries.find(function(series){
                return series.title_slug == currentState.series;
                }).addtional_meta_data.find(function(record){
                    return (record.record_slug == currentProps.params.record);
                    });

        this.setState({addtional_details:additionalDetails});
        }
    }

    handleChange(value){
        this.setState({ viewBy: value });
    }

    onChangeBudgetAttr(value){
        this.setState({ budgetAttr :value});
    }

    setYearChange(value){
        this.setState({selectedYear:value});
    }

    render() {
        return ( 
            <div>
                <div className = "col-lg-10" >
                    <ReportView heirarchyLevel={this.state.heirarchyLevel} 
                                category={this.state.categoryName} 
                                record={this.state.recordData} 
                                recordName={this.state.recordData.record_name} 
                                budgetAttr={this.state.budgetAttr} 
                                viewBy={this.state.viewBy} 
                                recordNotes={this.state.recordNotes} 
                                setYearChange={this.setYearChange} 
                                selectedYear={this.state.selectedYear} 
                                additionalDetails={this.state.addtional_details}
                     />
                </div>
                <div className = "col-lg-2 rightsidebar" >
                    <RightSidebar viewByChange={this.handleChange} budgetAttrChange={this.onChangeBudgetAttr}/> 
                </div>
            </div>
            );
        }
    }

AppController.propTypes = {
   params: React.PropTypes.object,
   route: React.PropTypes.object
};

export default AppController;
