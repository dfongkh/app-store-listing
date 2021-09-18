import React, { useState } from "react";
import styled from "styled-components";

const SearchBarDiv = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 38px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e4e5e6;
`;

const Input = styled.input`
  /* min-width: 300px; */
  width: 100%;
  max-width: 300px;
  height: 24px;
  margin: 0 10px;
  padding: 0 20px;
  background-color: #e4e5e6;
  border: none;
  border-radius: 6px;
  text-align: center;
  &:focus {
    outline: none;
    /* box-shadow: 0px 0px 2px red; */
  }
`;

interface ISearchBarProps {
  handleQuery: (value: string) => void;
  query: any;
}

const SearchBar: React.FC<ISearchBarProps> = (props) => {
  const { handleQuery, query } = props;

  return (
    <SearchBarDiv>
      <Input
        placeholder="Search"
        onChange={(e) => handleQuery(e.target.value)}
        value={query}
      />
    </SearchBarDiv>
  );
};

export default SearchBar;
