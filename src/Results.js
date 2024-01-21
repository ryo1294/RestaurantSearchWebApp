import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
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
  const queryParams = new URLSearchParams(location.search);
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

  const axiosData = async (position) => {
    try {
      setIsLoading(true);

      // // テスト用に札幌中心地の緯度と経度
      const lat = 43.062;
      const lng = 141.3543;

      // 必要なデータ
      const endpoint = "http://localhost:8000/getHotPepperData";
      const params = {
        lat: lat,
        lng: lng,
        // lat: lat,
        // lng: lng,
        range: rangeMap.get(range),
        genre: genre,
        order: 4,
        format: "json",
        start: (pageNumber - 1) * limit + 1,
        count: limit,
      };   
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

  const handlePaginate = (data) => {
    const newPageNumber = parseInt(data['selected']) + 1;

    // 絞り込み要素などを含んだURLに遷移
    let url = `/${range}`;
    if (genre !== "") {
      url += `/${genre}`;
    }
    // 最後にページ番号を最初に設定する
    url += `/${newPageNumber}`;

    // パラメータ
    // let params = "";
    // const refList = [...document.querySelectorAll("input[type='checkbox']")];
    // const refs = refList.filter(ref => ref.checked);

    // refs.forEach((ref, i) => {
    //   params += i === 0 ? "?" : "&";
    //   params += ref.value + "=1";
    // });

    const params = getParams();

    window.location.href = url + params;
  };

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

  if (pageNumber < 0) {
    window.location.replace(`/${range}/1`);
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