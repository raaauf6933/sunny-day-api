import React from "react";
import FilterTabs from "./../TableFilter/FilterTabs";
import FilterTab from "./../TableFilter/FilterTab";

const FilterBar = ({ tabs, currentTab, onTabChange }) => {
  return (
    <>
      <FilterTabs currentTab={currentTab}>
        {tabs.map((tab, tabIndex) => {
          return (
            <FilterTab
              onClick={() => onTabChange(tabIndex)}
              label={tab}
              key={tabIndex}
            />
          );
        })}
      </FilterTabs>
    </>
  );
};

export default FilterBar;
