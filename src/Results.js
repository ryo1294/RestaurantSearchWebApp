import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
import ReactPaginate from 'react-paginate';
import ShopList from './ShopList';
import "./Results.css";
import "./NarrowDown.css"
import Header from './Header';
import NarrowDown from './NarrowDown';

const Results = ({getParams}) => {
  // ホットペッパーグルメAPIで取得したデータを保管
  const [data, setData] = useState(null);
  // ローディングしているかを保持
  const [isLoading, setIsLoading] = useState(false);
  // URLで与えられたパラメータを取得する
  const { 
    pageNumber = 1,
    range = "RNG3000",
    genre = "",
  } = useParams();

  // 検索範囲を示すパラメータとAPI時の値をMAPで紐づけ
  const rangeMap = new Map([
    ["RNG300", 1],
    ["RNG500", 2],
    ["RNG1000", 3],
    ["RNG2000", 4],
    ["RNG3000", 5],
  ]);

  const location = useLocation();
  // クエリパラメータ
  const queryParams = new URLSearchParams(location.search);
  // 一度に取得する数
  const limit = 10;

  // 初回に実行すること
  useEffect(() => {

    // 絞りこみをしてる場合にそれにチェックを付けておく
    queryParams.forEach((param, key) => {
      const checkbox = document.querySelector(`input[value=${key}]`);
      checkbox.checked = true;
    });

    // ホットペッパーグルメAPIを現在地を利用して行う
    navigator.geolocation.getCurrentPosition(axiosData, errorCallback);
  }, []);

  // ホットペッパーグルメAPIから店舗情報を取得
  const axiosData = async (position) => {
    try {
      setIsLoading(true);

      // 必要なデータ
      const endpoint = "http://localhost:8000/getHotPepperData";
      const params = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        range: rangeMap.get(range),
        genre: genre,
        order: 4,
        format: "json",
        start: (pageNumber - 1) * limit + 1,
        count: limit,
      };
      // クエリパラメータとして取得したパラメータを追加
      queryParams.forEach((param, key) => {
        params[key] = param;
      });

      // CORSプロキシを介してAPIにアクセス
      const response = await axios(get_endpointURL(endpoint, params));

      // データを格納
      setData(response.data);
    } catch (error) {
      console.error('Error axios data:', error);
    } finally {
      // Loadingを解除
      setIsLoading(false);
    }
  };

  // Geolocation APIでErrorが発生した際のcallback関数
  const errorCallback = (error) => {
    console.error('Error Geolocation API:', error);
  }

  // 引数にendpointと各パラメータを与えることで、それを組み合わせたURLを取得できる
  const get_endpointURL = (endpoint, params) => {
    let apiUrl = endpoint;
    
    let i = 0;
    Object.keys(params).forEach(key => {
      if (i++ === 0) {
        apiUrl += `?${key}=${params[key]}`;
      } else {
        apiUrl += `&${key}=${params[key]}`;
      }
    });

    return apiUrl;
  };

  // ReactPaginateが押された際の処理
  const handlePaginate = (data) => {
    const newPageNumber = parseInt(data['selected']) + 1;

    // 絞り込み要素などを含んだURLに遷移
    let url = `/${range}`;
    if (genre !== "") {
      url += `/${genre}`;
    }
    // 最後にページ番号を最初に設定する
    url += `/${newPageNumber}`;
    const params = getParams();

    // ページ遷移
    window.location.href = url + params;
  };

  // formが送信されたときの処理
  const handleSumit = (e) => {
    e.preventDefault();

    // 絞り込み要素などを含んだURLに遷移
    let url = `/${range}`;
    if (genre !== "") {
      url += `/${genre}`;
    }
    // 最後にページ番号を最初に設定する
    url += "/1";

    // パラメータ
    const params = getParams();
    window.location.href = url + params;
  }

  // ページ番号が存在しない値だった場合
  if (data !== null && 
      (pageNumber < 0 || pageNumber > Math.ceil( data.results.results_available / limit))) {
    // 絞り込み要素などを含んだURLに遷移
    let url = `/${range}`;
    if (genre !== "") {
      url += `/${genre}`;
    }
    // 最後にページ番号を最初に設定する
    url += "/1";

    // データ数が0出ないなら（０ならページ番号がまず存在しないから）
    if (data.results.results_available !== 0) {
      // ページ遷移（replaceバージョン）
      window.location.replace(url);
    }
  }

  return (
    <>
      <Header title={"レストラン検索 - 検索結果"} />
      <div>
        {
          data !== null ?
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePaginate}
            pageRangeDisplayed={3}
            marginPagesDisplayed={3}
            pageCount={Math.ceil( data.results.results_available / limit)}
            previousLabel="< prev"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={pageNumber - 1}
          /> :
          <></>
        }
        <div className='mainFiled'>
          <form className='narrow' onSubmit={(e) => handleSumit(e)}>
            <NarrowDown className={"narrowDown"}/>
            <button type='submit' className='research'>再検索</button>
          </form>
          <div className='main'>
            { 
              isLoading ? 
              <ReactLoading type="spin"
              color="#ebc634"
              height="100px"
              width="100px"
              className="mx-auto"/> : 
              <ShopList 
                data={data}
              />
            }
          </div>
        </div>
        {
          data !== null ?
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePaginate}
            pageRangeDisplayed={3}
            marginPagesDisplayed={3}
            pageCount={Math.ceil( data.results.results_available / limit)}
            previousLabel="< prev"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={pageNumber - 1}
          /> :
          <></>
        }
      </div>
    </>
  );
}

export default Results