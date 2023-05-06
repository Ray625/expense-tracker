const Category = require('../category')
const db = require('../../config/mongoose')

const categoryList = [
  {
    category: '家居',
    icon: 'fa-solid fa-house'
  },
  {
    category: '交通',
    icon: 'fa-solid fa-van-shuttle'
  },
  {
    category: '娛樂',
    icon: 'fa-solid fa-face-grin-beam'
  },
  {
    category: '飲食',
    icon: 'fa-solid fa-utensils'
  },
  {
    category: '其他',
    icon: 'fa-solid fa-pen'
  }
]

// const categoryArray = ['家居', '交通', '娛樂', '飲食', '其他']
// const categoryIcon = ['fa-solid fa-house', 'fa-solid fa-van-shuttle', 'fa-solid fa-face-grin-beam', 'fa-solid fa-utensils', 'fa-solid fa-pen']

db.once('open', () => {
  Category.create(categoryList)
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(error => console.log(error))
})

