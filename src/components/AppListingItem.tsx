import React from "react";
import styled from "styled-components";

const ListingItem = styled.div`
  display: flex;
  flex-direction: row;
  /* font-size: 20px; */
  align-items: center;
  padding: 10px 0px;
  margin: 0px 10px;
  border-bottom: 1px solid #e4e4e4;
`;

const IndexDiv = styled.div`
  width: 30px;
  /* display: flex;
  justify-content: center; */
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  border: 1px solid #eee;
`;

const InfoDiv = styled.div`
  margin-left: 10px;
`;

const Text = styled.h4`
  text-align: left;
  font-size: ${(p: StyleProps) => (p.name ? "12px" : "10px")};
  margin: 4px 0px 0px;
  color: ${(p: StyleProps) => (p.greyText ? "#858585" : "#000")};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

const RatingDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

interface IAppListingItemProps {
  idx: number;
  displayItem: IAppListingItem;
}

interface IAppListingItem {
  name: string;
  image: string;
  categoryLabel: string;
  rating: number;
  ratingCount: string;
}

interface StyleProps {
  name?: boolean;
  greyText?: boolean;
}

const AppListingItem: React.FC<IAppListingItemProps> = (props) => {
  const { idx, displayItem } = props;
  const { name, image, categoryLabel, rating, ratingCount } = displayItem;

  return (
    <ListingItem>
      <IndexDiv>
        <Text name greyText>
          {idx + 1}
        </Text>
      </IndexDiv>
      <ItemImage src={image} />
      <InfoDiv>
        <Text name>{name}</Text>
        <Text greyText>{categoryLabel}</Text>
        <RatingDiv>
          {/* <div>rating</div> */}
          <Text greyText>({ratingCount})</Text>
        </RatingDiv>
      </InfoDiv>
    </ListingItem>
  );
};

export default AppListingItem;
