import React from 'react';
import { Link, IndexLink } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';


class Tabs extends React.Component{
  render() {
    return (
      <ul className="nav nav-tabs nav-justified">
        {this.props.panelTabs.map(function(tab){
          return (
            <Tab data={tab}  isActive={this.props.activeTab === tab} handleClick={this.props.changeTab.bind(this,tab)} />
          );
        }.bind(this))}      
      </ul>
    );
  }
}


class Tab extends React.Component{
  render() {
  	
    return (
   
      <li onClick={this.props.handleClick} className={this.props.isActive ? "active" : null}>
         <Link to={"#"}>	{this.props.data.title}   </Link> 
      </li>
     
    );
  }
}

Tab.propTypes = {
   params: React.PropTypes.object
};

class Records extends React.Component{

   render(){
   	 let props = this.props
   	let category = this.props.slug_category
    let indicatorList = this.props.subRecords.map(function(record){

    return ( 
      <g>
      {props.categoryName == "null"?
        (<Link className= "list-item-single-links" to={props.panelTitle+ "/" + record.record_slug }><li className="list-group-item" key={record.record_name}> {record.record_name}</li></Link>) 
		:
		(<Link className= "list-item-links" to={props.panelTitle+"/"+ props.slugCategory +"/"+record.slug_record_name }><li className="list-group-item" key={record.record_name}> {record.record_name}</li></Link>)	
		}      
		</g>
      )})
    
  return(
      <ul className="list-group"> 
        {indicatorList}     
      </ul>
    );
  }
}

class PanelList extends React.Component{
  render(){
	let listItems = null;
	if(this.props.panelContent.heirarchy_level == 2)
	{	
		let panelTitle = this.props.panelContent.title_slug
		listItems = this.props.panelContent.data.map(function(category){
		return ( 
	     <div className="panel panel-default">
	          <div className="panel-heading">
	              <h4 className="panel-title">
			      <a data-toggle="collapse" className="collapsed" data-parent="#accordion" href={"#" + category.slug_category} >{category.category_name}</a>
			      </h4>
	          </div>
	          <div id={category.slug_category} className="panel-collapse collapse ">           
	                <Records categoryName={category.category_name} subRecords={category.sub_records} slugCategory={category.slug_category} panelTitle={panelTitle} />
	          </div>
	      </div>
	      )
		})
	}

	else if(this.props.panelContent.heirarchy_level == 1){	
		listItems = (
			<Records categoryName={"null"} subRecords={this.props.panelContent.data} panelTitle={this.props.panelContent.title_slug} />
			)
	}
  return (
    <div className="panel-group select-panel" id="accordion" > 
 		{listItems}
    </div>
  );
}
}

class PanelContent extends React.Component{
  render() {
    return (  
        <section className="panel panel-success card-box-shadow">
          <PanelList panelContent={this.props.activeTab} />
        </section>
    );
  }
}

class TabsPanel extends React.Component{
  constructor() {
    super();
    this.state = {
    panelData : null, 
     activeTab: null
    }
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick(tab) {
    this.setState({activeTab: tab});
  }

  componentWillMount(){
  	this.setState({
  		panelData : this.props.panelData, 
     	activeTab: this.props.panelData[0]
     })
  }
  render() {
    return (
      <div className ="row-fluid">
        <Tabs activeTab={this.state.activeTab} changeTab={this.handleClick} panelTabs={this.props.panelData}/>
        <PanelContent activeTab={this.state.activeTab} />
      </div>
    );
  }
}


export default TabsPanel;
