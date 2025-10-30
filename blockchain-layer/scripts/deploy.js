const hre = require("hardhat");

async function main() {
  const EduCred = await hre.ethers.getContractFactory("EduCred");
  const educred = await EduCred.deploy();

  await educred.waitForDeployment();

  console.log("EduCred deployed to:", await educred.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});