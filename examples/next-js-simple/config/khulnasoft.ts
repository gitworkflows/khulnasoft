if (!process.env.KHULNASOFT_PUBLIC_KEY) {
  throw new Error(
    'Missing environment variable KHULNASOFT_PUBLIC_KEY, signup for khulnasoft.com and add your public key to env file'
  )
}

export default {
  apiKey: process.env.KHULNASOFT_PUBLIC_KEY,
}
