const prisma = require("../config/prisma");

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });
    res.json(category);
  } catch (err) {
    next(err);
  }
};

exports.getAllCategory = async (req, res, next) => {
  try {
    const category = await prisma.category.findMany();

    res.json(category);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.json("delete category success", category);
  } catch (err) {
    next(err);
  }
};
