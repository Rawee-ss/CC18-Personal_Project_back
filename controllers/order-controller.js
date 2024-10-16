exports.getAllOrder = (req, res) => {
  res.json("get all order");
};
exports.createOrder = (req, res) => {
  res.json("update order");
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



// exports.saveOrder = async (req, res, next) => {
//   try {
//     //code
//     // Step 1 Get User Cart
//     const userCart = await prisma.cart.findFirst({
//       where: {
//         orderedById: Number(req.user.id),
//       },
//       include: { products: true },
//     });

//     // Check Cart empty
//     if (!userCart || userCart.products.length === 0) {
//       return res.status(400).json({ ok: false, message: "Cart is Empty" });
//     }

//     // Check quantity
//     for (const item of userCart.products) {
//       // console.log(item)
//       const product = await prisma.product.findUnique({
//         where: { id: item.productId },
//         select: { quantity: true, title: true },
//       });
//       // console.log(item)
//       // console.log(product)
//       if (!product || item.count > product.quantity) {
//         return res.status(400).json({
//           ok: false,
//           message: `ขออภัย. สินค้า ${product?.title || "product"} หมด`,
//         });
//       }
//     }

//     // Create a new Order
//     const order = await prisma.order.create({
//       data: {
//         products: {
//           create: userCart.products.map((item) => ({
//             productId: item.productId,
//             count: item.count,
//             price: item.price,
//           })),
//         },
//         orderedBy: {
//           connect: { id: req.user.id },
//         },
//         cartTotal: userCart.cartTotal,
//       },
//     });

//     // Update Product
//     const update = userCart.products.map((item) => ({
//       where: { id: item.productId },
//       data: {
//         quantity: { decrement: item.count },
//         sold: { increment: item.count },
//       },
//     }));
//     console.log(update);

//     await Promise.all(update.map((updated) => prisma.product.update(updated)));

//     await prisma.cart.deleteMany({
//       where: { orderedById: Number(req.user.id) },
//     });
//     res.json({ ok: true, order });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
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

