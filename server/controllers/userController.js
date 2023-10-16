const Globals = require("../models/Globals");
const History = require("../models/History");
const Partiya = require("../models/Partiya");
const Products = require("../models/Products");
const Xarajats = require("../models/Xarajat");

exports.index = (req, res) => {
  res.json({ message: 'Welcome to the API!' });
};
exports.addXarajat = async (req, res) => {
  try {
    var xarajat = new Xarajats({
      name: req.body.name,
      amount: req.body.amount,
      date: req.body.date,
      time: req.body.time
    });
    await xarajat.save();
    res.json(xarajat);
  } catch (error) {
    res.json(error);
  }
};
exports.getXarajat = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 20;
    const skip = (page - 1) * itemsPerPage;
    const xarajat = await Xarajats.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(itemsPerPage);

    res.json(xarajat);
  } catch (error) {
    res.json(error);
  }
};
exports.getFilteredXarajat = async (req, res) => {
  console.log(req.body.date);
  try {
    const { date } = req.body;
    const data = await Xarajats.find({
      "date.day": date.day,
      "date.month": date.month,
      "date.year": date.year
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
exports.patchFilteredXarajat = async (req, res) => {
  try {
    const { date } = req.body;

    const year = new Date().getFullYear();

    const matchingRecords = await Xarajats.find({
      'date.day': { $lte: date.day },
      'date.month': { $lte: date.month },
      'date.year': { $gte: year, $lte: date.year }
    });

    const totalAmount = matchingRecords.reduce((acc, record) => acc + record.amount, 0);

    res.json( totalAmount.toFixed(2) );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};
exports.aggregateProductsA = async (req, res) => {
  try {
    const { date } = req.body;
    const year = new Date().getFullYear();

    const result = await Products.aggregate([
      {
        $match: {
          saledPrice: { $ne: null },
          'saledDate.year': { $eq: date.year },
          $or: [
            {
              'saledDate.month': { $lt: date.month },
            },
            {
              'saledDate.month': { $eq: date.month },
              'saledDate.day': { $lte: date.day },
            },
          ],
        },
      },
      {
        $group: {
          _id: {
            year: "$saledDate.year",
            month: "$saledDate.month",
          },
          totalAmount: { $sum: "$price" },
          totalSaledPrice: { $sum: "$saledPrice" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalAmount: 1,
          totalSaledPrice: 1,
        },
      },
    ]);
    let monthlySummary = 0;

    for (let i = 1; i <= 12; i++) {
      const month = i;
      const matchingMonth = result.find((item) => item.month === month && item.year === year);
      monthlySummary += matchingMonth ? matchingMonth.totalSaledPrice - matchingMonth.totalAmount : 0;
    }

    res.json({priceSummary: monthlySummary, year, result});
  } catch (error) {
    console.error(error);
    throw error;
  } 
}
exports.getFilteredHistory = async (req, res) => {
  try {
    const { date } = req.body;
    const data = await History.find({
      "dateIn.day": date.day,
      "dateIn.month": date.month,
      "dateIn.year": date.year
    }).populate({
      path: 'product',
      populate: {
        path: 'name',
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
exports.getFilteredHistoryr = async (req, res) => {
  try {
    const { date } = req.body;
    const data = await Products.find({
      "saledDate.day": date.day,
      "saledDate.month": date.month,
      "saledDate.year": date.year
    }).populate("name");
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
exports.getFilteredHistoryAll = async (req, res) => {
  try {
    const { date } = req.body;
    const data = await Partiya.find({
      "date.day": date.day,
      "date.month": date.month,
      "date.year": date.year
    }).populate("product");
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}
exports.aggregateXarajat = async (req, res) => {
  try {
    const result = await Xarajats.aggregate([
      {
        $group: {
          _id: {
            year: "$date.year",
            month: "$date.month",
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalAmount: 1,
        },
      },
    ]);

    const monthlySummary = {};
    const now = new Date();
    const year = now.getFullYear();

    for (let i = 1; i <= 12; i++) {
      const month = i;
      const matchingMonth = result.find((item) => item.month === month && item.year === year);
      const totalAmount = matchingMonth ? matchingMonth.totalAmount : 0;
      monthlySummary[month] = totalAmount;
    }

    res.json({monthlySummary, year});
  } catch (error) {
    console.error(error);
    throw error;
  }
};
exports.aggregateXarajatwithYear = async (req, res) => {
  const { year } = req.body;
  try {
    const result = await Xarajats.aggregate([
      {
        $match: {
          "date.year": year
        }
      },
      {
        $group: {
          _id: {
            year: "$date.year",
            month: "$date.month",
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalAmount: 1,
        },
      },
    ]);

    const monthlySummary = {};
    for (let i = 1; i <= 12; i++) {
      const month = i;
      const matchingMonth = result.find((item) => item.month === month);
      const totalAmount = matchingMonth ? matchingMonth.totalAmount : 0;
      monthlySummary[month] = totalAmount;
    }

    res.json({monthlySummary, year});
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.addGlobal = async (req, res) => {
  try {
    const newGlobals = new Globals({
      name: req.body.name
    })
    await newGlobals.save();
    res.json(newGlobals);
  } catch (error) {
    console.error(error);
  }
};
exports.getGlobal = async (req, res) => {
  try {
    
    let globals = await Globals.find();
    res.json(globals);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getGlobalByName = async (req, res) => {
  try {
    const global = await Globals.findOne({ name: req.params.name });
    res.json(global);
  } catch (error) {
    console.log(error);
  }
};
exports.addProducts = async (req, res) => {
  try {
    const global = await Globals.findOne({ name: req.body.name });
    global.quantity += req.body.quantity;
    await global.save();
    
    for (let i = 0; i < req.body.quantity; i++) {
      const newProducts = new Products({
        name: global._id,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time
      });
      await newProducts.save();
      const history = new History({
        product: newProducts._id,
        status: 0,
        quantity: 1,
        companyName: "SIGMA",
        dateIn: req.body.date
      });
      await history.save();
    }
    
    const newPartiya = new Partiya({
      product: global._id,
      quantity: req.body.quantity,
      price: req.body.price,
      companyName: "SIGMA",
      date: req.body.date,
      time: req.body.time
    });
    await newPartiya.save();
    res.json({saved: true});
  } catch (error) {
    console.error(error);
  }
};
exports.addSellProducts = async (req, res) => {
  try {
    const global = await Globals.findOne({ name: req.body.name });
    global.quantity -= req.body.quantity;
    
    for (let i = 0; i < req.body.quantity; i++) {
      const product = await Products.findOne({ name: global._id, saledCompany: null });
      product.saledCompany = req.body.companyName;
      product.saledDate = req.body.date;
      product.saledTime = req.body.time;
      product.saledPrice = req.body.price;
      await product.save();

      const history = new History({
        product: product._id,
        status: 1,
        quantity: 1,
        companyName: "SIGMA",
        dateIn: req.body.date
      }); 
      await history.save();
    }
    await global.save();
    res.json({saved: true});
  } catch (error) {
    console.error(error);
  }
};
//with year filtered
exports.aggregateProductsWithYear = async (req, res) => {
  const { year } = req.body;
  try {
    const result = await Products.aggregate([
      {
        $match: {
          saledPrice: { $ne: null },
          "date.year": year
        }
      },
      {
        $group: {
          _id: {
            year: "$saledDate.year",
            month: "$saledDate.month",
          },
          totalAmount: { $sum: "$price" },
          totalSaledPrice: { $sum: "$saledPrice" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalAmount: 1,
          totalSaledPrice: 1,
        },
      },
    ]);
    const monthlySummary = {};

    for (let i = 1; i <= 12; i++) {
      const month = i;
      const matchingMonth = result.find((item) => item.month === month);
      const totalAmount = matchingMonth ? matchingMonth.totalSaledPrice - matchingMonth.totalAmount : 0;
      monthlySummary[month] = totalAmount;
    }

    res.json({priceSummary: monthlySummary, year, result});
  } catch (error) {
    console.error(error);
    throw error;
  } 
}
exports.aggregateProducts = async (req, res) => {
  try {
    const result = await Products.aggregate([
      {
        $match: {
          saledPrice: { $ne: null } // Filter out documents where saledPrice is null
        }
      },
      {
        $group: {
          _id: {
            year: "$saledDate.year",
            month: "$saledDate.month",
          },
          totalAmount: { $sum: "$price" },
          totalSaledPrice: { $sum: "$saledPrice" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalAmount: 1,
          totalSaledPrice: 1,
        },
      },
    ]);
    const monthlySummary = {};
    const now = new Date();
    const year = now.getFullYear();

    for (let i = 1; i <= 12; i++) {
      const month = i;
      const matchingMonth = result.find((item) => item.month === month && item.year === year);
      const totalAmount = matchingMonth ? matchingMonth.totalSaledPrice - matchingMonth.totalAmount : 0;
      monthlySummary[month] = totalAmount;
    }

    res.json({priceSummary: monthlySummary, year, result});
  } catch (error) {
    console.error(error);
    throw error;
  } 
}
exports.getHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 20;
    const skip = (page - 1) * itemsPerPage;
    
    const history = await History.find()
      .populate({
        path: 'product',
        populate: {
          path: 'name', // Assuming 'name' is the field that references the 'Product' collection
        },
      })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(itemsPerPage);

    res.json(history);
  } catch (error) {
    res.json(error);
  }
};
exports.getHistoryAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 20;
    const skip = (page - 1) * itemsPerPage;

    const partiyas = await Partiya.find()
      .populate("product")
      .sort({ _id: -1 })
      .skip(skip)
      .limit(itemsPerPage);
    res.json(partiyas);
  } catch (error) {
    console.log(error);
  }
}
exports.getHistory5 = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 5;
    const skip = (page - 1) * itemsPerPage;
    
    const history = await History.find()
      .populate({
        path: 'product',
        populate: {
          path: 'name', // Assuming 'name' is the field that references the 'Product' collection
        },
      })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(itemsPerPage);

    res.json(history);
  } catch (error) {
    res.json(error);
  }
};
exports.getDollar = async (req, res) => {
  const { date } = req.body;
  console.log(date);
  try {
    const resp = await fetch(`https://www.mastercard.com/settlement/currencyrate/conversion-rate?fxDate=${date}&transCurr=USD&crdhldBillCurr=UZS&bankFee=0&transAmt=1`);
    const data = await resp.json();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}
exports.getRubl = async (req, res) => {
  const { date } = req.body;
  console.log(date);
  try {
    const resp = await fetch(`https://www.mastercard.com/settlement/currencyrate/conversion-rate?fxDate=${date}&transCurr=RUB&crdhldBillCurr=UZS&bankFee=0&transAmt=1`);
    const data = await resp.json();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}