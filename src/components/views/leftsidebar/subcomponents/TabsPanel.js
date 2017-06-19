import React from 'react';
import { Link, IndexLink } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';

class Tabs extends React.Component{
render() {
	return (
		<ul className="nav nav-tabs nav-justified">
		{this.props.panelTabs.map(function(tab){
			return (
				<Tab 	data={tab}  
						isActive={this.props.activeTab === tab} 
						handleClick={this.props.changeTab.bind(this,tab)}
						key={tab.title} />
				);
		}.bind(this))}      
		</ul>
		);
	}
}
Tabs.propTypes = {
	activeTab: React.PropTypes.object, 
	panelTabs: React.PropTypes.array, 
	changeTab: React.PropTypes.func
};

class Tab extends React.Component{
  render() {
    return (
      <li onClick={this.props.handleClick} className={this.props.isActive ? "active" : null}>
         <Link to={"#"}> {this.props.data.title}</Link> 
      </li>     
    );
  }
}

Tab.propTypes = {
	data :React.PropTypes.object,
	isActive:React.PropTypes.bool,
	handleClick:React.PropTypes.func
};

class Records extends React.Component{
	render(){
	let props = this.props;
	let heirarchyLevel = this.props.heirarchyLevel;
	let indicatorList = this.props.subRecords.map(function(record){
	return ( 
		<g key={record.record_slug}>
		{props.categoryName == "null"?
			(<Link className= "list-item-single-links" to={"/"+props.panelTitle + "/" + heirarchyLevel + "/" + record.record_slug} key={record.record_slug}><li className="list-group-item" key={record.record_name}> {record.record_name}</li></Link>) 
		:
			(<Link className= "list-item-links" to={"/"+props.panelTitle + "/" + heirarchyLevel + "/" + props.slugCategory + "/" + record.record_slug} key={record.record_slug}><li className="list-group-item" key={record.record_name}> {record.record_name}</li></Link>)	
		}      
		</g>
		);
	});
    
  return(
      <ul className="list-group"> 
        {indicatorList}     
      </ul>
    );
  }
}

Records.propTypes= {
	categoryName : React.PropTypes.string,
	heirarchyLevel : React.PropTypes.string,
	panelTitle: React.PropTypes.string,
	slugCategory : React.PropTypes.string,
	subRecords :	React.PropTypes.array
};

class PanelList extends React.Component{
  render(){
	let listItems = null;
	let heirarchy_level = this.props.panelContent.heirarchy_level ; 
	if(heirarchy_level == 2)
	{	
		let panelTitle = this.props.panelContent.title_slug;
		listItems = this.props.panelContent.data.map(function(category,index){
		return ( 
		<div className="panel panel-default" key={index}>
			<div className="panel-heading">
				<h4 className="panel-title">
					<a data-toggle="collapse" className="collapsed" data-parent="#accordion" href={"#" + category.category_slug} >{category.category_name}</a>
				</h4>
			</div>
			<div id={category.category_slug} className="panel-collapse collapse ">           
				<Records 	categoryName={category.category_name} 
							subRecords={category.sub_records} 
							slugCategory={category.category_slug} 
							panelTitle={panelTitle} 
							heirarchyLevel={heirarchy_level} />
			</div>
		</div>
		);
		});
	}

	else if(heirarchy_level == 1){	
		listItems = (
			<Records 	categoryName={"null"} 
						subRecords={this.props.panelContent.data} 
						panelTitle={this.props.panelContent.title_slug} 
						heirarchyLevel={heirarchy_level} />
			);
	}

  return (
    <div className="panel-group select-panel" id="accordion" > 
		{listItems}
    </div>
  );
}
}

PanelList.propTypes = {
	panelContent:React.PropTypes.object
};

class PanelContent extends React.Component{
  render() {
    return (  
        <section className="panel panel-success card-box-shadow">
          <PanelList panelContent={this.props.activeTab} />
        </section>
    );
  }
}

PanelContent.propTypes = {
	activeTab:React.PropTypes.object
};

class TabsPanel extends React.Component{
  constructor() {
    super();
    this.state = {
    panelData : null, 
     activeTab: null
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentWillMount(){
	this.setState({
	panelData : this.props.panelData, 
	activeTab: this.props.panelData[0]
	});
  }

  handleClick(tab) {
    this.setState({activeTab: tab});
  }

  render() {
    return (
      <div className ="row-fluid">
        <Tabs 	activeTab={this.state.activeTab} 
				changeTab={this.handleClick} 
				panelTabs={this.props.panelData}/>
        <PanelContent activeTab={this.state.activeTab} />
      </div>
    );
  }
}

TabsPanel.propTypes = {
	panelData:React.PropTypes.array
};

export default TabsPanel;
