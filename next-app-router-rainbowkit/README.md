# Event Data Demo (using OrbisDB)

This demo application shows how users can upload an arbitrary document, obtain a hash of the file, and create an attestation on Orbis with the values of the hash and the IPFS location.

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

Next, navigate to the [model builder](https://studio.useorbis.com/models) view and use the [table reference](models/tables.sql) to define your tables. Use the corresponding model ID to assign to `ATTESTATION_TABLE_ID` in your new env file.

Click the "Contexts" tab in the studio navbar and copy your environment ID from the left-hand side of the screen. Assign the value to `ENV_ID` in your .env file.

5. Create a private seeds. You can do so by running the following command:

```bash
npm run generate
```

Save the corresponding string to `PRIVATE_DID_SEED` in your .env file

6. Run the application:

#### Development
```bash
npm run dev
```

You can upload files and have them hashed and saved to IPFS + Ceramic.

You can view these events back in your studio view under the "data" tab.

## Learn More

To learn more about OrbisDB please visit the following links

- [OrbisDB Overview](https://developers.ceramic.network/docs/orbisdb/overview) 
- [OrbisDB SDK](https://developers.ceramic.network/docs/orbisdb/orbisdb-sdk) 
- [OrbisDB Website](https://useorbis.com/) 

