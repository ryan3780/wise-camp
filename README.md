# 와이즈캠프 도서 관련 프로그램 

### javscript + jquery + css + html

1. 오픈 소스(`Readium.js`)를 수정 및 추가하여 만든 작업물
2. 아이들 교육용 프로그램이며, 전자책을 태블릿에서 볼 수 있게 하는 프로그램
3. 기기 환경 : 갤럭시 Tab S6와 window 기반의 OS가 설치 되어 있는 구형 태블릿 

### 특이사항

1. 고객사의 웹서버를 사용하고, 고객사의 개발 규칙에 의해 cross - origin 발생
   - 오픈 소스를 생각보다 많이 수정했으며, 악착같이 테스트! 구조적인 문제를 알게되어 cross - orign 해결
   - 자동재생 이슈 해결 (크롬 자동재생 정책)
   
2. 크로미움 기반과 IE 기반 개발 환경
   - 크로미움과 IE 기반의 태블릿 2종류, IE는 문제가 많다.
   - 원활한 작업 진행을 위하여 현재 프로젝트는 크로미움으로 Iframe을 호출하기로 함
   - 총 900여권의 전자책을 양산하고 서버에 업로드
   
3. 엑셀파일로 각각의 도서 정보 및 코드에 필요한 JSON 작업
   - https://www.npmjs.com/package/convert-excel-to-json 으로 변환 프로그램 개발
   - 개발물과 컨텐츠 파일들의 교체 및 압축 자동화 프로그램 개발
   
4. 고객사에서 주는 엑셀 파일의 수정사항이 너무 많아서 미리보기 페이지 개발
   - 예쁜 페이지 X, 좋은 코드 및 구조 X
   - 오로지 생산성을 위한 페이지
   
5. 전반적인 관리
   - 인사업무 + 교육업무 + 양산업무 + 고객사 대응 등등
   - 프로젝트 진행에 차질없게 진행

### 코드의 저작권이 없으므로 사진으로 대체하겠습니다.  

#### 책 열기  

<img src="https://user-images.githubusercontent.com/45477679/99868424-be0e5100-2c05-11eb-8c04-6764352f5824.png" />   

#### 책 읽기   

<img src="https://user-images.githubusercontent.com/45477679/99868427-bf3f7e00-2c05-11eb-816b-9518369da38f.png" />  
<img src="https://user-images.githubusercontent.com/45477679/99868428-bfd81480-2c05-11eb-8e10-df003c2a008b.png" />  

### 미리보기 페이지  

<img src="https://user-images.githubusercontent.com/45477679/99868426-bea6e780-2c05-11eb-98ee-5001c1b9d34b.png" />  
