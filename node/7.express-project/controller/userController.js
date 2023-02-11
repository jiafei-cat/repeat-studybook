const { User } = require('../model')
const commonResponse = (status, message, data = null) => ({
  code: status,
  mes: message,
  data
})

exports.register = async (req, res) => {
  const userParams = req.body

  const userModel = new User(req.body)
  const dbResult = await userModel.save()
  res.status(200).json(commonResponse(0, 'success', {
    userId: dbResult._id
  }))
}

exports.list = async (req, res) => {
  res.send('/user/list')
}