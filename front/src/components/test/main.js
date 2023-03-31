function solution(n) {
    if (n ===0) return "1"
    if( n ===1) return "2"
    if( n=== 6) return "9"
    let binaryVal = n.toString(2)
    //그냥 조건부로 움직이면된다. 가득찬 상태가 아니라면, 0이 하나라도 있다면 좌측으로 이동하면된다.
    //이걸 lastindexof로 확인하면된다. 맨마지막칸에 있는 0은 의미가 없다.
    //1부터 마지막 전 사이에 이동시키면된다.
    //이 외의 경우에는 맨 왼쪽 1을 한칸 이동시킨다.
    // 그리고 나머지 1을 우측으로 몰아버린다.
    // 그럼 1의 갯수를 알 필요가 있을까? 있다. 
    // 이문제는 배열로 관리하면 굉장히 쉽다.
    for(let i =1; i<binaryVal.length; i++) {
        if(binaryVal[binaryVal.length - i -1] === "0") {
            if(binaryVal.slice(binaryVal.length - i -1).includes("1")) {

                const n = binaryVal.slice(binaryVal.length - i +1).split('').map(Number)
                const len = n.length;
                const sum = n.reduce((prev,next) => prev+next, 0);
                let _ =''
                for (let i =0; i<len-sum; i++){
                    _ = _ + 0;
                }
                for (let i=0; i<sum; i++ ){
                    _ = _ + 1;
                }
                return parseInt(binaryVal.slice(0,binaryVal.length - i -1) +"10" + _,2)
            }
        }
    }
    return parseInt("10"+binaryVal.slice(1),2) 
}

console.log(solution(6))