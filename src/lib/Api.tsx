import axios from "axios";

///hk/rss/topfreeapplications/limit=100/json

export const getAllListings = async () => {
  return await axios
    .get("hk/rss/topfreeapplications/limit=100/json")
    .then((res) => {
      console.log("res", res);
      return res.data;
      // return JSON.parse(res);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getListing = async (AppId: string) => {
  return await axios
    .get(`hk/lookup?id=${AppId}`)
    .then((res) => {
      // console.log("res", res);
      return res.data;
      // return JSON.parse(res);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getAppRecommend = async () => {
  return await axios
    .get("hk/rss/topgrossingapplications/limit=10/json")
    .then((res) => {
      console.log("res", res);
      return res.data;
      // return JSON.parse(res);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
