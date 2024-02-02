import { CartItem } from '@/store/shop'

export const generateEmailHtml = (name: string, orders: CartItem[]) => {

  // Start with a basic HTML structure
  let htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .order-table { width: 100%; border-collapse: collapse; }
          .order-table th, .order-table td { border: 1px solid #000; padding: 8px; }
          .order-table th { background-color: #fff; }
        </style>
      </head>
      <body>
        <h1>Thank you!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for your order <3. Here are the details of your purchase:</p>
        <table class="order-table">
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
  `

  // Add rows for each order item
  orders.forEach((order) => {
    htmlContent += `
      <tr>
        <td>${order.haus.name}</td>
        <td>${order.quantity}</td>
        <td>$${order.haus.price}</td>
      </tr>
    `
  })

  // Close the table and add any additional content
  htmlContent += `
        </table>
        <p>If you have any questions, please reach out to team@lucid.haus.</p>
      </body>
    </html>
  `

  return htmlContent
}
