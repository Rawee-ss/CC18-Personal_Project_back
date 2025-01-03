const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");
const fs = require("fs/promises");
const path = require("path");

exports.getAllProduct = async (req, res, next) => {
  try {
    // code
    const { count } = req.params;
    const products = await prisma.products.findMany({
      where:{isDelete:false},
      take: parseInt(count),
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        // image: true,
      },
    });
    console.log(products);
    res.json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    // code
    const { id } = req.params;
    const products = await prisma.products.findFirst({
      where: {
        id: +id,
      },
    });
    console.log(products);
    res.json({ products });
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

exports.createProduct = async (req, res, next) => {
  try {
    const { name, image, price, detail, categoryId } = req.body;

    const haveFile = !!req.file;
    let uploadResult = {};
    console.log(path.parse(req.file.path).name);
    if (haveFile) {
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        overwrite: true,

        public_id: path.parse(req.file.path).name,
      });
      await fs.unlink(req.file.path);
    }

    const product = await prisma.products.create({
      data: {
        name: name,
        detail: detail,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        image: uploadResult.secure_url || "",
      },
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, image, price, detail, categoryId } = req.body;
    const { id } = req.params;
    console.log("file",req.file)

    console.log(id, "Product id");

    const data = {
      name: name,
      detail: detail,
      price: parseFloat(price),
      categoryId: parseInt(categoryId),
    }

    const haveFile = !!req.file;
    let uploadResult = {};
    // console.log(path.parse(req.file.path).name);
    if (haveFile) {
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        overwrite: true,

        public_id: path.parse(req.file.path).name,
      });
      await fs.unlink(req.file.path);

      data.image =  uploadResult.secure_url
    }

    const product = await prisma.products.update({
      where: { id: +id },
      data
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { productId: id } = req.params;
  console.log(req.params)
  try {
    await prisma.products.update({
      where: { id: Number(id) },
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
