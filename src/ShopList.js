import React from 'react'
import { Link } from 'react-router-dom';
import './Results.css';

const ShopList = ({ data }) => {
  // データがないなら表示しない
  if (data === null) return;
  // データが０件ならそれを知らせる
  if (data.results.results_available === 0) {
    return (
      <>
        <h3>検索条件に一致するサイトはありませんでした</h3>
      </>
    );
  }

  return (
    <>
      {data.results.shop.map((shop) => (
        <Link className='link' to={`/shop_delites/${shop.id}`} key={shop.id}>
          <div className='shop'>
            
            <div className='imageArea'>
              {/* サムネイル画像 */}
              <img src={shop.photo.pc.l} alt=""></img>
            </div>
            <div className='infoArea'>
              {/* ジャンル/エリア */}
              <p className='genre'>{shop.genre.name}／{shop.small_area.name}</p>
              {/* 店舗名称 */}
              <p className='shopName'>{shop.name}</p>
              {/* アクセス */}
              <p className='access'>{shop.access}</p>
              {/* キャッチコピー */}
              <p className='catch'>{shop.catch}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default ShopList;