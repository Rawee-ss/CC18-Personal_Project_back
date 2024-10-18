const prisma = require("../config/prisma");
const { cartItem } = require("../config/prisma");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.getAllOrder = (req, res) => {
  res.json("get all order");
};

exports.createOrder = async (req, res, next) => {
  try {
    const { id } = req.user;
    // console.log(id);
    // Step 1 Get User Cart
    let userCart = await prisma.cart.findFirst({
      where: {
        userId: Number(id),
      },
      include: { cartItem: true },
    });

    // console.log(userCart);

    // Check Cart empty
    if (!userCart || userCart.cartItem.length === 0) {
      return res.status(400).json({ ok: false, message: "Cart is Empty" });
    }

    let cartTotal = userCart.cartItem.reduce(
      (sum, item) => sum + item.price,
      0
    );

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'slips', 
    });

    fs.unlinkSync(req.file.path);

    const slipURL = result.secure_url;

    // // Create a new Order
    const createInOrder = await prisma.orders.create({
      data: {
        orderItem: {
          create: userCart.cartItem.map((item) => ({
            productsId: item.productsId,
            price: item.price,
          })),
        },
        userId: id ,
        totalPrice: cartTotal,
        paymentStatus: "PENDING",
        slip: slipURL
      },
    });
    console.log(createInOrder);

    // // Update Product
    // const update = userCart.products.map((item) => ({
    //   where: { id: item.productId },
    //   data: {
    //     quantity: { decrement: item.count },
    //     sold: { increment: item.count },
    //   },
    // }));
    // console.log(update);

    // await Promise.all(update.map((updated) => prisma.product.update(updated)));

    // await prisma.cart.deleteMany({
    //   where: { orderedById: Number(req.user.id) },
    // });
    res.json("hi");
    // res.json({ ok: true, order });
  } catch (err) {
    next(err)
  }
};

exports.deleteOrder = (req, res) => {
  res.json("delete order");
};

//Admin
// exports.getAllOrder = (req, res) => {
//     res.json("get all order for Admin");
//   }
// exports.createOrder = (req, res) => {
//     res.json("update order for Admin");
//   }

// exports.getOrder = async (req, res, next) => {
//   try {
//     //code
//     const orders = await prisma.order.findMany({
//       where: { orderedById: Number(req.user.id) },
//       include: {
//         products: {
//           include: {
//             product: true,
//           },
//         },
//       },
//     });
//     if (orders.length === 0) {
//       return res.status(400).json({ ok: false, message: "No orders" });
//     }

//     res.json({ ok: true, orders });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
