# বাজার দর (BazarDor)

Live: https://bajar-dor-rho.vercel.app

বাজার দর is a small web app where you can check the daily market prices of everyday items like rice, lentils, oil, vegetables, fish and meat. The whole site is in Bangla, so it is easy to use for everyone.

I built this because it is hard to know the right price before going to the market. Now you can check it from your phone first.

## Technologies Used

- Next.js (App Router)
- React
- Tailwind CSS + DaisyUI
- Better Auth (login system)
- MongoDB Atlas
- React Hot Toast
- Vercel (hosting)

## Key Features

1. **Daily prices:** See the current price of each item, per kg or per litre.
2. **Categories:** Items are grouped as চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ and মসলা, so you can find things quickly.
3. **Price change:** A moving price bar shows if a price went up or down, with the percentage.
4. **Easy login:** Sign up and sign in with email and password, or use your Google or GitHub account.
5. **Bangla interface:** Date, labels and messages are all in Bangla.

## Run Locally


git clone <your-repo-url>
cd bajar-dor
npm install
npm run dev


Then open http://localhost:3000

Create a `.env` file in the root folder:


MONGODB_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=


## Author

Jewel Rana
