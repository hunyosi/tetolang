TetoTetoProlog
==============

TetoTetoProlog は、ブラウザ等の JavaScript 実行環境上で動作する Prolog (ISO規格にできるだけ合わせつつより便利(?)にした物) インタープリタを作ろうとしているプロジェクトです。併せて、いろんな環境に移植するためのテンプレートにもなったらいいなと考えています。


使い方
------

### 依存 ###
Prolog プログラムを JavaScript に変換する場合は、
SWI-Prolog か GNU Prolog をインストールしておいてください。
添付の Makefile を実行する場合は、 Unix 系の環境が必要です。

### 使用例 ###
Prolog プログラムを JavaScript に変換する場合、
コマンドライン1行に書くなら次のようになります。

    $ echo "['src/compiler.pro']. ttpc('yoursrc.pro', 'yourdst.js')." | swipl

あるいは、普通に Prolog インタプリタを起動して compiler.pro を読み込んで、 tpc 述語を実行します。

    $ swipl
    ?- ['src/compiler.pro'].
    ?- ttpc('yoursrc.pro', 'yourdst.js').

※ttpc 述語は、 halt します。

実行する際は、HTMLで次のように読み込むスクリプトを指定します。

    <script src="js/tetotetoprolog.js"></script>
    <script src="yourdst.js"></script>

そして、次のようなスクリプトで実行させます。

    <script>
    // TetoTetoProlog の名前空間は TetoTetoProlog と ttp (どちらも同じ)
    var varX = ttp.PVar(); // Prolog変数の生成
    var varY = ttp.PVar(); // Prolog変数の生成

    // 変換後のプログラムは、出力ファイル名から拡張子を除いた名前の変数にオブジェクトが代入されている
    //yourdst.trace(true); // トレースする場合は trace() メソッドに true を渡して呼び出す

    // query メソッドに実行したい述語を渡して呼び出すと、 TetoProlog.Promise のインスタンスが返却される。
    // 返却されたオブジェクトに done(), fail(), always() 等を設定して最後に call() か apply() で実行する(通常の Promise とは少し違う)。
    yourdst.query(
     ttp.PTerm('immortal', varX, varY) // これで Prolog の immortal(X, Y) と同等
    )
    .done(doneFunc).fail(failFunc).call();
    
    function doneFunc(e, d){
     // 第1引数 e は、Prolog変数に束縛された値を取得する際に使用
     ttp.pp('varX=', varX.val(e)); // 束縛された値を取得する場合 val(e)
     ttp.pp('varY=' + varY.toString(e)); // Prolog値を文字列にする場合 toString(e)
     if (d) {
      // 第2引数 d が null でない場合、バックトラック可能。
      // d に渡されたオブジェクトに対して done() 等を設定して call() か apply() することで、失敗させて再試行させる事ができる。
      d.done(doneFunc).fail(failFunc).call();
     }
    }

    function failFunc(e){
     // 引数 e は、失敗した場合は、 PFailure のインスタンス、何らかの例外が発生した場合は、それ以外のクラスのインスタンス
     ttp.pp(prefix + 'fail(e)=', e);
    }
    </script>


今後やりたい事
-------------
1. とりあえず src/compiler.pro を JavaScript に変換した物が動作するようにしたい
2. 一通り、ISO Prolog の組み込み述語の実装をしたい
3. JavaScript 側のストリーム関係のクラスを揃えたい(文字列ストリーム、ファイルストリーム、できれば IndexDB をファイルシステムとして使うのとか、その内、 XHR の結果や、 Websocket とか、ブラウザを TTY のように扱うのとか)
4. 面倒だから省いてた浮動小数点数の字句解析を実装する
5. 匿名変数を普通の変数と分けて扱う。それと、多分、今のままだと、参照されない変数が残ったままになると思うのでなんとかする
6. ECMAScript 6 への対応（クラス定義とか、 Promise を独自実装のを使ってるのは、言語標準の物に置き換える方が多分良いよね...）
7. ECMAScript 3 への対応？（今は、 ECMAScript 5 以上でしか動かないけど、古い環境で動かしたい事があればやるかも...？)
8. テストコードの整備(今の test/compiler_test.pro は使えない状態。それに JavaScript のコードは全くテストが無いし...)
9. ディレクティブの実装(今は、完全に無視してる...。余り使ってないので、後回し)
10. モジュール対応(もっと後回し)
11. もっとちゃんとしたコンパイル。今は、 Prolog の式を JavaScript のオブジェクトに変換してるだけ。ちゃんと JavaScript の処理に変換できるようにしたい...(その内)


ライセンス
---------

This software is made available under the Creative Commons CC0 1.0 Universal Public Domain Dedication.
See "LICENSE" file.

