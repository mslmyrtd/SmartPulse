import axios from "axios";
import { useEffect, useState } from "react";

const Main = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios(
      `https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2022-01-26&startDate=2022-01-26`
    );
  };

  return <div></div>;
};

export default Main;
