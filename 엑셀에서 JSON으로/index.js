// 'use strict';
const excelToJson = require('convert-excel-to-json');
var jsonfile = require('jsonfile');

//엑셀파일
var fs = require('fs');


function getDataSheet(excelFile, filePath){
    console.log(excelFile, filePath)
    const excel_sheets = excelToJson({
        sourceFile: excelFile,
        header: {
            rows: 1 //몇번째 줄부터 시작인지?
        },
        //원하는 시트만 골라서 뽑아내기
        sheets: ['book', 'curriculum', 'details', 'closing']
    });
    // console.log('1',excel_sheets);

    //input_data에 모든 시트의 데이터를 삽입
    let input_data = [];
    input_data = input_data.concat(getDataListFromSheet(
        "fuck_Wisecamp", excel_sheets.book, excel_sheets.curriculum, excel_sheets.details, excel_sheets.closing
        ));
    // input_data = input_data.concat(getDataListFromSheet("curriculum", excel_sheets.curriculum));

    // console.log('3',input_data);
    // console.log(input_data[0].details);
    if(input_data[0]!== undefined){
        const new_detail = input_data[0].details.splice(1);
        console.log(new_detail);
        input_data[0].details = new_detail;
    }
    
    
    if (!fs.existsSync(filePath)){
        fs.mkdirSync(filePath);
    }

    jsonfile.writeFile(filePath+'/epub_library.json', input_data);

    return input_data;
}

//시트별 JSON 재구성
function getDataListFromSheet(sheet_name, input_sheet1, input_sheet2, input_sheet3, input_sheet4){
    const target_data = [];
    const line_data = {};
    //한 줄 분의 데이터 작성
    input_sheet1.forEach(input_line => {
        
        
        //시트명
        // line_data.sheet_name = sheet_name;

        //A,B,C 열의 값 넣기
        var grade;
        switch (input_line.A){
            case '저학년':
                grade = input_line.A = "junior";
                break;
            case '중학년':
                grade = input_line.A = "middle";
                break;
            case '고학년':
                grade = input_line.A = "senior";
                break;

        }
        line_data.grade = grade;
        line_data.opversion = input_line.B === undefined ? "" : input_line.B;
        line_data.helptext = input_line.C === undefined ? "" : input_line.C;
        line_data.title = input_line.D === undefined ? "" : input_line.D;
        line_data.readingaudio = input_line.E === "있음" ? "true" : "false" ;
        line_data.key = input_line.F === undefined ? "" : input_line.F;
        line_data.author = input_line.G === undefined ? "" : input_line.G;
        line_data.artist = input_line.H === undefined ? "" : input_line.H;
        line_data.publisher = input_line.I === undefined ? "" : input_line.I;
        line_data.classification = input_line.J === undefined ? "" : input_line.J;
        line_data.introduction = input_line.K === undefined ? "" : input_line.K.replace(/\n/gi, '');
        line_data.bookintrovoice = input_line.L === undefined ? "" : input_line.L;
        line_data.idx = input_line.M === undefined ? "" : input_line.M;
        line_data.textbooklink = [];
        line_data.details = [];

        // //D열부터의 데이터를 전부 배열로 바꿈
        // line_data.materials = jsonToArray(input_line);

        //데이터가 하나라도 없으면 아무것도 안함
        // if(!line_data.no || !line_data.name || !line_data.category || line_data.materials.length === 0){
        // if(!line_data.grade || !line_data.opversion || !line_data.helptext){
        //     return 0;
        // }
        // console.log('line-data', line_data)

        //한 줄 분의 데이터를 시트 전체의 데이터에 삽입
        target_data.push(line_data);
    });

    input_sheet2.forEach((input_line) => {
        
        input_line.link = input_line.A === undefined ? "" : input_line.A;
        input_line.chapter = input_line.B === undefined ? "" : input_line.B;

        delete input_line.A;
        delete input_line.B;

        line_data.textbooklink.push(input_line)
     
    });

    input_sheet3.forEach((input_line) => {
     
        if(input_line.A !== undefined && input_line.A.includes('*해당') ){
            input_line.include = "";
        }else{
            input_line.include = input_line.A === undefined ? "" : input_line.A;
        }
        
        input_line.contents = input_line.B === undefined ? "" : input_line.B;

        delete input_line.A;
        delete input_line.B;
        // input_line.details[0]
        // console.log(Object.keys(input_line))
        // Object.keys(input_line)[0] = "include";
        
        line_data.details.push(input_line)

    });

    input_sheet4.forEach((input_line)=>{
        line_data.narr = input_line.A === undefined ? "" : input_line.A;
        line_data.dividedbooknumber = input_line.B === undefined ? "" : input_line.B;
        line_data.currentdivided = input_line.C === undefined ? "" : input_line.C;
        line_data.closingment = input_line.D === undefined ? "" : input_line.D;
        line_data.closingaudio = input_line.E === undefined ? "" : input_line.E;
    })
    
    return target_data;
}

//JSON을 배열로 변경
function jsonToArray(json){
    const result = [];
    const keys = Object.keys(json);
    keys.forEach(function(key){

        result.push(json[key]);

    });
    // console.log(keys,result)
    return result;
}

// module.exports = {
//     data: getDataSheet()
// }

var myArgs = process.argv.slice(2);
const excelFile =myArgs[0];

fs.readdir(myArgs[0], function(error, filelist){
    console.log(filelist)
    filelist.forEach(function(element){
        getDataSheet(excelFile+'\\'+element,excelFile+'\\'+element.replace('.xls',''));
    });
    })


