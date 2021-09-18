import { ActionTypes } from "../constants/action-types";
// import { getAllListings } from "../../lib/Api";
import { getAllListings } from "../../lib/Api";
// import { ThunkDispatch } from 'redux-thunk'
import { Dispatch } from "redux";

export const fetchAllListings = () => async (dispatch: Dispatch) => {
  const data = await getAllListings();
  console.log("getAllListings data", data);
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
  dispatch({
    type: ActionTypes.FETCH_ALL_LISTINGS,
    payload: dataArr,
  });
};

export const fetchAppRecommend = async () => {};
