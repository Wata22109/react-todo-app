# TodoApp

React、TypeScript、Tailwind CSS を使用し、ローカルストレージでデータを永続化した「Todoアプリ」です。
効率的なタスク管理を実現します。

## 機能一覧

### 基本機能

タスクの追加・編集・削除
タスクの完了状態の管理
各タスクの優先度設定（高・中・低）
締切日時の設定と残り時間の表示
メモの追加、表示
タグとカテゴリによる分類
完了済みタスクの一括削除
ローカルストレージによるデータ永続化

### フィルタリング

カテゴリによるフィルタリング
複数タグによる絞り込み
優先度でのフィルタリング

### ソート機能

期限が近い順でのソート
優先度順でのソート

### 直感的なUI/UX

折りたたみ可能なフォームとフィルター
アニメーションによる視覚的フィードバック
モダンなグラデーションデザイン
レスポンシブ対応

## 特長

1. 豊富なタスク情報

優先度、締切、カテゴリ、タグ、メモなど、多くの情報を付与することが可能
残り時間の自動計算と表示
タグの複数付与による柔軟な分類

2. フィルタリング＆ソート

複数の条件を組み合わせたフィルタリング
多様なソートオプション

3. 使いやすさ、美しさ

グラデーションを活用した美しいUI
快適な操作感
折りたたみ機能による画面スペースの効率的な利用
レスポンシブデザイン

## 技術スタック

### フロントエンド

React 18
TypeScript
Tailwind CSS

### 状態管理・データ永続化

React Hooks
LocalStorage API

### 主要ライブラリ

Framer Motion (アニメーション)
DayJS (日付処理)
UUID (一意識別子生成)
FontAwesome (アイコン)
Tailwind Merge (クラス名の最適化)

### インストールと実行

Web上で使用することができます。

## 開発履歴

2024年10月30日：プロジェクト開始
2024年11月18日：UI/UXの大幅改善、ソート機能の追加
2024年11月23日：メモ機能の追加

## ライセンス

MIT License
Copyright (c) 2024 Wataru Harada

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
