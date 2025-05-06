if (!process.env.KHULNASOFT_PUBLIC_KEY) {
  throw new Error('Missing env varialbe KHULNASOFT_PUBLIC_KEY')
}

export default {
  apiKey: process.env.KHULNASOFT_PUBLIC_KEY,
}
