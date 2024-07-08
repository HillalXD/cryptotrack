import React from "react";
import "./home.scss";
import Cards from "../../components/Cards";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import Error from "../error/Error";

function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const response = await axios.get("https://api.coincap.io/v2/assets");
      return response.data.data;
    },
  });

  if (isPending) return <Loading />;

  if (error) return <Error />;

  return (
    <div className="container">
      <div className="card-container">
        <h1>CryptoTrack</h1>
        <p>
          Crypto data tracker using{" "}
          <a href="https://docs.coincap.io/">CoinCap API</a>
        </p>
        <Cards cryptoData={data} />
      </div>
    </div>
  );
}

export default Home;
