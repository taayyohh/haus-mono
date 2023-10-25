const productionConfig = {
  mongo: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  nftStoragePublic: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
  stripeSecret: process.env.STRIPE_SECRET,
  stripePublic: process.env.NEXT_PUBLIC_STRIPE_PUBLIC,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  privyAppId: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  adminWallet: process.env.NEXT_PUBLIC_ADMIN_WALLET,
  orderSecret: process.env.ORDER_SECRET_KEY,
  graphClient: process.env.GRAPH_CLIENT,
  infura: process.env.NEXT_PUBLIC_INFURA_API_KEY
}

const developmentConfig = {
  mongo: process.env.MONGODB_URI_TEST,
  jwtSecret: process.env.JWT_SECRET,
  nftStoragePublic: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
  stripeSecret: process.env.STRIPE_TEST_SECRET,
  stripePublic: process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLIC,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL_TEST,
  privyAppId: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  adminWallet: process.env.NEXT_PUBLIC_ADMIN_WALLET,
  orderSecret: process.env.ORDER_SECRET_KEY,
  graphClient: process.env.GRAPH_CLIENT,
  infura: process.env.NEXT_PUBLIC_INFURA_API_KEY
}


const config =
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig

export default config
