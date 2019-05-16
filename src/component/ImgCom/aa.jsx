

var actions = new Map([
    [/^[1-4]$/, '<div>123</div>'],
    [/^5$/, '<div>456</div>'],
    [/^6$/, '<div>789</div>']
  ])
  
  var onButtonClick = status => {
    //   debugger
    let action = [...actions].filter(([key, value]) => key.test(`${status}`))
    console.log(action, 'action')
  }
  console.log(onButtonClick('2'))


  var statusHtml = {
    0: (
      `<div>
        <span className='succeed-icon'></span>
        <span className='succeed-text'>扣款成功</span>
      </div>`
    ),
    1: (
      `<div>
        <span className='waiting-icon'></span>
        <span className='waiting-text'>待扣款</span>
      </div>`
    ),
    2: (
      `<div>
        <span className='overdue-icon'></span>
        <span className='overdue-text'>已逾期{detail.repaymentLateDays}天</span>
        <p className='overdue-notice'>逾期15天后，车辆保险将退保，请及时还款</p>
      </div>`
    ),
    3: (
      `<div>
        <span className='overdue-icon'></span>
        <span className='overdue-text'>已逾期{detail.repaymentLateDays}天</span>
        <p className='overdue-notice'>逾期15天后，车辆保险将退保，请及时还款</p>
      </div>`
    ),
    4: (
      `<div>
        <span className='overdue-icon'></span>
        <span className='overdue-text'>已逾期{detail.repaymentLateDays}天</span>
        <p className='overdue-notice'>逾期15天后，车辆保险将退保，请及时还款</p>
      </div>`
    ),
    5: (
      `<div>
        <span className='succeed-icon'></span>
        <span className='succeed-text'>已还清</span>
      </div>`
    ),
    6: (
      `<div>
        <span className='waiting-icon'></span>
        <span className='waiting-text'>还款中</span>
      </div>`
    ),
    7: (
      `<div>
        <span className='succeed-icon'></span>
        <span className='succeed-text'>已还清</span>
      </div>`
    )
  }

  var map = new Map(Object.entries(statusHtml))


  var f = Object.entries(statusHtml).reduce((result,[key,value])=>{
	let flag = result[0].find((item,index)=> {
		return item == value
	})
	
	if(flag){
		result[1].push({key,value})	
	}
	if(!flag){
		result[0].push(value)	
	}
	return result
},[[],[]])

var ff = f[1]


var ss = ff.reduce((result,item)=>{
	let arr = Object.entries(statusHtml)
	let s = arr.find(([key,value])=>{
		return item.value === value
	})	
	console.log(s,'s')
	result.push(s[0])
	return result
},[])
// ff [3,4,7] -> 重复的部分
// ss [2,2,5] -> 重复的部分对应的原对象的下标

new Map(Object.entries(statusHtml))


Object.entries(statusHtml).map(([key,value])=>{
	
	return [new RegExp(`^${key}$`),value]
})


var fff =  [3,4,7] 
var sss =  [2,2,5] 

var cc = sss.reduce((result,item,index)=>{
	result.push(`${item},${fff[index]}`)
	return result
},[])
// cc ->  ["2,3", "2,4", "5,7"]