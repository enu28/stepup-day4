$(function(){  //jQuery Start

    //入力フォームからユーザーが入力した郵便番号を受け取る
    $("#submit").on("click",function(e){

        e.preventDefault();  //リロードが起こるのを阻止
        let post_code = $("#post_code").val();  //入力された郵便番号を取得
        console.log(post_code);
        zipCloud(post_code);

    })

    // APIを叩く（注文する）
    function zipCloud(post_code){
        let url = "https://zipcloud.ibsnet.co.jp/api/search?zipcode="+post_code;
        fetch(url)  //データをとって参る（非同期）
        .then(response => response.json())  //fetchの結果を受け取ってJSONで解析する
        .then((data) => {
            if(!data.results){  //郵便番号が正しくなかった場合
                console.log(data.message);  //エラーメッセージを表示
                render_html(data.message);
            }else{  //郵便番号が正しかった場合
                console.log(data);  //結果を表示
                let results = data.results["0"];
                console.log(results);

                //パターン１
                // let format_address = 
                // results.address1+results.address2+results.address3;
                // console.log(format_address);
                // render_html(format_address);

                //パターン２
                render_html(results);
            }
        })
        .catch((response) => {
            console.info(response);
        });
    }

    // HTMLに表示する
    function render_html(results){
        // $("#address p").text(message);  //パターン1
        
        $("#prefecture").val(results.address1);
        $("#city").val(results.address2);
        $("#street").val(results.address3);
    }

    zipCloud();
})  //jQuery End