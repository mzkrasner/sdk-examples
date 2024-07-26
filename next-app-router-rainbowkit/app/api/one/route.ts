import { OrbisDB, type OrbisConnectResult } from "@useorbis/db-sdk";
import { OrbisKeyDidAuth } from "@useorbis/db-sdk/auth";

export const runtime = "edge";

const ENV_ID = process.env.NEXT_PUBLIC_ENV_ID ?? "";
const seed = process.env.PRIVATE_DID_SEED ?? "";
const custom_button_click = process.env.CUSTOM_EVENT_ID ?? "";
const CONTEXT_ID = process.env.CONTEXT_ID ?? "";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const orbis = new OrbisDB({
      ceramic: {
        gateway: "https://ceramic-orbisdb-mainnet-direct.hirenodes.io/",
      },
      nodes: [
        {
          gateway: "https://studio.useorbis.com",
          env: ENV_ID,
        },
      ],
    });
    const auth = await OrbisKeyDidAuth.fromSeed(seed);
    const authResult: OrbisConnectResult = await orbis.connectUser({ auth });

    const updatequery = await orbis
      .insert(custom_button_click)
      .value({
        page: req.data.page,
        timestamp: req.data.timeStamp,
        address: req.metadata.address,
        customer_user_id: authResult.user.did,
        event_name: req.event,
      })
      .context(CONTEXT_ID)
      .run();

    if (updatequery.content) {
      return Response.json({ data: updatequery.content }, { status: 200 });
    }

    return Response.json(
      { error: `Something went wrong storing in Ceramic - check node status` },
      { status: 500 }
    );
  } catch (error) {
    return Response.json({ error: `Something went wrong` }, { status: 500 });
  }
}
