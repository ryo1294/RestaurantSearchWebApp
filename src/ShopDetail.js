import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import "./ShopDetail.css"

const ShopDetail = () => {
  const [shop, setShop] = useState(null);
  const [pageTitle, setPageTitle] = useState("レストラン検索 - result");
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const axiosData = async () => {
      try {
        // CORSプロキシを介してAPIにアクセス
        const response = await axios(`http://localhost:8000/getHotPepperData?id=${id}&format=json`);

        setShop(response.data.results.shop[0]);
        setPageTitle("レストラン検索 - " + response.data.results.shop[0].name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    axiosData();
  },[]);


  if (shop === null) return;


  // 店舗情報一覧に記載する情報リスト
  const infoList = {
    list: [
      {name: "店舗名称", value: shop.name},
      {name: "住所", value: shop.address},
      {name: "アクセス", value: shop.access},
      {name: "ジャンル", value: shop.genre.name + " ｜ " + shop.genre.catch},
      {name: "営業時間", value: shop.open},
      {name: "定休日", value: shop.close},
      {name: "総席数", value: shop.capacity},
      {name: "平均予算", value: shop.budget.average},
      {name: "料金備考", value: shop.budget_memo},
    ]
  }

  return (
    <div>
      <Header title={pageTitle} />
      <div className='shopDetail'>
        <div className='shopDetailHeader'>
          <div className='shopDetailImage'>
            <img src={shop.logo_image} alt='ロゴ画像' />
          </div>
          <div className='shopDetailText'>
            <p className='name'>{shop.name}</p>
            <p>住所<br />・{shop.address}</p>
            <p>営業時間<br />・{shop.open}</p>
          </div>
        </div>

        <div className="shopDetailMap shopDetailItem">
          <p className='title'>マップ情報</p>
          <iframe
            width="600"
            height="450"
            title='map'
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${shop.lng},${shop.lat}`} 
            >
          </iframe>
        </div>

        <div className='shopDetailTable shopDetailItem'>
          <p className='title'>店舗情報</p>
          <table>
            <tbody>
              {infoList.list.map(info => (
                <tr key={info.name}>
                  <th>{info.name}</th>
                  <td>{info.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p></p>
      
    </div>
  );
}

export default ShopDetail;