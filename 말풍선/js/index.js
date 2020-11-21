require.config({
    baseUrl: 'js',
    paths:{
        jquery: 'jquery-3.5.1.min'
    }
});
define([
    "js/StorageManager.js",
    "jquery"
], 
    function(
        StorageManager,
        $
    )
    {
   //전역변수로 선언 consol.log 출력 안되게 막기
    console = {};
    console.log = function(){};
    console.warn = function(){};
    console.error = function(){};

    var epubsData;    
    var loadUI = function () {
        
        var setAppSize = function () {
            var appHeight = $(document.body).height() - $('#app-container')[0].offsetTop;
            $('#app-container').height(appHeight);
            // console.log(appHeight)
        }
        $(window).on('resize', setAppSize);
        // $('#app-container').css('overflowY', 'auto');

        setAppSize();
    

        StorageManager.initStorage(function () {
            retrieveAvailableEpubs(loadLibraryItems);
        }, showError);

    }

    var retrieveAvailableEpubs = function(success, error){
        // if (this.libraryData){
        //     success(this.libraryData);
        //     return;
        // }

        var self = this;

        var indexUrl = undefined;
        var urlSearch = window.location ? window.location.search : '';
        var urlPathname = '';
        
        try{
            if(window.location){
                //배포용
                var splitSlash = window.location.pathname.split('/');
                console.log(window.location.pathname);
                console.log(splitSlash);
                console.log(splitSlash[splitSlash.length - 1]);
                console.log(splitSlash[splitSlash.length - 1].match(/.html/gi));
                
                var num = splitSlash.length - 1;
                var splitRecur = function(i){
                    if(i == 0){
                        num = i;
                        return splitSlash[0];
                    }

                    if(splitSlash[i] === ""){
                        return splitRecur(i-1);
                    }else{
                        num = i;
                        return splitSlash[i];
                    }
                }
                var slashmatch = splitRecur(splitSlash.length - 1).match(/.html/gi);

                if(slashmatch){
                    if(splitSlash[splitSlash.length - 1].match(/.html/gi).length > 0){
                        for(var i = 0; i < num; i++){
                            if(splitSlash[i] !== "")
                                urlPathname += '/' + splitSlash[i];
                        }
                        urlPathname += '/';
                    }else{
                        urlPathname = window.location.pathname;
                    }
                }else{
                    urlPathname = window.location.pathname;
                }

                console.log(StorageManager.getPathUrl(urlPathname + 'json/epub_library.json'));
                indexUrl = StorageManager.getPathUrl(urlPathname + 'json/epub_library.json');
            }
        }catch(e){
            console.error("Ebook library fail::Connot find epub_library.json");
        }

        var dataFail = function() {
            console.error("Ebook library fail: " + indexUrl);
            
            self.libraryData = [];
            success([]);
        };
        
        var dataSuccess = function(data) {
            console.log("Ebook library success: " + indexUrl);

            self.libraryData = data;
            success(data);
        };

        if (/\.json$/.test(indexUrl)) {
            
            $.getJSON(indexUrl, function(data){
                dataSuccess(data);
            }).fail(function(){
                dataFail();
            });
        } else {
            EpubLibraryOPDS.tryParse(indexUrl, dataSuccess, dataFail);
        }
    }

    var showError = function (errorCode, data) {
        console.error(errorCode, data);
    }

    var loadLibraryItems = function (epubs) {
        if (!epubsData) {
            epubsData = epubs;
        }

        //각 커버 이미지에 data-book값으로 url값을 넣어준다.
        // setIntro(epubsData);
        setCurrentItem(epubsData);
    }

    // 저학년 중학년 고학년 레이아웃 설정 및 책 정보 뿌려주기
    var setCurrentItem = function (epubsData) {
        console.log('epubsData', epubsData);
        var bookObj = epubsData[0];

        switch (bookObj.grade){
            case 'junior':
            case '저학년':
                 // 테스트용 애니메이션 대체 3초 보여주기
                $('#intro_ani').addClass("intro_bg_junior");
                $('#book_opening').addClass('on_junior');
                $('#book_opening').addClass('opacity');
                // setTimeout(function(){
                    $('#intro_ani').removeClass('active');
                    $('#balloon').addClass('active');
                    if(bookObj.bookintrovoice !==''){
                        // $('.bobo').addClass('active');
                        $('#book_opening').addClass('active');
                    }
                // },3200);
                $('#contents').addClass('junior');
                break;
            case 'middle':
            case '중학년':
                // 테스트용 애니메이션 대체 3초 보여주기
                $('#intro_ani').addClass("intro_bg_middle");
                $('#book_opening').addClass('on_middle');
                // setTimeout(function(){
                    $('#intro_ani').removeClass('active');
                    $('#book_opening').addClass('opacity');
                    $('#balloon').addClass('active');
                    if(bookObj.bookintrovoice !==''){
                        // $('.bobo').addClass('active');
                        $('#book_opening').addClass('active');
                    }
                // },3500);
                $('#contents').addClass('middle');
                break;
            case 'senior':
            case '고학년':
                // 테스트용 애니메이션 대체 3초 보여주기
                $('#intro_ani').addClass("intro_bg_senior");
                $('#book_opening').addClass('on_senior');
                // setTimeout(function(){
                    $('#intro_ani').removeClass('active');
                    $('#book_opening').addClass('opacity');
                    $('#balloon').addClass('active');
                    if(bookObj.bookintrovoice !==''){
                        // $('.bobo').addClass('active');
                        $('#book_opening').addClass('active');
                    }
                // },3390);
                $('#contents').addClass('senior');
                break;    
        };

        // 책 읽기에 들어가는 책 정보 텍스트
        $('#info > #title').html('책 제목');
        if(bookObj.title.length > 15 && bookObj.title.length < 21){
            $('#title').addClass('long1');
        }else if(bookObj.title.length >= 21){
            $('#title').addClass('long2');
        }
        // $('#bookInfo > p:first > span').html(bookObj.author);
        // $('#bookInfo > p:nth-child(2) > span').html(bookObj.artist);
        // $('#bookInfo > p:nth-child(3) > span').html(bookObj.publisher);
        // $('#bookInfo > p:last-child').html(bookObj.classification);
        // console.log(bookObj.textbooklink);
        if(bookObj.idx){
            switch(bookObj.idx){
                case '2':
                    $('#nth_story').addClass('active');
                    $('#nth_story').html('두 번째 이야기');
                    break;
                case '3':
                    $('#nth_story').addClass('active');
                    $('#nth_story').html('세 번째 이야기');
                    break;
            }
        }

        //교과 연계 정보 뿌려주기
        if (bookObj.textbooklink && bookObj.textbooklink.length !== 0) {
            var textbooklink = bookObj.textbooklink;
            // console.log(textbooklink);
            if(textbooklink.length === 2){
                $('#subject').addClass('len2');
            }else if(textbooklink.length === 3){
                $('#subject').addClass('len3');
            }
            $.each(textbooklink, function (idx, item) {
                console.log(item)
                var link = '<p class="link"><span>'+ '교과' +'</span></p>';
                var chapter = '<p class="chapter">'+ '연계' +'</p>';
                $('#subject').append('<div class="curr_link">'+ link + chapter +'</div>');
            })
        } 
        
     
            
        //책 소개글 넣기
        var setText = function(text){
            //단어 사이에 공백과 {}중괄호 단어 분리 패턴
            var space_and_brace_pattern = new RegExp(/([^({|}|\s)]+)|({[^{|}]*})/gi);
            //중괄호 포함 텍스트 찾는 패턴
            var include_brace_pattern = new RegExp(/\{(.*?)\}/gi);
            //중괄호만 찾는 패턴
            var brace_pattern = new RegExp(/[\{\}]/gi);
            var splitedText = text.split(space_and_brace_pattern);
            var passedTextArr = [];
            splitedText.map(function(item){
                if(item !== "" && item !== undefined){
                    if(include_brace_pattern.test(item)){
                        passedTextArr.push('<span>' + item.replace(brace_pattern,'') +'</span>');
                    }else{
                        passedTextArr.push(item);
                    }
                }
            });
            var replaced_intro = passedTextArr.join('');
            return replaced_intro;
        };
        var book_intro = setText(bookObj.introduction);
        $('.balloon_text').html('말풍선');
        
        if($('.balloon_text').eq(0).text().length > 98){
            $('#balloon').addClass('long');
        }
    };

    
    // $(window).on('load', function(){
        
    //     //DOM과 리소스가 다 불러와지면 실행 되는 부분
    //     swcontobj.fnCompleteStudy();
        
    // });
    loadUI();
});