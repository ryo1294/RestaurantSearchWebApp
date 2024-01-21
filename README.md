# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

プロジェクトのクローンを作成し、依存関係をインストールします。

### `npm start`

アプリを開発モードで実行します。\
以下のコマンドを実行してくれます。\
npm-run-all -p npm react:start & react:node

### `npm react:start`

[http://localhost:3000](http://localhost:3000) を開いてブラウザで表示します。

変更を加えるとページが再読み込みされます。\
コンソールに lint エラーが表示される場合もあります。

### `npm react:node`

仲介サーバーが起動します。(そのままだとCORSエラーが発生するため)
[http://localhost:8000](http://localhost:8000) で開始されました

### `npm test`

テスト ランナーを対話型監視モードで起動します。\
詳細については、[テストの実行](https://facebook.github.io/create-react-app/docs/running-tests) に関するセクションを参照してください。

### `npm run build`

実稼働用のアプリを「build」フォルダーにビルドします。\
React を実稼働モードに正しくバンドルし、最高のパフォーマンスが得られるようにビルドを最適化します。

ビルドは縮小され、ファイル名にはハッシュが含まれます。\
アプリをデプロイする準備ができました。

詳細については、[デプロイメント](https://facebook.github.io/create-react-app/docs/deployment) に関するセクションを参照してください。

### `npm run eject`

**注: これは一方向の操作です。 一度「排出」すると、元に戻すことはできません。**

ビルド ツールと構成の選択に満足できない場合は、いつでも「イジェクト」できます。 このコマンドは、プロジェクトから単一のビルド依存関係を削除します。

代わりに、すべての構成ファイルと推移的な依存関係 (webpack、Babel、ESLint など) がプロジェクトに直接コピーされるため、それらを完全に制御できます。 「eject」を除くすべてのコマンドは引き続き機能しますが、コピーされたスクリプトを参照するため、それらを微調整することができます。 この時点では、あなたは一人です。

「eject」を使用する必要はありません。 厳選された機能セットは小規模および中規模の導入に適しており、この機能を使用する義務を感じる必要はありません。 ただし、準備ができたときにカスタマイズできなければ、このツールは役に立たないことは理解しています。
