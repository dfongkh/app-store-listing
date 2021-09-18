import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import AppListing from "../components/AppListing";
import AppRecommend from "../components/AppRecommend";
import SearchBar from "../components/SearchBar";
import GlobalStyles from "../theme/globalStyles";
import theme from "../theme/theme";

const MainPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleQuery = (value: string) => {
    setQuery(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SearchBar handleQuery={handleQuery} query={query} />
      <AppRecommend />
      <AppListing searchQuery={query} />
    </ThemeProvider>
  );
};

export default MainPage;
