const moment = require("moment");
const { currencyFormat } = require("./../../utils/misc");
const getPaymentAmount = require("./../bookings/getPaymentAmount");

module.exports = (body) => {
  const {
    booking_reference,
    check_in,
    check_out,
    guest,
    createdAt,
    rooms,
    payment,
    billing,
  } = body;
  const { first_name, last_name, no_guest } = guest;

  const getNoQuantity = (roomtype_id) => {
    return rooms.filter((obj) => obj.roomtype_id === roomtype_id).length;
  };

  const getRoomAmount = (roomtype_id, rate) => {
    const roomTotalAmount = parseInt(getNoQuantity(roomtype_id)) * rate;
    return roomTotalAmount;
  };

  const removeDuplicates = rooms.filter(
    (v, i, a) => a.findIndex((t) => t.roomtype_id === v.roomtype_id) === i
  );

  const itemBody = removeDuplicates.map((e) => {
    return {
      room_name: e.roomtype_name,
      rate: e.room_amount,
      qty: getNoQuantity(e.roomtype_id),
      amount: getRoomAmount(e.roomtype_id, e.room_amount),
    };
  });

  const handleGetNoNights = () => {
    const start = moment(check_in, "YYYY-MM-DD");
    const end = moment(check_out, "YYYY-MM-DD");
    const nights = Math.abs(moment.duration(start.diff(end)).asDays());
    return nights;
  };

  const getSubTotal = () => {
    let total = 0;
    itemBody.map((e) => (total += e.amount));
    return total;
  };

  const getTotalAmount = () => {
    return getSubTotal() * handleGetNoNights();
  };

  const handleVat = () => {
    const vatable_sales = getTotalAmount() / 1.12;
    const vat = getTotalAmount() - vatable_sales;

    return {
      vatable_sales,
      vat,
    };
  };

  const amount_paid = () => {
    let payment_amount = 0;

    if (payment.length !== 0) {
      payment?.map((e) => (payment_amount += e.payment_amount));
    }
    return payment_amount;
  };

  const total_balance = () => {
    let total_balance = 0;

    total_balance =
      parseFloat(billing.total_amount) - parseFloat(amount_paid());

    return total_balance;
  };

  return `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      table, td { color: #000000; } @media (max-width: 480px) { #u_column_16 .v-col-padding { padding: 0px 30px !important; } #u_content_text_14 .v-text-align { text-align: center !important; } #u_content_text_14 .v-line-height { line-height: 170% !important; } #u_content_text_15 .v-text-align { text-align: center !important; } #u_content_text_25 .v-text-align { text-align: center !important; } #u_content_text_26 .v-text-align { text-align: center !important; } }
@media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-25 {
    width: 150px !important;
  }

  .u-row .u-col-50 {
    width: 300px !important;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
  .no-stack .u-col {
    min-width: 0 !important;
    display: table-cell !important;
  }

.no-stack .u-col-50 {
    width: 50% !important;
  }

  .no-stack .u-col-100 {
    width: 100% !important;
  }

}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

</style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #eeeeee;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #eeeeee;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #eeeeee;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f7b12f;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f7b12f;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:16px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #ecf7ff; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: left;"><span style="font-size: 20px; line-height: 28px;">Sunny Day Residences</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="cid:logo" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 17%;max-width: 98.6px;" width="98.6">
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 30px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #47484b; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong><span style="font-size: 30px; line-height: 42px;">Your Booking is Confirmed!</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #5c5757; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px;"><strong><span style="line-height: 25.2px; font-size: 18px;">BOOKING DATE</span></strong></span></p>
<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px;">${moment(
    createdAt
  ).format("LL")}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #5c5757; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px;"><strong><span style="line-height: 25.2px; font-size: 18px;">BOOKING REFERENCE</span></strong></span></p>
<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px;">${booking_reference}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong><span style="font-size: 18px; line-height: 25.2px;">NAME</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: left;"><span style="font-size: 18px; line-height: 25.2px;">${(
      first_name +
      " " +
      last_name
    ).toUpperCase()}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 20px; line-height: 28px;"><span style="line-height: 28px; font-size: 20px;">Check-in is 2:00 PM</span></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong>${moment(
      check_in
    ).format("dddd")}, ${moment(check_in).format("ll")}
      </strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 20px; line-height: 28px;"><span style="line-height: 28px; font-size: 20px;">Checkout </span></span><span style="font-size: 20px; line-height: 28px;"><span style="line-height: 28px; font-size: 20px;">by 12:00nn</span></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong>${moment(
      check_out
    ).format("dddd")}, ${moment(check_out).format("ll")}</strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%; font-size: 14px;"><span style="font-size: 20px; line-height: 28px;">Guest - ${no_guest}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 12px; line-height: 16.8px;">- Extra guest is PHP300.00/pax, min of 1 pax per room. (To be added upon check-in)</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 12px; line-height: 16.8px;">- For Senior/PWD Discounts to be applied upon check-in (Bring Valid ID or any proof)</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 20px; line-height: 28px;">Address</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">Brgy. Tuboy, Nagcarlan, Laguna, Philippines</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 20px; line-height: 28px;"><span style="line-height: 28px; font-size: 20px;">Cancellation &amp; Rebooking Policy</span></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">- Cancellation of booking is not allowed if the booking is confirmed</p>
<p style="font-size: 14px; line-height: 140%;">- Rebooking/Modifying of booking is not allowed if the booking is confirmed</p>
<p style="font-size: 14px; line-height: 140%;">- No Refund</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div id="u_column_16" class="u-col u-col-25" style="max-width: 320px;min-width: 150px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table id="u_content_text_14" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;"><strong><span style="line-height: 19.6px; font-size: 14px;">ITEM</span></strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-25" style="max-width: 320px;min-width: 150px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table id="u_content_text_15" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: right; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: center;"><strong><span style="font-size: 14px; line-height: 19.6px;">RATE</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-25" style="max-width: 320px;min-width: 150px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_text_25" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: right; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: center;"><strong><span style="font-size: 14px; line-height: 19.6px;">QTY</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-25" style="max-width: 320px;min-width: 150px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_text_26" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: right; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: center;"><strong><span style="font-size: 14px; line-height: 19.6px;">TOTAL AMOUNT</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


<!-- Row Start Here -->

${itemBody
  .map(({ room_name, rate, qty, amount }) => {
    return ` <div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-25" style="max-width: 320px;min-width: 150px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: center;"><em><span style="font-size: 14px; line-height: 19.6px;">${room_name}</span></em></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-25" style="max-width: 320px;min-width: 150px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: right; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 14px; line-height: 19.6px; white-space: nowrap;">${currencyFormat(
      rate
    )}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-25" style="max-width: 320px;min-width: 150px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: right; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 14px; line-height: 19.6px;">${qty}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-25" style="max-width: 320px;min-width: 150px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: right; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 14px; line-height: 19.6px;">${currencyFormat(
      amount
    )}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>`;
  })
  .join("")}

<!-- Row End Here -->

<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong><span style="font-size: 14px; line-height: 19.6px;">Sub-Total</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: right; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong><span style="font-size: 14px; line-height: 19.6px;">${currencyFormat(
      getSubTotal()
    )} X ${handleGetNoNights()} (Night(s))</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong><span style="font-size: 14px; line-height: 19.6px;">Vatable</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: right; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong>${currencyFormat(
      handleVat().vatable_sales
    )}</strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong><span style="font-size: 14px; line-height: 19.6px;">VAT</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: right; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong><span style="font-size: 14px; line-height: 19.6px;">${currencyFormat(
      handleVat().vat
    )}</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong><span style="font-size: 14px; line-height: 19.6px;">Total Amount</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: right; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong>${currencyFormat(
      getTotalAmount()
    )}</strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 15px 30px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong>Payment Details</strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #5c5757; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px;"><strong>AMOUNT PAID (PHP)</strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #5c5757; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: right;"><span style="font-size: 18px; line-height: 25.2px;"><strong>${currencyFormat(
      amount_paid()
    )}</strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #5c5757; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px;"><strong>TO BE PAID </strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #5c5757; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: right;"><span style="font-size: 18px; line-height: 25.2px;"><strong>${currencyFormat(
      total_balance()
    )}</strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:14px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong><span style="font-size: 20px; line-height: 28px;"><span style="line-height: 28px; font-size: 20px;">Got Questions?</span></span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">Telephone :<strong> (02) 888 3235</strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">Mobile Number : <strong>+63 906 600 0801</strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">Email : <strong>sunnydayresidencesofficial@gmail.com</strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 15px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #615e5e; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: center;"><em><strong>THIS JUST AN AUTOMATED EMAIL DO NOT REPLY</strong></em></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f7b12f;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f7b12f;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:16px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align v-line-height" style="color: #ecf7ff; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">&copy; Sunny Day Residences. All Rights Reserved</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>
  
   `;
};

// const string = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
// <html
//   xmlns="http://www.w3.org/1999/xhtml"
//   xmlns:v="urn:schemas-microsoft-com:vml"
//   xmlns:o="urn:schemas-microsoft-com:office:office"
// >
//   <head>
//     <!--[if gte mso 9]>
//       <xml>
//         <o:OfficeDocumentSettings>
//           <o:AllowPNG />
//           <o:PixelsPerInch>96</o:PixelsPerInch>
//         </o:OfficeDocumentSettings>
//       </xml>
//     <![endif]-->
//     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <meta name="x-apple-disable-message-reformatting" />
//     <!--[if !mso]><!-->
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <!--<![endif]-->
//     <title></title>

//     <style type="text/css">
//       table,
//       td {
//         color: #000000;
//       }
//       @media (max-width: 480px) {
//         #u_column_16 .v-col-padding {
//           padding: 0px 30px !important;
//         }
//         #u_content_text_14 .v-text-align {
//           text-align: center !important;
//         }
//         #u_content_text_14 .v-line-height {
//           line-height: 170% !important;
//         }
//         #u_content_text_15 .v-text-align {
//           text-align: center !important;
//         }
//         #u_content_text_25 .v-text-align {
//           text-align: center !important;
//         }
//         #u_content_text_26 .v-text-align {
//           text-align: center !important;
//         }
//       }
//       @media only screen and (min-width: 620px) {
//         .u-row {
//           width: 600px !important;
//         }
//         .u-row .u-col {
//           vertical-align: top;
//         }

//         .u-row .u-col-25 {
//           width: 150px !important;
//         }

//         .u-row .u-col-50 {
//           width: 300px !important;
//         }

//         .u-row .u-col-100 {
//           width: 600px !important;
//         }
//       }

//       @media (max-width: 620px) {
//         .u-row-container {
//           max-width: 100% !important;
//           padding-left: 0px !important;
//           padding-right: 0px !important;
//         }
//         .u-row .u-col {
//           min-width: 320px !important;
//           max-width: 100% !important;
//           display: block !important;
//         }
//         .u-row {
//           width: calc(100% - 40px) !important;
//         }
//         .u-col {
//           width: 100% !important;
//         }
//         .u-col > div {
//           margin: 0 auto;
//         }
//         .no-stack .u-col {
//           min-width: 0 !important;
//           display: table-cell !important;
//         }

//         .no-stack .u-col-50 {
//           width: 50% !important;
//         }

//         .no-stack .u-col-100 {
//           width: 100% !important;
//         }
//       }
//       body {
//         margin: 0;
//         padding: 0;
//       }

//       table,
//       tr,
//       td {
//         vertical-align: top;
//         border-collapse: collapse;
//       }

//       p {
//         margin: 0;
//       }

//       .ie-container table,
//       .mso-container table {
//         table-layout: fixed;
//       }

//       * {
//         line-height: inherit;
//       }

//       a[x-apple-data-detectors="true"] {
//         color: inherit !important;
//         text-decoration: none !important;
//       }
//     </style>

//     <!--[if !mso]><!-->
//     <link
//       href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
//       rel="stylesheet"
//       type="text/css"
//     />
//     <!--<![endif]-->
//   </head>

//   <body
//     class="clean-body u_body"
//     style="
//       margin: 0;
//       padding: 0;
//       -webkit-text-size-adjust: 100%;
//       background-color: #eeeeee;
//       color: #000000;
//     "
//   >
//     <!--[if IE]><div class="ie-container"><![endif]-->
//     <!--[if mso]><div class="mso-container"><![endif]-->
//     <table
//       style="
//         border-collapse: collapse;
//         table-layout: fixed;
//         border-spacing: 0;
//         mso-table-lspace: 0pt;
//         mso-table-rspace: 0pt;
//         vertical-align: top;
//         min-width: 320px;
//         margin: 0 auto;
//         background-color: #eeeeee;
//         width: 100%;
//       "
//       cellpadding="0"
//       cellspacing="0"
//     >
//       <tbody>
//         <tr style="vertical-align: top">
//           <td
//             style="
//               word-break: break-word;
//               border-collapse: collapse !important;
//               vertical-align: top;
//             "
//           >
//             <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #eeeeee;"><![endif]-->

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #f7b12f;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f7b12f;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 16px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #ecf7ff;
//                                     line-height: 140%;
//                                     text-align: center;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p
//                                     style="
//                                       font-size: 14px;
//                                       line-height: 140%;
//                                       text-align: left;
//                                     "
//                                   >
//                                     <span
//                                       style="font-size: 20px; line-height: 28px"
//                                       >Sunny Day Residences</span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 40px 10px 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   width="100%"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   border="0"
//                                 >
//                                   <tr>
//                                     <td
//                                       class="v-text-align"
//                                       style="
//                                         padding-right: 0px;
//                                         padding-left: 0px;
//                                       "
//                                       align="center"
//                                     >
//                                       <img
//                                         align="center"
//                                         border="0"
//                                         src="cid:logo"
//                                         alt="Image"
//                                         title="Image"
//                                         style="
//                                           outline: none;
//                                           text-decoration: none;
//                                           -ms-interpolation-mode: bicubic;
//                                           clear: both;
//                                           display: inline-block !important;
//                                           border: none;
//                                           height: auto;
//                                           float: none;
//                                           width: 17%;
//                                           max-width: 98.6px;
//                                         "
//                                         width="98.6"
//                                       />
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px 10px 30px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #47484b;
//                                     line-height: 140%;
//                                     text-align: center;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong
//                                       ><span
//                                         style="
//                                           font-size: 30px;
//                                           line-height: 42px;
//                                         "
//                                         >Your Booking is Confirmed!</span
//                                       ></strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   height="0px"
//                                   align="center"
//                                   border="0"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   width="90%"
//                                   style="
//                                     border-collapse: collapse;
//                                     table-layout: fixed;
//                                     border-spacing: 0;
//                                     mso-table-lspace: 0pt;
//                                     mso-table-rspace: 0pt;
//                                     vertical-align: top;
//                                     border-top: 1px solid #bbbbbb;
//                                     -ms-text-size-adjust: 100%;
//                                     -webkit-text-size-adjust: 100%;
//                                   "
//                                 >
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td
//                                         style="
//                                           word-break: break-word;
//                                           border-collapse: collapse !important;
//                                           vertical-align: top;
//                                           font-size: 0px;
//                                           line-height: 0px;
//                                           mso-line-height-rule: exactly;
//                                           -ms-text-size-adjust: 100%;
//                                           -webkit-text-size-adjust: 100%;
//                                         "
//                                       >
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #5c5757;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="
//                                         font-size: 18px;
//                                         line-height: 25.2px;
//                                       "
//                                       ><strong
//                                         ><span
//                                           style="
//                                             line-height: 25.2px;
//                                             font-size: 18px;
//                                           "
//                                           >BOOKING DATE</span
//                                         ></strong
//                                       ></span
//                                     >
//                                   </p>
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="
//                                         font-size: 18px;
//                                         line-height: 25.2px;
//                                       "
//                                       >${moment(createdAt).format("LL")}</span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #5c5757;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="
//                                         font-size: 18px;
//                                         line-height: 25.2px;
//                                       "
//                                       ><strong
//                                         ><span
//                                           style="
//                                             line-height: 25.2px;
//                                             font-size: 18px;
//                                           "
//                                           >BOOKING REFERENCE</span
//                                         ></strong
//                                       ></span
//                                     >
//                                   </p>
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="
//                                         font-size: 18px;
//                                         line-height: 25.2px;
//                                       "
//                                       >${booking_reference}</span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px 10px 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong
//                                       ><span
//                                         style="
//                                           font-size: 18px;
//                                           line-height: 25.2px;
//                                         "
//                                         >NAME</span
//                                       ></strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p
//                                     style="
//                                       font-size: 14px;
//                                       line-height: 140%;
//                                       text-align: left;
//                                     "
//                                   >
//                                     <span
//                                       style="
//                                         font-size: 18px;
//                                         line-height: 25.2px;
//                                       "
//                                       >${(
//                                         first_name +
//                                         " " +
//                                         last_name
//                                       ).toUpperCase()}</span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   height="0px"
//                                   align="center"
//                                   border="0"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   width="90%"
//                                   style="
//                                     border-collapse: collapse;
//                                     table-layout: fixed;
//                                     border-spacing: 0;
//                                     mso-table-lspace: 0pt;
//                                     mso-table-rspace: 0pt;
//                                     vertical-align: top;
//                                     border-top: 1px solid #bbbbbb;
//                                     -ms-text-size-adjust: 100%;
//                                     -webkit-text-size-adjust: 100%;
//                                   "
//                                 >
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td
//                                         style="
//                                           word-break: break-word;
//                                           border-collapse: collapse !important;
//                                           vertical-align: top;
//                                           font-size: 0px;
//                                           line-height: 0px;
//                                           mso-line-height-rule: exactly;
//                                           -ms-text-size-adjust: 100%;
//                                           -webkit-text-size-adjust: 100%;
//                                         "
//                                       >
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 15px 30px 16px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px 10px 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="font-size: 20px; line-height: 28px"
//                                       ><span
//                                         style="
//                                           line-height: 28px;
//                                           font-size: 20px;
//                                         "
//                                         >Check-in is 2:00 PM</span
//                                       ></span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px 10px 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong>${moment(check_in).format(
//                                       "dddd"
//                                     )}, ${moment(check_in).format(
//   "ll"
// )}</strong>
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   height="0px"
//                                   align="center"
//                                   border="0"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   width="90%"
//                                   style="
//                                     border-collapse: collapse;
//                                     table-layout: fixed;
//                                     border-spacing: 0;
//                                     mso-table-lspace: 0pt;
//                                     mso-table-rspace: 0pt;
//                                     vertical-align: top;
//                                     border-top: 1px solid #bbbbbb;
//                                     -ms-text-size-adjust: 100%;
//                                     -webkit-text-size-adjust: 100%;
//                                   "
//                                 >
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td
//                                         style="
//                                           word-break: break-word;
//                                           border-collapse: collapse !important;
//                                           vertical-align: top;
//                                           font-size: 0px;
//                                           line-height: 0px;
//                                           mso-line-height-rule: exactly;
//                                           -ms-text-size-adjust: 100%;
//                                           -webkit-text-size-adjust: 100%;
//                                         "
//                                       >
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 15px 30px 16px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px 10px 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="font-size: 20px; line-height: 28px"
//                                       ><span
//                                         style="
//                                           line-height: 28px;
//                                           font-size: 20px;
//                                         "
//                                         >Checkout
//                                       </span></span
//                                     ><span
//                                       style="font-size: 20px; line-height: 28px"
//                                       ><span
//                                         style="
//                                           line-height: 28px;
//                                           font-size: 20px;
//                                         "
//                                         >by 12:00nn</span
//                                       ></span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px 10px 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong>${moment(check_out).format(
//                                       "dddd"
//                                     )}, ${moment(check_out).format(
//   "ll"
// )}</strong>
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   height="0px"
//                                   align="center"
//                                   border="0"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   width="90%"
//                                   style="
//                                     border-collapse: collapse;
//                                     table-layout: fixed;
//                                     border-spacing: 0;
//                                     mso-table-lspace: 0pt;
//                                     mso-table-rspace: 0pt;
//                                     vertical-align: top;
//                                     border-top: 1px solid #bbbbbb;
//                                     -ms-text-size-adjust: 100%;
//                                     -webkit-text-size-adjust: 100%;
//                                   "
//                                 >
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td
//                                         style="
//                                           word-break: break-word;
//                                           border-collapse: collapse !important;
//                                           vertical-align: top;
//                                           font-size: 0px;
//                                           line-height: 0px;
//                                           mso-line-height-rule: exactly;
//                                           -ms-text-size-adjust: 100%;
//                                           -webkit-text-size-adjust: 100%;
//                                         "
//                                       >
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 15px 30px 16px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px 10px 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="line-height: 140%; font-size: 14px">
//                                     <span
//                                       style="font-size: 20px; line-height: 28px"
//                                       >Guest - ${no_guest}</span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px 10px 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="
//                                         font-size: 12px;
//                                         line-height: 16.8px;
//                                       "
//                                       >- Extra guest is PHP500.00/pax, min of 1
//                                       pax per room. (To be added upon
//                                       check-in</span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px 10px 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="
//                                         font-size: 12px;
//                                         line-height: 16.8px;
//                                       "
//                                       >- For Senior/PWD Discounts to be applied
//                                       upon check-in (Bring Valid ID or any
//                                       proof)</span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   height="0px"
//                                   align="center"
//                                   border="0"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   width="90%"
//                                   style="
//                                     border-collapse: collapse;
//                                     table-layout: fixed;
//                                     border-spacing: 0;
//                                     mso-table-lspace: 0pt;
//                                     mso-table-rspace: 0pt;
//                                     vertical-align: top;
//                                     border-top: 1px solid #bbbbbb;
//                                     -ms-text-size-adjust: 100%;
//                                     -webkit-text-size-adjust: 100%;
//                                   "
//                                 >
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td
//                                         style="
//                                           word-break: break-word;
//                                           border-collapse: collapse !important;
//                                           vertical-align: top;
//                                           font-size: 0px;
//                                           line-height: 0px;
//                                           mso-line-height-rule: exactly;
//                                           -ms-text-size-adjust: 100%;
//                                           -webkit-text-size-adjust: 100%;
//                                         "
//                                       >
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 15px 30px 16px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="font-size: 20px; line-height: 28px"
//                                       >Address</span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px 10px 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     Brgy. Tuboy, Nagcarlan, Laguna, Philippines
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   height="0px"
//                                   align="center"
//                                   border="0"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   width="90%"
//                                   style="
//                                     border-collapse: collapse;
//                                     table-layout: fixed;
//                                     border-spacing: 0;
//                                     mso-table-lspace: 0pt;
//                                     mso-table-rspace: 0pt;
//                                     vertical-align: top;
//                                     border-top: 1px solid #bbbbbb;
//                                     -ms-text-size-adjust: 100%;
//                                     -webkit-text-size-adjust: 100%;
//                                   "
//                                 >
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td
//                                         style="
//                                           word-break: break-word;
//                                           border-collapse: collapse !important;
//                                           vertical-align: top;
//                                           font-size: 0px;
//                                           line-height: 0px;
//                                           mso-line-height-rule: exactly;
//                                           -ms-text-size-adjust: 100%;
//                                           -webkit-text-size-adjust: 100%;
//                                         "
//                                       >
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 15px 30px 16px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="font-size: 20px; line-height: 28px"
//                                       ><span
//                                         style="
//                                           line-height: 28px;
//                                           font-size: 20px;
//                                         "
//                                         >Cancellation &amp; Rebooking
//                                         Policy</span
//                                       ></span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px 10px 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     - Cancellation of booking is not allowed if
//                                     the booking is confirmed
//                                   </p>
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     - Rebooking/Modifying of booking is not
//                                     allowed if the booking is confirmed
//                                   </p>
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     - No Refund
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   height="0px"
//                                   align="center"
//                                   border="0"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   width="90%"
//                                   style="
//                                     border-collapse: collapse;
//                                     table-layout: fixed;
//                                     border-spacing: 0;
//                                     mso-table-lspace: 0pt;
//                                     mso-table-rspace: 0pt;
//                                     vertical-align: top;
//                                     border-top: 1px solid #bbbbbb;
//                                     -ms-text-size-adjust: 100%;
//                                     -webkit-text-size-adjust: 100%;
//                                   "
//                                 >
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td
//                                         style="
//                                           word-break: break-word;
//                                           border-collapse: collapse !important;
//                                           vertical-align: top;
//                                           font-size: 0px;
//                                           line-height: 0px;
//                                           mso-line-height-rule: exactly;
//                                           -ms-text-size-adjust: 100%;
//                                           -webkit-text-size-adjust: 100%;
//                                         "
//                                       >
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     id="u_column_16"
//                     class="u-col u-col-25"
//                     style="
//                       max-width: 320px;
//                       min-width: 150px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           id="u_content_text_14"
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="
//                                         font-size: 14px;
//                                         line-height: 19.6px;
//                                       "
//                                       ><strong
//                                         ><span
//                                           style="
//                                             line-height: 19.6px;
//                                             font-size: 14px;
//                                           "
//                                           >ITEM</span
//                                         ></strong
//                                       ></span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-25"
//                     style="
//                       max-width: 320px;
//                       min-width: 150px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           id="u_content_text_15"
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: right;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p
//                                     style="
//                                       font-size: 14px;
//                                       line-height: 140%;
//                                       text-align: center;
//                                     "
//                                   >
//                                     <strong
//                                       ><span
//                                         style="
//                                           font-size: 14px;
//                                           line-height: 19.6px;
//                                         "
//                                         >RATE</span
//                                       ></strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-25"
//                     style="
//                       max-width: 320px;
//                       min-width: 150px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div
//                       style="
//                         width: 100% !important;
//                         border-radius: 0px;
//                         -webkit-border-radius: 0px;
//                         -moz-border-radius: 0px;
//                       "
//                     >
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                           border-radius: 0px;
//                           -webkit-border-radius: 0px;
//                           -moz-border-radius: 0px;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           id="u_content_text_25"
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: right;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p
//                                     style="
//                                       font-size: 14px;
//                                       line-height: 140%;
//                                       text-align: center;
//                                     "
//                                   >
//                                     <strong
//                                       ><span
//                                         style="
//                                           font-size: 14px;
//                                           line-height: 19.6px;
//                                         "
//                                         >QTY</span
//                                       ></strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-25"
//                     style="
//                       max-width: 320px;
//                       min-width: 150px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div
//                       style="
//                         width: 100% !important;
//                         border-radius: 0px;
//                         -webkit-border-radius: 0px;
//                         -moz-border-radius: 0px;
//                       "
//                     >
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                           border-radius: 0px;
//                           -webkit-border-radius: 0px;
//                           -moz-border-radius: 0px;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           id="u_content_text_26"
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: right;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p
//                                     style="
//                                       font-size: 14px;
//                                       line-height: 140%;
//                                       text-align: center;
//                                     "
//                                   >
//                                     <strong
//                                       ><span
//                                         style="
//                                           font-size: 14px;
//                                           line-height: 19.6px;
//                                         "
//                                         >TOTAL AMOUNT</span
//                                       ></strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   height="0px"
//                                   align="center"
//                                   border="0"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   width="90%"
//                                   style="
//                                     border-collapse: collapse;
//                                     table-layout: fixed;
//                                     border-spacing: 0;
//                                     mso-table-lspace: 0pt;
//                                     mso-table-rspace: 0pt;
//                                     vertical-align: top;
//                                     border-top: 1px solid #bbbbbb;
//                                     -ms-text-size-adjust: 100%;
//                                     -webkit-text-size-adjust: 100%;
//                                   "
//                                 >
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td
//                                         style="
//                                           word-break: break-word;
//                                           border-collapse: collapse !important;
//                                           vertical-align: top;
//                                           font-size: 0px;
//                                           line-height: 0px;
//                                           mso-line-height-rule: exactly;
//                                           -ms-text-size-adjust: 100%;
//                                           -webkit-text-size-adjust: 100%;
//                                         "
//                                       >
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-25"
//                     style="
//                       max-width: 320px;
//                       min-width: 150px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p
//                                     style="
//                                       font-size: 14px;
//                                       line-height: 140%;
//                                       text-align: center;
//                                     "
//                                   >
//                                     <em
//                                       ><span
//                                         style="
//                                           font-size: 14px;
//                                           line-height: 19.6px;
//                                         "
//                                         >Room Variant 3 (with Double Deck)</span
//                                       ></em
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-25"
//                     style="
//                       max-width: 320px;
//                       min-width: 150px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: right;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p
//                                     style="
//                                       font-size: 14px;
//                                       line-height: 140%;
//                                       text-align: center;
//                                     "
//                                   >
//                                     <span
//                                       style="
//                                         font-size: 14px;
//                                         line-height: 19.6px;
//                                       "
//                                       >$200</span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-25"
//                     style="
//                       max-width: 320px;
//                       min-width: 150px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div
//                       style="
//                         width: 100% !important;
//                         border-radius: 0px;
//                         -webkit-border-radius: 0px;
//                         -moz-border-radius: 0px;
//                       "
//                     >
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                           border-radius: 0px;
//                           -webkit-border-radius: 0px;
//                           -moz-border-radius: 0px;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: right;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p
//                                     style="
//                                       font-size: 14px;
//                                       line-height: 140%;
//                                       text-align: center;
//                                     "
//                                   >
//                                     <span
//                                       style="
//                                         font-size: 14px;
//                                         line-height: 19.6px;
//                                       "
//                                       >3</span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-padding" style="width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-25"
//                     style="
//                       max-width: 320px;
//                       min-width: 150px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div
//                       style="
//                         width: 100% !important;
//                         border-radius: 0px;
//                         -webkit-border-radius: 0px;
//                         -moz-border-radius: 0px;
//                       "
//                     >
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                           border-radius: 0px;
//                           -webkit-border-radius: 0px;
//                           -moz-border-radius: 0px;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: right;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p
//                                     style="
//                                       font-size: 14px;
//                                       line-height: 140%;
//                                       text-align: center;
//                                     "
//                                   >
//                                     <span
//                                       style="
//                                         font-size: 14px;
//                                         line-height: 19.6px;
//                                       "
//                                       >$200</span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   height="0px"
//                                   align="center"
//                                   border="0"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   width="90%"
//                                   style="
//                                     border-collapse: collapse;
//                                     table-layout: fixed;
//                                     border-spacing: 0;
//                                     mso-table-lspace: 0pt;
//                                     mso-table-rspace: 0pt;
//                                     vertical-align: top;
//                                     border-top: 1px solid #bbbbbb;
//                                     -ms-text-size-adjust: 100%;
//                                     -webkit-text-size-adjust: 100%;
//                                   "
//                                 >
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td
//                                         style="
//                                           word-break: break-word;
//                                           border-collapse: collapse !important;
//                                           vertical-align: top;
//                                           font-size: 0px;
//                                           line-height: 0px;
//                                           mso-line-height-rule: exactly;
//                                           -ms-text-size-adjust: 100%;
//                                           -webkit-text-size-adjust: 100%;
//                                         "
//                                       >
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong
//                                       ><span
//                                         style="
//                                           font-size: 14px;
//                                           line-height: 19.6px;
//                                         "
//                                         >Sub-Total</span
//                                       ></strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: right;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong
//                                       ><span
//                                         style="
//                                           font-size: 14px;
//                                           line-height: 19.6px;
//                                         "
//                                         >1,000.00 PHP</span
//                                       ></strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong
//                                       ><span
//                                         style="
//                                           font-size: 14px;
//                                           line-height: 19.6px;
//                                         "
//                                         >Vatable</span
//                                       ></strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: right;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong>1,000.00 PHP</strong>
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong
//                                       ><span
//                                         style="
//                                           font-size: 14px;
//                                           line-height: 19.6px;
//                                         "
//                                         >VAT</span
//                                       ></strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: right;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong
//                                       ><span
//                                         style="
//                                           font-size: 14px;
//                                           line-height: 19.6px;
//                                         "
//                                         >1,000.00 PHP</span
//                                       ></strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong
//                                       ><span
//                                         style="
//                                           font-size: 14px;
//                                           line-height: 19.6px;
//                                         "
//                                         >Total Amount</span
//                                       ></strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: right;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong>1,000.00 PHP</strong>
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   height="0px"
//                                   align="center"
//                                   border="0"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   width="90%"
//                                   style="
//                                     border-collapse: collapse;
//                                     table-layout: fixed;
//                                     border-spacing: 0;
//                                     mso-table-lspace: 0pt;
//                                     mso-table-rspace: 0pt;
//                                     vertical-align: top;
//                                     border-top: 1px solid #bbbbbb;
//                                     -ms-text-size-adjust: 100%;
//                                     -webkit-text-size-adjust: 100%;
//                                   "
//                                 >
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td
//                                         style="
//                                           word-break: break-word;
//                                           border-collapse: collapse !important;
//                                           vertical-align: top;
//                                           font-size: 0px;
//                                           line-height: 0px;
//                                           mso-line-height-rule: exactly;
//                                           -ms-text-size-adjust: 100%;
//                                           -webkit-text-size-adjust: 100%;
//                                         "
//                                       >
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 15px 30px 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong>Payment Details</strong>
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #5c5757;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="
//                                         font-size: 18px;
//                                         line-height: 25.2px;
//                                       "
//                                       ><strong>AMOUNT PAID (PHP)</strong></span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #5c5757;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p
//                                     style="
//                                       font-size: 14px;
//                                       line-height: 140%;
//                                       text-align: right;
//                                     "
//                                   >
//                                     <span
//                                       style="
//                                         font-size: 18px;
//                                         line-height: 25.2px;
//                                       "
//                                       ><strong>PHP 4,000.00</strong></span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #5c5757;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <span
//                                       style="
//                                         font-size: 18px;
//                                         line-height: 25.2px;
//                                       "
//                                       ><strong>TO BE PAID </strong></span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-padding" style="width: 300px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-50"
//                     style="
//                       max-width: 320px;
//                       min-width: 300px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px 30px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #5c5757;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p
//                                     style="
//                                       font-size: 14px;
//                                       line-height: 140%;
//                                       text-align: right;
//                                     "
//                                   >
//                                     <span
//                                       style="
//                                         font-size: 18px;
//                                         line-height: 25.2px;
//                                       "
//                                       ><strong>PHP 4,000.00</strong></span
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 14px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   height="0px"
//                                   align="center"
//                                   border="0"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   width="90%"
//                                   style="
//                                     border-collapse: collapse;
//                                     table-layout: fixed;
//                                     border-spacing: 0;
//                                     mso-table-lspace: 0pt;
//                                     mso-table-rspace: 0pt;
//                                     vertical-align: top;
//                                     border-top: 1px solid #ffffff;
//                                     -ms-text-size-adjust: 100%;
//                                     -webkit-text-size-adjust: 100%;
//                                   "
//                                 >
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td
//                                         style="
//                                           word-break: break-word;
//                                           border-collapse: collapse !important;
//                                           vertical-align: top;
//                                           font-size: 0px;
//                                           line-height: 0px;
//                                           mso-line-height-rule: exactly;
//                                           -ms-text-size-adjust: 100%;
//                                           -webkit-text-size-adjust: 100%;
//                                         "
//                                       >
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <table
//                                   height="0px"
//                                   align="center"
//                                   border="0"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   width="90%"
//                                   style="
//                                     border-collapse: collapse;
//                                     table-layout: fixed;
//                                     border-spacing: 0;
//                                     mso-table-lspace: 0pt;
//                                     mso-table-rspace: 0pt;
//                                     vertical-align: top;
//                                     border-top: 1px solid #bbbbbb;
//                                     -ms-text-size-adjust: 100%;
//                                     -webkit-text-size-adjust: 100%;
//                                   "
//                                 >
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td
//                                         style="
//                                           word-break: break-word;
//                                           border-collapse: collapse !important;
//                                           vertical-align: top;
//                                           font-size: 0px;
//                                           line-height: 0px;
//                                           mso-line-height-rule: exactly;
//                                           -ms-text-size-adjust: 100%;
//                                           -webkit-text-size-adjust: 100%;
//                                         "
//                                       >
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px 30px 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 15px 30px 16px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     <strong
//                                       ><span
//                                         style="
//                                           font-size: 20px;
//                                           line-height: 28px;
//                                         "
//                                         ><span
//                                           style="
//                                             line-height: 28px;
//                                             font-size: 20px;
//                                           "
//                                           >Got Questions?</span
//                                         ></span
//                                       ></strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px 10px 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     Telephone :<strong> (02) 888 3235</strong>
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px 10px 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     Mobile Number :
//                                     <strong>+63 906 600 0801</strong>
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 0px 10px 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     Email :
//                                     <strong
//                                       >sunnydayresidencesofficial@gmail.com</strong
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row no-stack"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #ffffff;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 15px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 15px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 10px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #615e5e;
//                                     line-height: 140%;
//                                     text-align: left;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p
//                                     style="
//                                       font-size: 14px;
//                                       line-height: 140%;
//                                       text-align: center;
//                                     "
//                                   >
//                                     <em
//                                       ><strong
//                                         >THIS JUST AN AUTOMATED EMAIL DO NOT
//                                         REPLY</strong
//                                       ></em
//                                     >
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <div
//               class="u-row-container"
//               style="padding: 0px; background-color: transparent"
//             >
//               <div
//                 class="u-row"
//                 style="
//                   margin: 0 auto;
//                   min-width: 320px;
//                   max-width: 600px;
//                   overflow-wrap: break-word;
//                   word-wrap: break-word;
//                   word-break: break-word;
//                   background-color: #f7b12f;
//                 "
//               >
//                 <div
//                   style="
//                     border-collapse: collapse;
//                     display: table;
//                     width: 100%;
//                     background-color: transparent;
//                   "
//                 >
//                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f7b12f;"><![endif]-->

//                   <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//                   <div
//                     class="u-col u-col-100"
//                     style="
//                       max-width: 320px;
//                       min-width: 600px;
//                       display: table-cell;
//                       vertical-align: top;
//                     "
//                   >
//                     <div style="width: 100% !important">
//                       <!--[if (!mso)&(!IE)]><!--><div
//                         class="v-col-padding"
//                         style="
//                           padding: 0px;
//                           border-top: 0px solid transparent;
//                           border-left: 0px solid transparent;
//                           border-right: 0px solid transparent;
//                           border-bottom: 0px solid transparent;
//                         "
//                       ><!--<![endif]-->
//                         <table
//                           style="font-family: 'Open Sans', sans-serif"
//                           role="presentation"
//                           cellpadding="0"
//                           cellspacing="0"
//                           width="100%"
//                           border="0"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   overflow-wrap: break-word;
//                                   word-break: break-word;
//                                   padding: 16px;
//                                   font-family: 'Open Sans', sans-serif;
//                                 "
//                                 align="left"
//                               >
//                                 <div
//                                   class="v-text-align v-line-height"
//                                   style="
//                                     color: #ecf7ff;
//                                     line-height: 140%;
//                                     text-align: center;
//                                     word-wrap: break-word;
//                                   "
//                                 >
//                                   <p style="font-size: 14px; line-height: 140%">
//                                     &copy; Sunny Day Residences. All Rights
//                                     Reserved
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <!--[if (!mso)&(!IE)]><!-->
//                       </div>
//                       <!--<![endif]-->
//                     </div>
//                   </div>
//                   <!--[if (mso)|(IE)]></td><![endif]-->
//                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//                 </div>
//               </div>
//             </div>

//             <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
//           </td>
//         </tr>
//       </tbody>
//     </table>
//     <!--[if mso]></div><![endif]-->
//     <!--[if IE]></div><![endif]-->
//   </body>
// </html>`;
