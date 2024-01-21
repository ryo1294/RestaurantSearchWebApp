import React from 'react'

const NarrowDown = ({className}) => {
  // 絞り込みリストに表示するもの
  const narrowDownList = {
    list: [
      {name: "WiFiあり", value: "wifi"},
      {name: "ウェディング", value: "wedding"},
      {name: "コースあり", value: "course"},
      {name: "飲み放題", value: "free_drink"},
      {name: "食べ放題", value: "free_food"},
      {name: "個室あり", value: "private_room"},
      {name: "掘りごたつあり", value: "horigotatsu"},
      {name: "座敷あり", value: "tatami"},
      {name: "カクテル充実", value: "cocktail"},
      {name: "焼酎充実", value: "shochu"},
      {name: "日本酒充実", value: "sake"},
      {name: "ワイン充実", value: "wine"},
      {name: "カード可", value: "card"},
      {name: "禁煙席", value: "non_smoking"},
      {name: "貸切", value: "charter"},
      {name: "携帯電話OK", value: "ktai"},
      {name: "駐車場あり", value: "parking"},
      {name: "バリアフリー", value: "barrier_free"},
      {name: "ソムリエがいる", value: "night_view"},
      {name: "夜景がキレイ", value: "wedding"},
      {name: "オープンエア", value: "open_air"},
      {name: "ライブ・ショーあり", value: "show"},
      {name: "エンタメ設備", value: "equipment"},
      {name: "カラオケあり", value: "karaoke"},
      {name: "バンド演奏可", value: "band"},
      {name: "TV・プロジェクター", value: "tv"},
      {name: "ランチあり", value: "lunch"},
      {name: "23時以降も営業", value: "midnight"},
      {name: "23時以降食事OK", value: "midnight_meal"},
      {name: "英語メニューあり", value: "english"},
      {name: "ペット可", value: "pet"},
      {name: "お子様連れOK", value: "child"},
    ]
  }

  return (
    <>
      <h4>絞り込み</h4>
      <div className={className}>
        <ul>
          {narrowDownList.list.map(narrowDown => (
            <li key={narrowDown.name}>
              <label>
                {narrowDown.name}
                <input type='checkbox' value={narrowDown.value} />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default NarrowDown;