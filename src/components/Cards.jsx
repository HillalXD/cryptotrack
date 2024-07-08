import React from 'react'
import  { useNavigate } from 'react-router-dom'

const Cards = (props) => {

  const { cryptoData } = props
  cryptoData.map( data => {
    console.log(data.changePercent24Hr)
  })

  function percentageFormatter(num) {
    return `${parseFloat(num).toFixed(2)}%`;
  }

  const navigate = useNavigate()

  function handleClick(event) {
    event.preventDefault()
    const selectedCoin = event.target.getAttribute('value')
    console.log(selectedCoin)
    navigate(`/crypto/${selectedCoin}`)
  }
  

  return (
    <div className="crypto-card">
      <ul className="crypto-data-title" >
        <li>Ticker</li>
        <li className='crypto-name'>Name</li>
        <li>Price</li>
        <li>MarketCap</li>
        <li>Change 24h</li>
      </ul>
      {cryptoData.map( data => (
        <div className="crypto-data" key={data.id} onClick={handleClick} value={data.id}>
          <li value={data.id} className='ticker'>{data.symbol}</li>
          <li value={data.id} className='crypto-name'>{data.name}</li>
          <li value={data.id} className='price'>${parseFloat(data.priceUsd) < 0.001 ? Intl.NumberFormat('en-US', {maximumFractionDigits: 10}).format(parseFloat(data.priceUsd))
          :  Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(parseFloat(data.priceUsd))}</li>
          <li value={data.id} className='mcap'>${Intl.NumberFormat('en-US').format(parseFloat(data.marketCapUsd))}</li>
          <li value={data.id} className={parseFloat(data.changePercent24Hr) > 0 ? "green-cond" : "red-cond"}>{percentageFormatter(parseFloat(data.changePercent24Hr))}</li>
        </div>
      ))}
    </div>
  )
}

export default Cards