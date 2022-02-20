import React from "react";
import { SelectInput } from "vcc-ui";
import { FilterOptions } from "../types";

type Props = {
  filterSelection: FilterOptions;
  setFilterSelection: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

function FilterBar({ filterSelection, setFilterSelection }: Props) {
  return (
    <SelectInput
      value={filterSelection}
      onChange={(e) => {
        console.log(e.target.value);
        setFilterSelection(e.target.value as FilterOptions);
      }}
    >
      <option value="all">all</option>
      <option value="sedan">sedan</option>
      <option value="estate">estate</option>
      <option value="suv">suv</option>
    </SelectInput>
  );
}

export default FilterBar;
