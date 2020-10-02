function parseUnworkDays(str) {
  const [name, days] = str.split(' ')
  
  return {
      name,
      firstDay: days.slice(0, 2),
      secondDay: days.slice(2)
  }
}

function parseWeekdays(firstDay, secondDay) {
  const dayMap = { '周五': 1, '周六': 1, '周日': 2, '周一': 3, '周二': 4, '周三': 5, '周四': 6 }
  
  return [dayMap[firstDay], dayMap[secondDay]]
}

// 员工一个星期工作的时间不超过5天


// 把除了管理员外的员工表填满
// 让员工以特定的格式输入无法工作的日期
// 微信读取信息，解析，删除无法工作的日期

// 先把员工排满表
// 过滤删掉无法工作日
const student = {  
  name: '',
  unworkDays: [0, 1],
  isManager: true,
  address: 1,
  id: 1
}

const buildings = [
  1, 2, 3, 4, 5, 6, 7, 8, 9
];


const generateWorkday = () => Math.floor(Math.random() * 7 + 1)

const generateUnworkDays = () => {
  const day = generateWorkday()
  let secondDay
  let d
  while ((d = generateWorkday()) === day) {
  }

  secondDay = d
  return [day, secondDay]
}

let columns = [2,4,6,7,8,1,3,5,9]

const getAddress = index => columns[Math.floor((index > 2 ? index + 1 : index) / 2)]

const students = `
`.split('\n')
//     .map(s => s.replace(/\d/g, '').trim())
//     .filter(s => s.length <= 5 && s)
//     .map((name, index) => ({ 
//       name, 
//       id: index + 1, 
//       unworkDays: generateUnworkDays(),
//       address: getAddress(index),
//       isManager: index === 1 || index === 12
//     }))

const students = [
  
]

// console.log(students)


const mapWorkday = day => {
    let weekday = ((day + 1) % 7)
    return weekday === 0 ? 7 : weekday
}

const matrixs = [
  [4, 5, 6, 7, 8, 9, 10, 11],
  [],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11],
].map((submatrix, index) => {
  const address = getAddress(index)
  const student = students[index]
  // const workdays = submatrix.filter(day => !student.unworkDays.includes(mapWorkday(day)))
  if (submatrix[0] === 4 && !student.isManager) {
    return address
  }
  return -1 
})

for (let i = 0; i < matrixs.length; i++) {
  const currentRow = matrixs[i]


}

console.log(matrixs)

// 对每一天，删除多余的员工
// 对没有监督到的宿舍，添加员工
  // 优先级 + 过滤条件
  // 本栋员工 > 同样本栋 工作日少的员工 > 工作日少的员工 > 员工 > 负责人


// 数字
// 布尔值
// 字符串
// 函数



// 字符串 -> 编程语言(字符串) -> 可以用编程语言做的事情


