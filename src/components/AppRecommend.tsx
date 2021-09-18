import React, { useEffect, useState } from "react";
// import { getAppRecommend } from "../lib/Api";
import { getAppRecommend } from "../lib/Api";
import AppRecommendItem from "./AppRecommendItem";
import styled from "styled-components";

const AppRecommendWrapper = styled.div`
  margin-left: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e4e4e4;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* overflow: scroll; // Mobile */
  /* display: grid;
  grid-template-columns: ; */
  /* width: 40px; */
  gap: 10px;

  @media ${({ theme }) => theme.mediaQueries["below-576"]} {
    flex-wrap: nowrap;
    overflow: scroll;
  }
`;

const Title = styled.h2`
  text-align: left;
  font-size: 20px;
  line-height: 20px;
`;

interface IAppRecommendState {
  recommendList: {
    name: string;
    image: string;
    categoryLabel: string;
    categoryTerm: string;
    summary: string;
    artist: string;
  }[];
}

const AppRecommend: React.FC = () => {
  const [recommendList, setRecommendList] = useState<
    IAppRecommendState["recommendList"]
  >([]);

  useEffect(() => {
    // setLoading(true);
    async function fetchAppRecommend() {
      const data = await getAppRecommend();
      console.log("AppRecommenddata", data);
      // formatData(data);
      const dataArr: any[] = [];
      data.feed.entry.forEach((item: any) => {
        const format = (input: any) => {
          return {
            name: input["im:name"].label,
            image: input["im:image"][1].label,
            // category: input.category.attributes.label,
            categoryLabel: input.category.attributes.label,
            categoryTerm: input.category.attributes.term,
            summary: input.summary.label,
            artist: input["im:artist"].label,
          };
        };
        dataArr.push(format(item));
      });
      setRecommendList(dataArr);
    }
    fetchAppRecommend();
    // setLoading(false);
  }, []);

  useEffect(() => {
    console.log("recommendList", recommendList);
  }, [recommendList]);

  // const formatData = (data: any) => {
  //   const dataArr: object[] = [];
  //   data.feed.entry.forEach((item: any) => {
  //     const format = (input: any) => {
  //       return {
  //         name: input["im:name"].label,
  //         image: input["im:image"][1].label,
  //         category: input.category.attributes.label,
  //       };
  //     };
  //     dataArr.push(format(item));
  //   });
  //   setData(dataArr);
  // };
  // console.log(data);

  return (
    <AppRecommendWrapper>
      <Title>推介</Title>
      <ItemWrapper>
        {recommendList.map((item, idx) => {
          return <AppRecommendItem key={idx} data={item} />;
        })}
      </ItemWrapper>
    </AppRecommendWrapper>
  );
};

export default AppRecommend;
