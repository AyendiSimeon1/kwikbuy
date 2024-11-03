# Kwikby Documentation

##  Project Overview
Kwikby is a business solutions tool built with WhatsApp Business API to help companies manage customer interactions, send automated messages, and gather feedback directly via WhatsApp. The project uses a **monorepo** structure, with a **Next.js** client and a **Node.js/Express** server that integrates GraphQL.

##  Tech Stack
* **Frontend (Client)**: Next.js, TypeScript, Tailwind CSS
* **Backend (Server)**: Node.js, Express, GraphQL, WhatsApp Business API
* **Database**: MongoDB
* **Package Manager**: npm/Yarn for monorepo dependency management

##  Project Structure
```
Kwikbuy/
├── client/          # Next.js client-side code
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── graphql/
│   │   └── styles/
│   └── package.json
├── server/          # Node.js/Express backend with GraphQL
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── resolvers/
│   │   └── routes/
│   └── package.json
└── package.json     # Root package.json for monorepo
```

##  Getting Started

### Prerequisites
* **Node.js** v16 or later
* **Yarn** or **npm**
* **MongoDB** for data storage

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Ayendisimeon1/kwikbuy.git
cd kwikbuy
```

2. **Install dependencies**:
## Client
```bash
cd client
yarn install
```
## Server
```bash
cd server
yarn install
```

4. **Environment Variables**: Create `.env` files in both `client` and `server` directories with the following variables:

* **Client** (`client/.env.local`):
```plaintext
NEXT_PUBLIC_API_URL=http://localhost:4000
```

* **Server** (`server/.env`):
```plaintext
MONGO_URI=your-mongodb-connection-string
WHATSAPP_API_TOKEN=your-whatsapp-api-token
PORT=4000
```

### Starting the Development Server
* **Client**: `cd client`    `yarn dev`
* **Server**: `cd server`   `yarn dev`


## WhatsApp Business API Integration
Kwikby uses the WhatsApp Business API to manage messages and contacts. The following GraphQL resolver handles sending messages:

Example Resolver - `sendMessage`:
```javascript
const sendMessage = async (_, { message, recipient }) => {
  const response = await axios.post(
    `https://graph.facebook.com/v11.0/${recipient}/messages`,
    {
      message: message,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`
      },
    }
  );
  return response.data;
};
```



##  Deployment
* **Client**: Deploy the Next.js app to Vercel or another platform
* **Server**: Deploy the Node.js server to a cloud provider, such as Heroku or DigitalOcean. Ensure all `.env` variables are set up in production

