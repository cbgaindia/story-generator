import React from 'react';

const IndicatorDefinitionView = (props) => {
  const indicators = Object.keys(props.indicatorData);
  const states = Object.keys(props.schemeData.states);
  return (
    <div className="scheme__notes">
      <div className="notes__notice">
        <div className="notes__decoration" />
        <p className="page-introduction-text">{props.schemeData.description}</p>
      </div>
     <div className="panel-heading">Concordance Table</div>
     <table className="concordance-table">
       	    <thead><tr className="concordance-head"><th className="state-text">States</th><th className="state-text">Details of the Budget Document from which data have been recorded</th></tr></thead>
            <tbody>
	     {states.map((state) => (
		<tr className="mt-3 pb-2 state__row" key={state}>
		  <td className="page-introduction-text state-text">{state}</td>
                  <td className="page-introduction-text state-text">{props.schemeData.states[state]}</td>
                </tr>
	      ))}
            </tbody>
      </table>
      {indicators.map((indicator) => (
        <div className="mt-3 pb-2 notes__section" key={indicator}>
          <h2 className="page-introduction-text">
            <span className="notes__indicator">
              {props.indicatorData[indicator].name}
            </span>{' '}
            ({props.indicatorData[indicator].unit})
          </h2>
          <p className="page-introduction-text notes__text">
            {props.indicatorData[indicator].description}
          </p>
          <p className="page-introduction-text notes__note">
            Note: {props.indicatorData[indicator].note}
          </p>
        </div>
      ))}
        <div className="mt-3 pb-2 notes__section" key={props.schemeData.generalnotes}>
          <h2 className="page-introduction-text">
            <span className="notes__indicator">
              General Notes:
            </span>{' '}
            ({props.schemeData.generalnotes})
          </h2>
        </div>
    </div>
  );
};

export default IndicatorDefinitionView;
