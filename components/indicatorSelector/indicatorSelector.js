import React, { useState, useEffect } from 'react';
import IndicatorRadioButton from 'components/indicatorRadioButton/indicatorRadioButton';

const IndicatorSelector = (props) => {
  const indicators = props.schemeData && Object.keys(props.schemeData.data);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedData, setSearchedData] = useState(indicators);

  useEffect(() => {
    const filteredData = indicators.filter((indicator) => {
      const name = props.schemeData.data[indicator].name.toLowerCase();
      return name.includes(searchTerm);
    });
    setSearchedData(filteredData);
  }, [searchTerm, props]);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className="indicator">
      <fieldset className="indicator__wrapper">
        <legend className="screen-reader-text">Select Indicator</legend>
        {searchedData.map((indicator, index) => {
          if (props.schemeData.data[indicator])
            return (
              <IndicatorRadioButton
                checked={indicator === props.activeIndicator}
                key={index}
                indicatorName={indicator}
                schemeSlug={props.currentSlug}
                indicatorData={props.schemeData.data}
              />
            );
          return null;
        })}
      </fieldset>
    </div>
  );
};

export default IndicatorSelector;
