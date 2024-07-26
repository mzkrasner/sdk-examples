# Event Data Demo (using OrbisDB)

This demo application shows how Spindl event attribution data can be written to Ceramic where it can be organized, queried, and synced by anyone on the network

## Getting Started

1. Install your dependencies:

```bash
npm install
```

2. Copy the [env example](.env.example) file and rename it `.env`

3. Create a WalletConnect project ID by visiting https://cloud.walletconnect.com/sign-in, create a new project (with a name of your choosing and the `App` type selected), and copy the `Project ID` key once available. 

Once copied, assign it to `NEXT_PUBLIC_PROJECT_ID` in your .env file

4. Visit the [Orbis Studio](https://studio.useorbis.com/) and create a free account if you do not already have one. 

First, set up a new context (required to use a shared instance). Assign this to `CONTEXT_ID` in your .env file.

Next, navigate to the [model builder](https://studio.useorbis.com/models) view and use the [table reference](models/tables.sql) to define your tables. Use the corresponding model IDs to assign to `CUSTOM_EVENT_ID` (for the "custom_event" table) and `CUSTOM_EVENT_ID_2` (for the "pageview" table) in your .env file.

Click the "Contexts" tab in the studio navbar and copy your environment ID from the left-hand side of the screen. Assign the value to `ENV_ID` in your .env file.

5. Create two private seeds - these will be used in place of Spindl API keys (to mock the flow of a user using a secret key to self-authenticate and write data to the network associated with that key). You can do so by running the following command:

```bash
npm run generate
```

Save the corresponding strings to `PRIVATE_DID_SEED` and `PRIVATE_DID_SEED_2` in your .env file

6. Run the application:

#### Development
```bash
npm run dev
```

You can create events associated with two button clicks on the homepage. Navigate to `/other` and pageview events will automatically be generated for you on page load.

You can view these events back in your studio view under the "data" tab.

## Learn More

To learn more about OrbisDB please visit the following links

- [OrbisDB Overview](https://developers.ceramic.network/docs/orbisdb/overview) 
- [OrbisDB SDK](https://developers.ceramic.network/docs/orbisdb/orbisdb-sdk) 
- [OrbisDB Website](https://useorbis.com/) 

