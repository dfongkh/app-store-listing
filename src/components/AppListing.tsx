import React, { useEffect, useState, useRef, useCallback } from "react";
import { getAllListings, getListing } from "../lib/Api";
import AppListingItem from "./AppListingItem";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Fuse from "fuse.js";

const AppListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IAppListingProps {
  searchQuery: string;
}

interface IAllListing {
  fullList: {
    id: string;
    name: string;
    image: string;
    categoryLabel: string;
    categoryTerm: string;
    summary: string;
    artist: string;
  }[];
}

interface IDisplayListing {
  displayList: {
    name: string;
    image: string;
    categoryLabel: string;
    rating: number;
    ratingCount: string;
  }[];
}
const AppListing: React.FC<IAppListingProps> = (props) => {
  const { searchQuery } = props;
  const [allListing, setAllListing] = useState<IAllListing["fullList"]>([]);
  const [displayListing, setDisplayListing] = useState<
    IDisplayListing["displayList"]
  >([]);
  const [searchListing, setSearchListing] = useState<any[]>([]);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  useEffect(() => {
    // setLoading(true);
    async function fetchAllListings() {
      const data = await getAllListings();
      console.log(data);
      // formatData(data);
      const dataArr: any[] = [];
      data.feed.entry.forEach((item: any) => {
        const format = (input: any) => {
          return {
            id: item.id.attributes["im:id"],
            name: input["im:name"].label,
            image: input["im:image"][1].label,
            categoryLabel: input.category.attributes.label,
            categoryTerm: input.category.attributes.term,
            summary: input.summary.label,
            artist: input["im:artist"].label,
          };
        };
        dataArr.push(format(item));
      });
      setAllListing(dataArr);
    }
    fetchAllListings();
    // setLoading(false);
  }, []);

  useEffect(() => {
    console.log("allListing", allListing);
    fetchPageListings(0, 10);
  }, [allListing]);

  // useEffect(() => {
  //   console.log("displayListing", displayListing);
  // }, [displayListing]);

  useEffect(() => {
    //app name, category, author or summary
    setDisplayListing([]);
    setHasMoreData(true);
    if (searchQuery) {
      const fuse = new Fuse(allListing, {
        keys: ["name", "categoryLabel", "categoryTerm", "summary", "artist"],
      });
      const result = fuse.search(searchQuery);
      console.log("search result", result);
      setSearchListing(result);
    } else {
      fetchPageListings(0, 10);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchPageListings(0, Math.min(10, searchListing.length), true);
  }, [searchListing]);

  const fetchPageListings = async (
    startIndex: number,
    endIndex: number,
    searching?: boolean
  ) => {
    const listingArr = searching
      ? searchListing.slice(startIndex, endIndex)
      : allListing.slice(startIndex, endIndex);
    const dataArr: IDisplayListing["displayList"] = [];
    for (const eachItem of listingArr) {
      const listing = searching ? eachItem.item : eachItem;
      const AppId = listing.id;
      const moreData = await getListing(AppId);
      // console.log("moreData", moreData);
      console.log(listing.name);
      const format = (item: any, moreData: any) => {
        return {
          name: item.name,
          image: item.image,
          categoryLabel: item.categoryLabel,
          // id: item.id.attributes["im:id"],
          rating: Math.round(moreData.results[0].averageUserRating),
          ratingCount: formatComaSeperator(moreData.results[0].userRatingCount),
        };
      };
      dataArr.push(format(listing, moreData));
    }
    setDisplayListing((displayListing) => [...displayListing, ...dataArr]);
  };

  const formatComaSeperator = (x: string) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  const fetchMoreData = () => {
    if (searchQuery) {
      const current = displayListing.length;
      const total = searchListing.length;
      const diff = total - current;
      if (diff < 10) setHasMoreData(false);
      const nextIterate = diff < 10 ? diff : 10;
      fetchPageListings(current, current + nextIterate, true);
    } else {
      const len = displayListing.length;
      if (len >= 90) setHasMoreData(false);
      fetchPageListings(len, len + 10);
    }
  };

  return (
    <AppListingWrapper>
      <InfiniteScroll
        dataLength={displayListing.length}
        next={fetchMoreData}
        hasMore={hasMoreData}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Top {displayListing.length} Free Apps Shown</b>
          </p>
        }
      >
        {displayListing.map((item, idx) => {
          return <AppListingItem key={idx} idx={idx} displayItem={item} />;
        })}
      </InfiniteScroll>
    </AppListingWrapper>
  );
};

export default AppListing;
