console.log("bot is running!");
var TelegramBot = require("node-telegram-bot-api");
const ExcelJS = require('exceljs');
var DataValue = require("./models/DataValue");
const Globals = require("./models/Globals");
const Xarajats = require("./models/Xarajat");
const Products = require("./models/Products");
var bot = new TelegramBot("5958463544:AAEowedit3fEMuIjVMlLj7n3mhUvBwTS8jE", { polling: true });

var stripos = (haystack, needle) => {
  var haystackLower = haystack.toLowerCase();
  var needleLower = needle.toLowerCase();
  return haystackLower.indexOf(needleLower);
};

bot.onText(/\/start/, async (msg) => {
  bot.sendMessage(msg.chat.id, "Bosh Menu", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "SIGMA", callback_data: "type||SIGMA" }],
        [{ text: "GLOBAL", callback_data: "type||GLOBAL" }],
      ]
    }
  });
});

bot.on("message", async (msg) => {

  const userData = await DataValue.findOne({ tgId: msg.chat.id });
  if (userData && userData.value){
    if(stripos(userData.value, "amount||") !== -1){
      if(isNaN(msg.text)){
        return bot.sendMessage(msg.chat.id, "Iltimos sonda kiriting");
      }

      const currentDate = new Date();
      const formattedDate = {
        day: currentDate.getDate(),
        month: (currentDate.getMonth() + 1),
        year: currentDate.getFullYear(),
      };

      const formattedTime = {
        hour: currentDate.getHours(),
        minute: currentDate.getMinutes(),
        second: currentDate.getSeconds(),
      };

      const type = userData.value.split("||")[1];
      const name = userData.value.split("||")[2];
      const amount = msg.text;
      if(type === "SIGMA"){
        await fetch("http://81.94.159.226:3001/api/xarajat", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            name: name,
            amount: amount,
            date: formattedDate,
            time: formattedTime
          })
        });
        await userData.deleteOne({tgId: msg.chat.id});
        await bot.sendMessage(msg.chat.id, "Saqlandi");
        bot.sendMessage(msg.chat.id, "Bosh Menu", {
          reply_markup: {
            inline_keyboard: [
              [{ text: "SIGMA", callback_data: "type||SIGMA" }],
              [{ text: "GLOBAL", callback_data: "type||GLOBAL" }],
            ]
          }
        });

      }else if(type === "GLOBAL"){
        await fetch("http://81.94.159.226:3002/api/xarajat", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            name: name,
            amount: amount,
            date: formattedDate,
            time: formattedTime
          })
        });
        await userData.deleteOne({tgId: msg.chat.id});
        await bot.sendMessage(msg.chat.id, "Saqlandi");
        bot.sendMessage(msg.chat.id, "Bosh Menu", {
          reply_markup: {
            inline_keyboard: [
              [{ text: "SIGMA", callback_data: "type||SIGMA" }],
              [{ text: "GLOBAL", callback_data: "type||GLOBAL" }],
            ]
          }
        });
      }
    }
    if(stripos(userData.value, "xarajat||") !== -1){
      const type = userData.value.split("||")[1];
      userData.value = `amount||${type}||${msg.text}`;
      await userData.save();
      bot.sendMessage(msg.chat.id, "Xarajat Summasini Kiriting: ");
    }
  }
});


bot.on("callback_query", async (msg) => {
  if(stripos(msg.data, "type||")!= -1){
    const type = msg.data.split("||")[1];
    bot.editMessageText(`<b>${type}</b>`, {
      chat_id: msg.message.chat.id,
      message_id: msg.message.message_id,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Xarajat qoshish", callback_data: `xarajat||${type}` }],
          [{ text: "Hisobot", callback_data: `hisobot||${type}` }],
          [{ text: "Excel Sklad", callback_data: `skladexcel||${type}` }]
        ],
      }
    });
  }
  if(stripos(msg.data, "xarajat||")!= -1){
    await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
    const type = msg.data.split("||")[1];
    const newDataValue = new DataValue({
      value: `xarajat||${type}`,
      tgId: msg.message.chat.id,
    });
    await newDataValue.save();
    bot.sendMessage(msg.message.chat.id, `<b>${type}</b>
Xarajat Nomini Kiriting: `, {
      parse_mode: "HTML",
    });
  }
  if (stripos(msg.data, "skladexcel||") !== -1) {
    const type = msg.data.split("||")[1];
    const cellStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center', vertical: 'middle' },
      border: {
        top: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
      },
    };
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('SKLAD');
    if(type == "SIGMA"){
      await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
    await bot.sendMessage(msg.message.chat.id, "Tayyorlanmoqda...");
    const sklad = await Globals.find();
    console.log(sklad);

    worksheet.getColumn(1).width = 5;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 10;

    worksheet.getCell(1, 1).value = 'ID';
    worksheet.getCell(1, 2).value = 'Mahsulot Nomi';
    worksheet.getCell(1, 3).value = 'Qoldiq';

    sklad.forEach((item, index) => {
      worksheet.getCell(index + 2, 1).value = index + 1;
      worksheet.getCell(index + 2, 2).value = item.name;
      worksheet.getCell(index + 2, 3).value = item.quantity;
    });

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.style = cellStyle;
      });
    });
    await workbook.xlsx.writeFile('./docs/HISOBOT.xlsx');

    await bot.sendDocument(msg.message.chat.id, './docs/HISOBOT.xlsx');
    await bot.sendMessage(msg.message.chat.id, "Bosh Menu", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "SIGMA", callback_data: "type||SIGMA" }],
          [{ text: "GLOBAL", callback_data: "type||GLOBAL" }],
        ]
      }
    });
    }else if(type === "GLOBAL"){
      await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
      await bot.sendMessage(msg.message.chat.id, "Tayyorlanmoqda...");
      let sklad = await fetch("http://81.94.159.226:3002/api/global", {method: "GET"});
      sklad = await sklad.json();

      worksheet.getColumn(1).width = 5;
      worksheet.getColumn(2).width = 20;
      worksheet.getColumn(3).width = 10;

      worksheet.getCell(1, 1).value = 'ID';
      worksheet.getCell(1, 2).value = 'Mahsulot Nomi';
      worksheet.getCell(1, 3).value = 'Qoldiq';

      sklad.map((item, index) => {
        console.log(index);
        console.log(item.name);
        worksheet.getCell(index + 2, 1).value = index + 1;
        worksheet.getCell(index + 2, 2).value = item.name;
        worksheet.getCell(index + 2, 3).value = item.quantity;
      });

      worksheet.eachRow((row) => {
        row.eachCell((cell) => {
          cell.style = cellStyle;
        });
      });
      await workbook.xlsx.writeFile('./docs/HISOBOT.xlsx');
      await bot.sendDocument(msg.message.chat.id, './docs/HISOBOT.xlsx');
      await bot.sendMessage(msg.message.chat.id, "Bosh Menu", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "SIGMA", callback_data: "type||SIGMA" }],
            [{ text: "GLOBAL", callback_data: "type||GLOBAL" }],
          ]
        }
      });
    }
  }
  if (stripos(msg.data, "hisobot||") !== -1) {
    await bot.sendMessage(msg.message.chat.id, "Tayyorlanmoqda...");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Отчеты');
    const worksheet2 = workbook.addWorksheet('Общый Отчет');
    const type = msg.data.split("||")[1];
    const labels = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    const cellStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center', vertical: 'middle' },
      border: {
        top: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
      },
    };
    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 10;

    worksheet.mergeCells('A1:B1');
    worksheet.getCell(1, 2).value = 'Расходы';

    if(type == "SIGMA"){
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

    labels.forEach((item, index) => {
      worksheet.getCell(index + 2, 1).value = item;
      worksheet.getCell(index + 2, 2).value = `${monthlySummary[index + 1]}$`;
    });
    let xarajatSummary = 0;
    for (const key in monthlySummary) {
      console.log(monthlySummary[key]);
      xarajatSummary += monthlySummary[key];
    }
    const lastRowIndex = labels.length + 2;
    worksheet.getCell(lastRowIndex, 1).value = 'Итого:';
    worksheet.getCell(lastRowIndex, 2).value = `${xarajatSummary}$`;

    const results = await Products.aggregate([
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
    const monthlySummaryFoyda = {};

    for (let i = 1; i <= 12; i++) {
      const month = i;
      const matchingMonth = results.find((item) => item.month === month && item.year === year);
      const totalAmount = matchingMonth ? matchingMonth.totalSaledPrice - matchingMonth.totalAmount : 0;
      monthlySummaryFoyda[month] = totalAmount;
    }
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 10;

    worksheet.mergeCells('D1:E1');
    worksheet.getCell(1, 4).value = 'Прибыл';

    labels.forEach((item, index) => {
      worksheet.getCell(index + 2, 4).value = item;
      worksheet.getCell(index + 2, 5).value = `${monthlySummaryFoyda[index + 1]}$`;
    });
    let FoydaSummary = 0;
    for (const key in monthlySummaryFoyda) {
      console.log(monthlySummaryFoyda[key]);
      FoydaSummary += monthlySummaryFoyda[key];
    }
    const lastRowIndexs = labels.length + 2;
    worksheet.getCell(lastRowIndexs, 4).value = 'Итого:';
    worksheet.getCell(lastRowIndexs, 5).value = `${FoydaSummary}$`;

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.style = cellStyle;
      });
    });
    worksheet2.mergeCells('A1:B1');
    worksheet2.mergeCells('A4:B4');

    worksheet2.getCell(1, 1).value = "Отчет"
    worksheet2.getCell(2, 1).value = "Прибыл:"
    worksheet2.getCell(2, 2).value = `${FoydaSummary}$`
    worksheet2.getCell(3, 1).value = "Расходы:"
    worksheet2.getCell(3, 2).value = `${xarajatSummary}$`
    worksheet2.getCell(4, 1).value = `Итого: ${(FoydaSummary - xarajatSummary).toFixed(2)}$`
    worksheet2.eachRow((row) => {
      row.eachCell((cell) => {
        cell.style = cellStyle;
      });
    });
    await workbook.xlsx.writeFile('./docs/HISOBOTEXCEL.xlsx');

    await bot.sendDocument(msg.message.chat.id, './docs/HISOBOTEXCEL.xlsx');
    await bot.sendMessage(msg.message.chat.id, "Bosh Menu", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "SIGMA", callback_data: "type||SIGMA" }],
          [{ text: "GLOBAL", callback_data: "type||GLOBAL" }],
        ]
      }
    });
    }else if (type === "GLOBAL"){
      let result = await fetch("http://81.94.159.226:3002/api/xarajatAgg", {method: "POST"});
      result = await result.json();
  
      labels.forEach((item, index) => {
        worksheet.getCell(index + 2, 1).value = item;
        worksheet.getCell(index + 2, 2).value = `${result.monthlySummary[index + 1]}$`;
      });
      let xarajatSummary = 0;
      for (const key in result.monthlySummary) {
        xarajatSummary += result.monthlySummary[key];
      }
      const lastRowIndex = labels.length + 2;
      worksheet.getCell(lastRowIndex, 1).value = 'Итого:';
      worksheet.getCell(lastRowIndex, 2).value = `${xarajatSummary}$`;
  
      let results = await fetch("http://81.94.159.226:3002/api/productsAgg", {method: "POST"});
      results = await results.json();
      worksheet.getColumn(4).width = 15;
      worksheet.getColumn(5).width = 10;
  
      worksheet.mergeCells('D1:E1');
      worksheet.getCell(1, 4).value = 'Прибыл';
  
      labels.forEach((item, index) => {
        worksheet.getCell(index + 2, 4).value = item;
        worksheet.getCell(index + 2, 5).value = `${results.priceSummary[index + 1]}$`;
      });
      let FoydaSummary = 0;
      for (const key in results.priceSummary) {
        FoydaSummary += results.priceSummary[key];
      }
      const lastRowIndexs = labels.length + 2;
      worksheet.getCell(lastRowIndexs, 4).value = 'Итого:';
      worksheet.getCell(lastRowIndexs, 5).value = `${FoydaSummary}$`;
  
      worksheet.eachRow((row) => {
        row.eachCell((cell) => {
          cell.style = cellStyle;
        });
      });
      worksheet2.mergeCells('A1:B1');
      worksheet2.mergeCells('A4:B4');
  
      worksheet2.getCell(1, 1).value = "Отчет"
      worksheet2.getCell(2, 1).value = "Прибыл:"
      worksheet2.getCell(2, 2).value = `${FoydaSummary}$`
      worksheet2.getCell(3, 1).value = "Расходы:"
      worksheet2.getCell(3, 2).value = `${xarajatSummary}$`
      worksheet2.getCell(4, 1).value = `Итого: ${(FoydaSummary - xarajatSummary).toFixed(2)}$`
      worksheet2.eachRow((row) => {
        row.eachCell((cell) => {
          cell.style = cellStyle;
        });
      });
      await workbook.xlsx.writeFile('./docs/HISOBOTEXCEL.xlsx');
  
      await bot.sendDocument(msg.message.chat.id, './docs/HISOBOTEXCEL.xlsx');
      await bot.sendMessage(msg.message.chat.id, "Bosh Menu", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "SIGMA", callback_data: "type||SIGMA" }],
            [{ text: "GLOBAL", callback_data: "type||GLOBAL" }],
          ]
        }
      });
    }

    
  }
});