# laravel-study
laravel学習用のリポジトリです。

## スタック

- Next.js
- laravel
- mysql


## 環境構築

- `docker-compose.yml`のあるディレクトリで下記コマンド実施
  - `docker-compose up -d
- Laravelコンテナ内でマイグレーションの実行し、テーブル作成
  - ` docker exec -it laravel sh `


## API仕様書

- `localhost:8002`にてSwaggerで確認できます
- 編集時は`docker/swagger/openapi.yaml`を更新してください。

## ER図

* https://drive.google.com/file/d/1FzI5rkhQ2XojZsG_cOwo_cX9mjNNLa2_/view?usp=sharing

※  今後`SchemaSpy`に移行予定

## アプリ要件

* https://docs.google.com/spreadsheets/d/1M0_LW5xjfB24Ux3vLZKb43Ylr7rHeyUbCrGZyJWP5cg/edit#gid=523587681