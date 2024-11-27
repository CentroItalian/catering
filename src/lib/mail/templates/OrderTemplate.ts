interface CartItem {
    name: string;
    quantity: number;
    instructions: string;
}

export function OrderTemplate(
    cart: CartItem[],
    orderDetails: {
        orderNumber: string;
        deliveryDateTime: string;
        address: string;
        contactName: string;
        contactPhone: string;
        orderType: string;
    }
): string {

    const itemRows = cart.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.instructions}</td>
      </tr>
    `).join('');

    const typeDiv = orderDetails.orderType.toLowerCase() === 'delivery'
        ? `<div class="section-header">DELIVERY INFORMATION</div>
            <p><strong>Address:</strong> ${orderDetails.address}</p>
            <p><strong>Contact Person:</strong> ${orderDetails.contactName}</p>
            <p><strong>Contact Phone:</strong> ${orderDetails.contactPhone}</p>`
        : `<div class="section-header">PICKUP INFORMATION</div>
            <p><strong>Contact Person:</strong> ${orderDetails.contactName}</p>
            <p><strong>Contact Phone:</strong> ${orderDetails.contactPhone}</p>`;

    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Catering Order</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 800px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #d35400;
              color: white;
              padding: 15px;
              text-align: center;
              border-radius: 5px 5px 0 0;
          }
          .header h1 {
              margin: 0;
              font-size: 24px;
          }
          .order-info {
              background-color: #f8f9fa;
              padding: 15px;
              margin: 20px 0;
              border-left: 4px solid #d35400;
          }
          .priority {
              color: #c0392b;
              font-weight: bold;
          }
          .item-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
          }
          .item-table th, .item-table td {
              padding: 12px;
              text-align: left;
              border: 1px solid #ddd;
          }
          .item-table th {
              background-color: #f8f9fa;
              font-weight: bold;
          }
          .item-table tr:nth-child(even) {
              background-color: #f9f9f9;
          }
          .section-header {
              background-color: #eee;
              padding: 10px;
              margin: 15px 0 10px 0;
              font-weight: bold;
          }
          .special-instructions {
              background-color: #fff3e0;
              padding: 15px;
              margin: 20px 0;
              border-radius: 5px;
          }
          .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 14px;
              border-top: 1px solid #ddd;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>NEW CATERING ORDER</h1>
              <p>Order #: ${orderDetails.orderNumber}</p>
          </div>
          
          <div class="order-info">
              <p class="priority">Required Delivery/Service Time: ${orderDetails.deliveryDateTime}</p>
              <p class="priority">Order Type: ${orderDetails.orderType[0].toUpperCase() + orderDetails.orderType.slice(1)}</p>
          </div>
          
          ${typeDiv}

          <div class="section-header">ORDER DETAILS</div>
          <table class="item-table">
              <thead>
                  <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Preparation Notes</th>
                  </tr>
              </thead>
              <tbody>
                  ${itemRows}
              </tbody>
          </table>
      </div>
  </body>
  </html>
    `.trim();
}