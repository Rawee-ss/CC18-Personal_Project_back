const prisma = require("../config/prisma");
const { cartItem } = require("../config/prisma");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const getOrder = await prisma.products.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        name: true,
        price: true,
      },
    });
    res.json({ getOrder });
  } catch (err) {
    next(err);
  }
};

// ทำใหม่
exports.createOrder = async (req, res, next) => {
  try {
    const { id, name, slip, totalPrice, cartId } = req.body;
    console.log("req.body", req.body);
    console.log(req.file)
    const haveFile = !!req.file;
    let uploadResult = {};
    console.log(path.parse(req.file.path).name);
    // if (haveFile) {
    //   uploadResult = await cloudinary.uploader.upload(req.file.path, {
    //     overwrite: true,

    //     public_id: path.parse(req.file.path).name,
    //   });
    //   await fs.unlink(req.file.path);
    // }

    // const product = await prisma.products.create({
    //   data: {
    //     name: name,
    //     detail: detail,
    //     price: parseFloat(price),
    //     categoryId: parseInt(categoryId),
    //     image: uploadResult.secure_url || "",
    //   },
    // });

    res.json("hi");
    // res.json({ ok: true, order });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.products.update({
      where: { id: parseInt(id) },
      data: { isDelete: true },
    });

    res.json("delete order");
  } catch (err) {
    next(err);
  }
};
