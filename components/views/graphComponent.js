/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-deprecated */

import React from 'react';
import Select from 'react-select';
import {
  Hint,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  VerticalBarSeries,
  YAxis,
  makeWidthFlexible,
  ChartLabel,
  LabelSeries
} from 'react-vis';

import 'node_modules/react-vis/dist/style.css';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);
class GraphComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      value: [],
      budgetAttr: 'A',
      selectedFigures: null,
      stateOptions: null,
      hoverValue: null,
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getrecord_figures = this.getrecord_figures.bind(this);
    this.onBarHover = this.onBarHover.bind(this);
    this.outBarHover = this.outBarHover.bind(this);
    this.setBudgetAttr = this.setBudgetAttr.bind(this);
  }

  componentWillMount() {
    this.getrecord_figures();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.budgetAttr != this.props.budgetAttr) {
      this.setState({ budgetAttr: this.props.budgetAttr });
    }

    if (
      prevState.value != this.state.value ||
      prevState.budgetAttr != this.props.budgetAttr ||
      prevProps.schemeData != this.props.schemeData
    ) {
      if (this.state.value.length != 0) {
        const stateArray = this.state.value.map((states) => states.value);

        const mungedFigures = [];
        stateArray.forEach((state) => {
          const tempState = {};
          tempState.name = this.props.stateCodes[state];
          tempState.figures = [];
          Object.keys(this.props.schemeData).forEach((financialYear) => {
            const tempFigure = {};
            tempFigure.x = financialYear;
            tempFigure.y = Number.isNaN(
              parseFloat(this.props.schemeData[financialYear][state])
            )
              ? 0
              : parseFloat(this.props.schemeData[financialYear][state]);
            tempFigure.grpby_name = this.props.stateCodes[state];
            tempState.figures.push(tempFigure);
          });
          mungedFigures.push(tempState);
        });
        if (this.state.value[0] == null && prevState.value != null) {
          this.setState({ selectedFigures: null });
        } else {
          this.setState({ selectedFigures: mungedFigures });
        }
      }
    }
  }

  handleSelectChange(value) {
    if (value === null) {
      this.setState({ value: [] });
    } else {
      this.setState({ value });
    }
  }

  onBarHover(d) {
    this.setState({ hoverValue: d });
  }

  getrecord_figures() {
    let statesData = [];
    statesData = Object.keys(this.props.stateCodes).map((state) => {
      const temp = {};
      temp.value = state;
      temp.label = this.props.stateCodes[state];
      return temp;
    });

    this.setState({ stateOptions: statesData });
  }

  setBudgetAttr() {
    this.setState({ budgetAttr: this.props.budgetAttr });
  }

  handleNoOptionsMessage = () =>
    this.state.value.length > 14
      ? 'Oops! Only 15 states can be selected at a time.'
      : 'No results found';

  outBarHover() {
    this.setState({ hoverValue: null });
  }

  render() {
    const accessthis = this;
    const color = [
      '#19165C',
      '#FFC2E2',
      '#38663A',
      '#FFD873',
      '#0F5C66',
      '#6E67EB',
      '#EB67AD',
      '#7FE984',
      '#CCA43D',
      '#3DCCC3',
      '#CFCCFF',
      '#672448',
      '#C2FFC5',
      '#664E0F',
      '#73FFFF',
    ];
    const items =
      this.state.selectedFigures &&
      this.state.selectedFigures.map((value, index) => ({
        title: value.name,
        color: color[index],
      }));
    return (
      <div className="scheme-compare">
        <label htmlFor="selectInput">Select States</label>
        <Select
          inputId="selectInput"
          isMulti
          simpleValue
          value={this.state.value}
          placeholder=""
          noOptionsMessage={this.handleNoOptionsMessage}
          options={
            this.state.value.length < 15
              ? this.state.stateOptions
              : this.state.value
          }
          onChange={this.handleSelectChange}
        />

        {this.state.value[0] != null && this.state.selectedFigures != null ? (
          <div className="compare__wrapper">
            {items.map((legend, index) => (
              <div className="compare__state" key={index}>
                <div
                  className="compare__square"
                  style={{ backgroundColor: legend.color }}
                />
                <p className="page-introduction-text compare__text">
                  {legend.title}
                </p>
              </div>
            ))}
          </div>
        ) : null}
        <div className="compare__viz">
          {this.state.value[0] != null && this.state.selectedFigures != null ? (
            <div id="chart" style={{ backgroundColor: 'white' }}>
              <FlexibleXYPlot
                height={350}
                xType="ordinal"
                margin={{ top: 20, left: 70, right: 10, bottom: 40 }}
              >
                <HorizontalGridLines />

                <VerticalGridLines />
                {this.state.selectedFigures.map((state, index) => (
                  <VerticalBarSeries
                    color={color[index]}
                    onValueMouseOver={accessthis.onBarHover}
                    onValueMouseOut={accessthis.outBarHover}
                    data={state.figures}
                    key={state.name}
                  />
                  
                ))}
                <XAxis />
                <YAxis />
		<ChartLabel
		    text="Fiscal Years"
		    className="alt-x-label"
		    includeMargin
		    xPercent={0.5}
		    yPercent={0.8}
		    />
		 <ChartLabel
		    text="Indicator"
		    className="alt-y-label"
		    includeMargin
		    xPercent={0.02}
		    yPercent={0.2}
		    style={{
		      transform: 'rotate(-90)',
		      textAnchor: 'end'
		    }}
		 />

                {this.state.hoverValue ? (
                  <Hint value={this.state.hoverValue}>
                    <div className="rv-hint__content">
                      <div>
                        <span className="rv-hint__title">
                          {' '}
                          {this.state.hoverValue.grpby_name}
                        </span>
                        <br />
                        <span className="rv-hint__title">Fiscal Year : </span>
                        <span className="rv-hint__value">
                          {this.state.hoverValue.x}
                        </span>
                      </div>
                      <div>
                        <span className="rv-hint__title">Figure : </span>
                        <span className="rv-hint__value">
                          {this.state.hoverValue.y}
                        </span>
                      </div>
                    </div>
                  </Hint>
                ) : null}
              </FlexibleXYPlot>
            </div>
          ) : (
            <div className="compare__placeholder">
              <p>Select states to generate Visualization</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default GraphComponent;
