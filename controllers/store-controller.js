const prisma = require("../config/prisma");

exports.updateStore = async (req, res, next) => {
  try{
    const { status } = req.body;
    console.log('status==', status)
    const {id} = req.params

    await prisma.store.update({
      where:{
        productsId:+id
      },
      data:{status}
    })

    res.json("my store");
  }catch(err){
    console.log(err)
    next(err)
  }
};

exports.getStoreByid = async (req, res, next) => {
  try{
const {id} = req.params
console.log('id', id)

    const getStore = await prisma.store.findFirst({
      where:{productsId: +id},
      include: {products: true}
    })

    res.json(getStore);
  }catch(err){
    next(err)
  }
};
