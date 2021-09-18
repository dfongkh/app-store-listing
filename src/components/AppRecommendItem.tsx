import React from "react";
import styled from "styled-components";

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70px;
`;

const ItemImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 16px;
`;

const TextDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

const Text = styled.h4`
  text-align: left;
  font-size: 10px;
  margin: 4px 0px 0px;
  color: ${(p: StyleProps) => (p.greyText ? "#858585" : "#000")};
`;

export interface IAppRecommendItemProps {
  data: {
    name: string;
    image: string;
    categoryLabel: string;
  };
}

interface StyleProps {
  greyText?: boolean;
}

const AppRecommendItem: React.FC<IAppRecommendItemProps> = ({ data }) => {
  return (
    <ItemWrapper>
      <ItemImage src={data.image} />
      <TextDiv>
        <Text>{data.name}</Text>
      </TextDiv>
      <Text greyText>{data.categoryLabel}</Text>
    </ItemWrapper>
  );
};

export default AppRecommendItem;
