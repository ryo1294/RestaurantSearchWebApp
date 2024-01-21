import React, { useEffect, useRef, useState } from 'react';
import NarrowDown from './NarrowDown';
import Header from './Header';
import "./Home.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = ({getParams}) => {
  // genreを保持
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // genreリストをAPIから取得
    const axiosDate = async (endpoint) => {
      try {
        const request = await axios(endpoint+"?format=json");
        setGenres(request.data.results.genre);
      } catch (error) {
        console.error('Error axios data:', error);
      }
    };

    axiosDate("http://localhost:8000/getHotPepperGenreData");
  }, []);


  // 検索範囲
  const rangeRef = useRef();
  // キーワード
  const keywordRef = useRef();
  // ジャンル
  const genreRef = useRef();

  const navigate = useNavigate();

  // formで検索されたときの動き
  const handleSubmit = (e) => {
    e.preventDefault();

    // 絞り込み要素などを含んだURLに遷移
    let url = `/${rangeRef.current.value}`;
    if (genreRef.current.value !== "init") {
      url += `/${genreRef.current.value}`;
    }
    // 最後にページ番号を最初に設定する
    url += "/1";

    const params = getParams();

    navigate(url + params);
  }

  return (
    <div>
      <Header title={"レストラン検索サイト"} />
      <div className='field'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='basicField'>
            <p>
              現在地から
              <select name='range' defaultValue="RNG1000" ref={rangeRef}>
                <option value='RNG300'>300</option>
                <option value='RNG500'>500</option>
                <option value='RNG1000'>1000</option>
                <option value='RNG2000'>2000</option>
                <option value='RNG3000'>3000</option>
              </select>
              m
            </p>
            <p>
              ジャンル
              <select name='genre' defaultValue="init" ref={genreRef}>
                <option value="init">ジャンルを選択してください（任意）</option>
                {genres.map(genre => (
                  <option key={genre.code} value={genre.code}>{genre.name}</option>
                ))}
              </select>
            </p>
          </div>
          <div className='narrowDownField'>
            <NarrowDown className={"homeNarrowDown"}/>
          </div>
          
          <button className='search' type='submit'>検索</button>
        </form>
      </div>
    </div>
  );
}

export default Home