import React from 'react';
import { Link, IndexLink } from 'react-router';
import {expenditure_data} from "../../../../data/expenditure_data";

const tabData = [
  { name: 'Expenditure', isActive: true }
];

class Tabs extends React.Component{
  render() {
    return (
      <ul className="nav nav-tabs nav-justified">
        {tabData.map(function(tab){
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
        <a href="#">{this.props.data.name}</a>
      </li>
    );
  }
}

Tab.propTypes = {
   params: React.PropTypes.object
};

function SubIndicators(props){
  const subIndicators = props.subIndicators;
  const slugSector =props.slugSector
  const indicatorList = subIndicators.map((indicator) =>
    ( 
      <li className="list-group-item" key={indicator.indicator}>
        <Link to={"/expenditure/"+slugSector+"/"+indicator.slugIndicator}> {indicator.indicator}</Link> 
      </li>
      ))
  return(
      <ul className="list-group"> 
        {indicatorList}     
      </ul>
    );
  }

function SectorList(props) {
  const sectors = props.sectors;

  const listItems = sectors.map((sector) =>
    ( 

      <div className="panel panel-default">
          <div className="panel-heading">
              <h4 className="panel-title">
      <a data-toggle="collapse" className="collapsed" data-parent="#accordion" href={"#" + sector.slugSector}>{sector.sector}</a>
      </h4>
          </div>
          <div id={sector.slugSector} className="panel-collapse collapse ">           
                <SubIndicators sector={sector.sector} subIndicators={sector.subIndicators} slugSector={sector.slugSector} />
          </div>
      </div>
      )
    )

  return (
    <div className="panel-group select-panel" id="accordion" > 
      {listItems}
    </div>

  );
}

class Content extends React.Component{
  render() {
    return (
      <div>
        {this.props.activeTab.name === 'Expenditure' ? 
        <section className="panel panel-success card-box-shadow">
          <SectorList sectors={expenditure_data} />
        </section>
        :null} 
        {this.props.activeTab.name === 'Revenue' ? 
        <section className="panel panel-success card-box-shadow">
        </section>
        :null} 
      </div>
    );
  }
}



class TabsPanel extends React.Component{
  constructor() {
    super();
    this.state = {
      activeTab: tabData[0]
    }
  }
  
  handleClick(tab) {
    this.setState({activeTab: tab});
  }
  render() {
    return (
      <div>
        <Tabs activeTab={this.state.activeTab} changeTab={this.handleClick} />
        <Content activeTab={this.state.activeTab} />
      </div>
    );
  }
}

export default TabsPanel;