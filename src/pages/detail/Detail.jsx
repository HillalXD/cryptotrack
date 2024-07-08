import React from 'react'
import "./detail.scss"
import axios from "axios"
import { useQuery } from '@tanstack/react-query'
import Error from '../error/Error';
import { useParams } from "react-router-dom";
import Charts from '../../components/Charts';
import Loading from '../../components/Loading';


function Detail() {
  const { coinName } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['detail', coinName],
    queryFn: async () => {
      const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`)
      return response.data.data
    }
  })

  if (isPending) return <Loading />

  if (error) return <Error />

  console.log(data)

  function fdv(price, maxSupply) {
    return parseFloat(price) * parseFloat(maxSupply)
  }

  return (
    <div className="container">
      <div className="detail-container">
        <h1>{data.name}</h1>
        <div className="crypto-data">
            <div className="left-data">
              <h3>${parseFloat(data.priceUsd) < 1
                  ? Intl.NumberFormat('en-US', {maximumFractionDigits: 4}).format(parseFloat(data.priceUsd))
                  : Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(parseFloat(data.priceUsd))}
              </h3>
              <div className="onchain-data">
                <p className='data-title'>Market cap</p>
                <p className='data'>${Intl.NumberFormat('en-US').format(parseFloat(data.marketCapUsd))}</p>
              </div>
              <div className="onchain-data">
                <p className='data-title'>FDV</p>
                <p className='data'>${Intl.NumberFormat('en-US').format(parseFloat(fdv(data.priceUsd, data.maxSupply)))}</p>
              </div>
              <div className="onchain-data">
                <p className='data-title'>24H Vol </p>
                <p className='data'>${Intl.NumberFormat('en-US').format(parseFloat(data.volumeUsd24Hr))}</p>
              </div>
              <div className="onchain-data">
                <p className='data-title'>Circ. Supply</p>
                <p className='data'>{Intl.NumberFormat('en-US').format(parseInt(data.supply))}</p>
              </div>
              <div className="onchain-data">
                <p className='data-title'>Max Supply</p>
                <p className='data'>{Intl.NumberFormat('en-US').format(parseInt(data.maxSupply))}</p>
              </div>
              <div className="onchain-data">
                <p className='data-title'>24H VWAP</p>
                <p className='data'>{Intl.NumberFormat('en-US').format(parseFloat(data.vwap24Hr))}</p>
              </div>
            </div>
            <div className="right-data">
              <Charts coin={coinName}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Detail