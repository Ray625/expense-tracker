const db = require('../../config/mongoose')
const User = require('../user')
const Record = require('../record')
const Category = require('../category')
const bcrypt = require('bcryptjs')

const recordList = [
  { name: '早餐', date: '2023-05-07', amount: '120', category: '飲食' },
  { name: '做公益', date: '2023-05-06', amount: '1000', category: '其他' },
  { name: '儲值', date: '2023-05-06', amount: '500', category: '娛樂' },
  { name: '計程車', date: '2023-05-07', amount: '150', category: '交通' },
  { name: '出遊', date: '2023-05-05', amount: '600', category: '娛樂' },
  { name: '買菜', date: '2023-05-07', amount: '450', category: '飲食' },
  { name: 'KTV', date: '2023-05-07', amount: '550', category: '娛樂' },
  { name: '垃圾袋', date: '2023-05-06', amount: '95', category: '家居' }
]

const SEED_USER = [
  { name: 'user1', email: 'user1@example.com', password: '1234' },
  { name: 'user2', email: 'user2@example.com', password: '1234' }
]

db.once('open', async () => {
  try {
    await Promise.all(recordList.map(async (record, record_index) => {
      try {
        const categoryName = record.category
        const category = await Category.findOne({ category: categoryName }).lean()
        recordList[record_index].categoryId = category._id
        recordList[record_index].categoryIcon = category.icon
      } catch (err) {
        console.log(err)
      }
    }))
    await Promise.all(SEED_USER.map(async (seed, seed_index) => {
      try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(seed.password, salt)
        const user = await User.create({
          name: seed.name,
          email: seed.email,
          password: hash,
        })
        console.log('user created')
        const recordSeeds = []
        recordList.forEach((record, record_index) => {
          if (record_index >= seed_index * 4 && record_index < (seed_index + 1) * 4) {
            record.userId = user._id
            recordSeeds.push(record)
          }
        })
        await Record.create(recordSeeds)
        console.log('record created')
      } catch (err) {
        console.log(err)
      }
    })
    )
  } catch (err) {
    console.log(err)
  }
  console.log('All done')
  process.exit()
})