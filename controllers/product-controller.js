const prisma = require("../config/prisma");

// let products = [];

exports.getAllProduct = async (req, res, next) => {
  try {
    const { count } = req.params;
    const products = await prisma.products.findMany({
      take: pareseInt(count),
      orderBy: { createAt: "desc" },
      include: {
        category: true,
        image: true,
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
}; //admin,user

exports.createProduct = async (req, res, next) => {
  const { name, image, detail, price, categoryId } = req.body;
  try {
    const newProduct = await prisma.products.create({
      data: {
        name: name,
        image: {
          create: image.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
        price: parseFloat(price),
        categoryId: parseFloat(categoryId),
        detail: detail,
      },
    });
    res.json(newProduct);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, image, detail, price, categoryId } = req.body;
  try {
    await prisma.image.deleteMany({
      where:{
        productsId: Number(req.params.id)
      }
    })
    const updatedProduct = await prisma.products.update({
      where: { id: parseInt(id) },
      data: { name, image, detail, price, categoryId },
    });
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.products.update({
      where: { id: parseInt(id) },
      data: { isDelete: true },
    });

    res.json("Product deleted successfully");
  } catch (err) {
    next(err);
  }
};
