exports.getAllCategory = (req, res, next) => {
  res.json("get All category");
};
exports.createCategory = async (req, res, next) => {
    try{
        
    }catch(err){
        next(err)
        
    }
    res.json("create category");
};
exports.deleteCategory = (req, res, next) => {
    try{
        const{id} = req.params
        console.log(id)
    }catch(err){
        next(err)
    }
  res.json("delete category");
};
