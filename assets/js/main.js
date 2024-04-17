// //テキストのカウントアップの設定
// var bar = new ProgressBar.Line(splash_text, {//id名を指定
// 	strokeWidth: 0,//進捗ゲージの太さ
// 	duration: 1000,//時間指定(1000＝1秒)
// 	trailWidth: 0,//線の太さ
// 	text: {//テキストの形状を直接指定	
// 		style: {//天地中央に配置
// 			position:'absolute',
// 			left:'50%',
// 			top:'65%',
// 			padding:'0',
// 			margin:'0',
// 			transform:'translate(-50%,-50%)',
// 			'font-size':'2.0rem',
// 			color:'#fff',
// 		},
// 		autoStyleContainer: false //自動付与のスタイルを切る
// 	},
// 	step: function(state, bar) {
// 		bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
// 	}
// });

// //アニメーションスタート
// bar.animate(1.0, function () {//バーを描画する割合を指定します 1.0 なら100%まで描画します
// 	$("#splash").delay(500).fadeOut(800);//アニメーションが終わったら#splashエリアをフェードアウト
// });






$(".openbtn").click(function () {
    $(this).toggleClass('active');
});

$(".openbtn").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});

// $(window).on('load resize' ,function(){
//     var width = $(window).width();
//     if(width <= 800){
//         $('.movie').children('source').attr('src', 'movie/sp_video.mp4');
//     } else {
//         $('.movie').children('source').attr('src', 'movie/pc_video.mp4');
//     }
// });
window.addEventListener("load", function () {
    const videoPc = document.querySelector("#js-video-pc"); //pc版のビデオタグ
    const videPcSrc = videoPc.getAttribute("data-src"); //pc版のビデオタグのdata-src

    const videoSp = document.querySelector("#js-video-sp"); //sp版のビデオタグ
    const videoSpSrc = videoSp.getAttribute("data-src"); //sp版のビデオタグのdata-src

    let pcVideoBool = false;
    let spVideoBool = false;

    if (801 <= window.innerWidth) {
      //画面幅768pxより大きければpc版読み込み
        videoPc.src = videPcSrc;
        pcVideoBool = true;
    } else {
      //それ以外の場合sp版読み込み
        videoSp.src = videoSpSrc;
        spVideoBool = true;
    }

    window.addEventListener("resize", () => {
      //画面をresize時
        if (801 <= window.innerWidth && !pcVideoBool) {
        //画面幅768pxより大きいかつ、pc版の動画をまだ読み込んでいない場合
        videoPc.src = videPcSrc;
        pcVideoBool = true;
        }

        if (801 > window.innerWidth && !spVideoBool) {
        //画面幅768px未満かつ、sp版の動画をまだ読み込んでいない場合
        videoSp.src = videoSpSrc;
        spVideoBool = true;
        }
    });
});

window.addEventListener("load", function () {

	//プラグインを定義　class名を指定
	gsap.registerPlugin(ScrollTrigger);
	const area = document.querySelector(".gsap_area");//start位置　固定したいやつ
	const items = document.querySelectorAll(".gsap_item");//動かしたいitem　写真など複数のもの
	const num = items.length;//要素の数を取得　何個いてitemが入ってるか要素の数を数えてくれてる

	// 767px以上の処理　アニメーションの指定の仕方４種類のうちの一つ

	gsap.to(items, {
		// yPercent: -260, //x方向に移動させる
		yPercent: -330 * (num - 1), //x方向に移動させる　cssでいうtransformーyと一緒　マイナスだったら上に動く。プラスだったら下に動く
		ease: "none",//アニメーションの変化率を制御する　gsap-easeで検索
		scrollTrigger: {
			trigger: area, //トリガー　スタートの位置
			start: "top top+=3%", //開始位置　％の値を変更
			// start: "top top", //開始位置
			end: "+=1600", //終了位置　下に1300px行ったら終わり
			// end: "bottom bottom",//終了位置
			pin: true, //ピン留め
			scrub: 1, //スクロール量に応じて動かす　ゆっくり動かしたっかたら大きい数
			invalidateOnRefresh: true, // ページの再読み込み時(リサイズ時)に値を再計算する　これはつけとく
			// anticipatePin: 1, // ピン留めアニメーションをスムーズに開始
			//markers: true, // マーカー表示　調節ができたらコメントアウト
		}
	});
});


