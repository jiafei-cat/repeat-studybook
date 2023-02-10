exports.list = async (req, res) => {
  res.send('/user/list')
}

exports.register = async (req, res) => {
  console.log(req.body)
  res.send('111')
}