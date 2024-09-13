let arr = [0,0,0,0,0,0,0,0,1];
let isShuffle=false;
let cnt=0;

const init=(bt)=>{
  bt.innerHTML = '폭탄을 섞어주세요';
  isShuffle=false;
  cnt=0;
}
document.addEventListener('DOMContentLoaded', () => {
  const cols = document.querySelectorAll('.col');
  const bt=document.querySelector('.sec>button');
  const msg = document.querySelector('.msg');
  //버튼 처리
  bt.addEventListener('click', (e) =>{
    e.preventDefault();
 
    
    if(!isShuffle){
      isShuffle=true;
      //배열 섞기
      arr.sort(() => Math.random() - 0.5);
      console.log(arr);
      bt.innerHTML = '게임중...';

      msg.innerHTML = '';
      for(let [idx,col] of cols.entries()){
        col.innerHTML = idx+1; //1부터 ��운트
    }
  }
  });
    //div박스처리
    for (let col of cols) {
      col.addEventListener('click', () => { 
        //폭탄이 섞이지 않으면 클릭 안됨
        if(!isShuffle) {
          msg.style.color='black';
          msg.innerHTML=`<h2>폭탄을 섞어주세욤!</h2>`;
          return;
        }

        //이미지가 있는지 확인
        if(col.innerHTML.includes('img')) return; // 이미지가 있으면 return

        //실패인 경우
        if(msg.innerHTML.includes('실패')) return;

        let idx=col.getAttribute('id').slice(-1) - 1; //get Attribute : id라고 되어있는 속성값을 가져온다. slice는 마지막 문자를 가져옴.
        if(arr[idx]==0){
          //하트
          col.innerHTML=`<img src="../img/hart.png" >`;

          //하트개수
          cnt++;
          //cnt=cnt+1;

          //하트 8개가 되면 
          if(cnt==8){
            msg.style.color='pink';
            msg.innerHTML=`<h2>성공!!</h2>`;
            console.log(arr.indexOf(1)); //indexOf() : arr안에서 일치하는 첫번째 문자의 index를 return한다.
            //전체하트
            let i = arr.indexOf(1);
            //document.querySelectorAll('.col').innerHTML = `<img src="../img/hart.png" >`; 
            cols[arr.indexOf(1)].innerHTML=`<img src="../img/hart.png" >`; //배열 [1]에 하트 이미지 넣어주기
            init(bt);
          }
        }else{
          //폭탄
          col.innerHTML=`<img src="../img/boom.png" >`;
          msg.style.color='red';
          msg.innerHTML=`<h2>실패!!</h2>`;
          isShuffle=false;
          init(bt);
        }

        

        console.log(idx,arr[idx]); 
      })
    }

 



});