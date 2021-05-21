

exports.addItem = (req,res) => {
    console.log(req.body.id,req.body.quantity)
    // console.log(res)
    return res.json("ok")
}