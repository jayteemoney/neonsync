import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying NeonArena with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  const NeonArena = await ethers.getContractFactory("NeonArena");
  const neonArena = await NeonArena.deploy();

  await neonArena.waitForDeployment();

  const address = await neonArena.getAddress();

  console.log("\n✅ NeonArena deployed to:", address);
  console.log("\n📋 Add this to your .env file:");
  console.log(`VITE_NEON_ARENA_CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
