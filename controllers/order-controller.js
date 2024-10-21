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


    
    // const { id } = req.user;
    // console.log(id);
    // // Step 1 Get User Cart
    // let userCart = await prisma.cart.findFirst({
    //   where: {
    //     userId: Number(id),
    //   },
    //   include: { cartItem: true },
    // });

    // // console.log(userCart);

    // // Check Cart empty
    // if (!userCart || userCart.cartItem.length === 0) {
    //   return res.status(400).json({ ok: false, message: "Cart is Empty" });
    // }

    // let cartTotal = userCart.cartItem.reduce(
    //   (sum, item) => sum + item.price,
    //   0
    // );

    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "slips",
    // });

    // fs.unlinkSync(req.file.path);

    // const slipURL = result.secure_url;

    // // // Create a new Order
    // const createInOrder = await prisma.orders.create({
    //   data: {
    //     orderItem: {
    //       create: userCart.cartItem.map((item) => ({
    //         productsId: item.productsId,
    //         price: item.price,
    //       })),
    //     },
    //     userId: id,
    //     totalPrice: cartTotal,
    //     paymentStatus: "PENDING",
    //     slip: slipURL,
    //   },
    // });
    // console.log(createInOrder);

    // await Promise.all(update.map((updated) => prisma.product.update(updated)));

    // await prisma.cart.deleteMany({
    //   where: { orderedById: Number(req.user.id) },
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
