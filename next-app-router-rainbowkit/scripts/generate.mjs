import {OrbisKeyDidAuth} from "@useorbis/db-sdk/auth"

const randomKey1 = OrbisKeyDidAuth.generateSeed("hex")
const randomKey2 = OrbisKeyDidAuth.generateSeed("hex")

console.log({
    PRIVATE_DID_SEED: randomKey1,
    PRIVATE_DID_SEED_2: randomKey2,
})