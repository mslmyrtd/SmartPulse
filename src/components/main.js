import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
const Main = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();
  const all = [];
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios(
        "https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2022-01-26&startDate=2022-01-26"
      );
      setData(
        response.data.body.intraDayTradeHistoryList.filter((item) => {
          return item.conract.includes("PH");
        })
      );
      setIsLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const newData = isLoading
    ? data.sort(
        (a, b) =>
          parseFloat(a.conract.slice(6, 10)) -
          parseFloat(b.conract.slice(6, 10))
      )
    : null;
  console.log(newData);
  return (
    <div className="d-flex justify-content-center mt-10">
      {isLoading ? (
        <div style={{ width: "75%", marginTop: "30px" }}>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Tarih</th>
                <th scope="col">Toplam İşlem Miktarı(MWh)</th>
                <th scope="col">Toplam İşlem Tutarı(TL)</th>
                <th scope="col">Ağırlık Ortalama Fiyat(TL/MWh)</th>
              </tr>
            </thead>
            {newData.map((item) => {
              let list = [];
              for (let k = 1; k < data.length; k++) {
                if (item.conract === data[k].conract) {
                  list.push(data[k]);
                }
                if (
                  k === data.length - 1 &&
                  all.filter((e) => e[0].conract === item.conract).length === 0
                ) {
                  all.push(list);
                }
              }
            })}
            {all.map((item) => {
              const quantity = [];
              const price = [];
              item.map((e) => {
                quantity.push(e.quantity / 10);
                price.push((e.price * e.quantity) / 10);
              });
              let totalQuantity = quantity
                .reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  0
                )
                .toFixed(2);
              let totalPrice = price
                .reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  0
                )
                .toFixed(2);
              return (
                <tbody key={item.id}>
                  <tr>
                    <th scope="row">
                      {item[0].conract.slice(8, 10)}
                      :00
                    </th>
                    <td>{totalQuantity}</td>
                    <td>{totalPrice}</td>
                    <td>{Math.round(totalPrice / totalQuantity)}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      ) : (
        <div
          className="spinner-grow"
          style={{ width: "5rem", height: "5rem", marginTop: "250px" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Main;
