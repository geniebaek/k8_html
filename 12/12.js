//OPEN API 데이터 가져오기
const getData=(selDt,ul)=>{
  console.log(selDt);
  const testAPI='82ca741a2844c5c180a208137bb92bd7';
  let url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?`
  url=`${url}key=${testAPI}&targetDt=${selDt}`;

  console.log(url);

  fetch(url)
    .then(resp => resp.json())
    .then(data=>{
      console.log(data)
      let dailyBoxOfficeList=data.boxOfficeResult.dailyBoxOfficeList;
      
      console.log(dailyBoxOfficeList)


      let tm=dailyBoxOfficeList.map(item=>
        `<li class='mvli'>
            <span class='rank'>${item.rank}</span>
            <sapn class='movieNm'>${item.movieNm}</sapn>
            <span class='dt'>${item.openDt}</span>
          </li>`)
      tm=tm.join('')
      ul.innerHTML = tm;
      console.log(tm)

    })
    .catch(err =>console.error(err));

}




//어제 날짜 구하기 함수
const getYesterday = ()=>{
 const yesterday = new Date();
 yesterday.setDate(yesterday.getDate()-1);

 const year=yesterday.getFullYear();
 let month=yesterday.getMonth()+1;
 let day= yesterday.getDate();
 
 //월 두자리
 month=month<10?'0'+month :month;
 day=day<10?'0'+day :day;

// month=`$0{month}`.slice(-2);
// month=`${mont1}`.padStart(2,0);
// console.log('month = ',month)


 //yesterday=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`;
//  const dateFormat=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`
//  dateFormat.setDate(dateFormat.getFullYear())
 //yyyy-mm-dd
 return `${year}-${month}-${day}`;
}


//DOM 생성후
document.addEventListener('DOMContentLoaded',()=>{
  //요소 가져오기
  const dt=document.querySelector('#dt');
  const ul=document.querySelector('.sec>ul');


  //어제 날짜 구하기
  let yesterday = getYesterday();
  console.log('yesterday : ',yesterday);
  
  //date 요소 최대값 결정
  dt.max=yesterday;

  //데이터 가져오기
  dt.addEventListener('change',()=>{
    getData(dt.value.replaceAll('-',''),ul);

  });


});