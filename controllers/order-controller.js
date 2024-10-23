const prisma = require("../config/prisma");
const { cartItem } = require("../config/prisma");
const cloudinary = require("../config/cloudinary");
const fs = require("fs/promises");
const path = require("path");

exports.getOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("userId", userId);

    const getOrder = await prisma.orders.findMany({
      where: {
        userId,
      },
      include: {
        orderItem: {
          include: {
            products: true,
          },
        },
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
    const { id, name, slip, totalPrice, cart, cartId } = req.body;
    const userId = req.user.id;

    console.log("req.body", req.body);
    console.log(path.parse(req.file.path).name);
    const haveFile = !!req.file;
    let uploadResult = {};
    // console.log(path.parse(req.file.path).name);
    if (haveFile) {
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        overwrite: true,

        public_id: path.parse(req.file.path).name,
      });
      await fs.unlink(req.file.path);
    }
    console.log(uploadResult);

    const cartExist = await prisma.cart.findFirst({
      where: { userId },
    });

    const findCartItem = await prisma.cartItem.findMany();

    console.log("findCartItem", findCartItem);

    const payment = await prisma.orders.create({
      data: {
        totalPrice: req.body.totalPrice,
        cartId: +req.body.cartId,
        userId: req.user.id,
        slip: uploadResult.secure_url,
        cartId: cartExist.id,
      },
    });

    for (let item of findCartItem) {
      await prisma.orderItem.create({
        data: {
          price: item.price,
          productsId: item.productsId,
          ordersId: payment.id,
        },
      });
    }

    await prisma.cartItem.deleteMany();

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

exports.updateOrderStatus = async (req, res) => {
  const { orderId, paymentStatus } = req.body;

  try {
    const updatedOrder = await prisma.orders.update({
      where: { id: orderId },
      data: { paymentStatus: paymentStatus },
    });

    res.json(200,"Order status updated", updatedOrder );
  } catch (err) {
    next(err);
  }
};
