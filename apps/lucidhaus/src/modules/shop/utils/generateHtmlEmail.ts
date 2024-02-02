import { CartItem } from '@/store/shop'

export const generateEmailHtml = (name: string, orders: CartItem[]) => {
  const imageUrl = "https://lucidhaus.infura-ipfs.io/ipfs/bafybeihebbyglylqmkqwooetpjbihpsiiqrxx7vnkajtukhlgs2k7wkxya";

  // Start with a basic HTML structure
  let htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .order-table { width: 100%; border-collapse: collapse; }
          .order-table th, .order-table td { border: 1px solid #ddd; padding: 8px; }
          .order-table th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <img src="${imageUrl}" width="150" alt="LucidHaus Logo" style="display: block; margin: 0 auto 20px auto;">
        <h1>Order Confirmation</h1>
        <p>Hi ${name},</p>
        <p>Thank you for your order. Here are the details of your purchase:</p>
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
