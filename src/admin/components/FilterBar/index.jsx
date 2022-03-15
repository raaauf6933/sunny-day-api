import React from "react";
import FilterTabs from "./../TableFilter/FilterTabs";
import FilterTab from "./../TableFilter/FilterTab";

const FilterBar = ({ tabs, currentTab, onTabChange, loading }) => {
  return (
    <>
      <FilterTabs currentTab={currentTab}>
        {tabs.map((tab, tabIndex) => {
          return (
            <FilterTab
              onClick={() => onTabChange(tabIndex)}
              label={tab}
              key={tabIndex}
              disabled={loading}
            />
          );
        })}
      </FilterTabs>
    </>
  );
};

export default FilterBar;
