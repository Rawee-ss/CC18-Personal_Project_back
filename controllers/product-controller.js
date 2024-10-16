const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.getAllProduct = async (req, res, next) => {
  try {
    // code
    const { count } = req.params;
    const products = await prisma.products.findMany({
      take: parseInt(count),
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        image: true,
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.productby = async (req, res, next) => {
  try {
    const { sort, orders, limit } = req.body;
    console.log(sort, orders, limit);
    const products = await prisma.products.findMany({
      take: limit,
      orderBy: { [sort]: orders },
      include: { category: true },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res) => {
  try {
    // code
    const { name, image, price, detail, categoryId } = req.body;
    const product = await prisma.products.create({
      data: {
        name: name,
        detail: detail,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        image: {
          create: image.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
};


exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, image, detail, price, categoryId } = req.body;
  try {
    const updatedProduct = await prisma.products.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        detail: detail,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        image: {
          create: image.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
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




exports.searchFilters = async (req, res, next) => {
  try {
    // code
    const { query, category, price } = req.body;

    if (query) {
      console.log("query-->", query);
      await handleQuery(req, res, query);
    }
    if (category) {
      console.log("category-->", category);
      await handleCategory(req, res, category);
    }
    if (price) {
      console.log("price-->", price);
      await handlePrice(req, res, price);
    }
  } catch (err) {
    next(err);
  }
};

const handleQuery = async (req, res, query) => {
  try {
    //code
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      include: {
        category: true,
        image: true,
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};
const handlePrice = async (req, res, priceRange) => {
  try {
    const products = await prisma.products.findMany({
      where: {
        price: {
          gte: priceRange[0],
          lte: priceRange[1],
        },
      },
      include: {
        category: true,
        image: true,
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};
const handleCategory = async (req, res, categoryId) => {
  try {
    const products = await prisma.products.findMany({
      where: {
        categoryId: {
          in: categoryId.map((id) => Number(id)),
        },
      },
      include: {
        category: true,
        image: true,
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};
