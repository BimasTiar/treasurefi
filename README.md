💰 TreasureFi Rewards – ERC721 NFT Reward Contract

TreasureFi Rewards is a simple and efficient ERC721-based NFT reward system designed for the Treasure-Fi personal finance app. Users track financial goals off-chain, and when they achieve a goal, the backend automatically mints an on-chain NFT as a form of proof-of-achievement.

This contract uses OpenZeppelin standards for security and reliability.

---

🚀 Tech Stack

Frontend
- Next.js 14 (App Router)
- TypeScript & Tailwind CSS
- RainbowKit + Wagmi (Web3 Connection)
- Lucide React (Icons)

Blockchain
- Hardhat (Local Development Environment)
- Solidity (Smart Contracts ERC-721)
- Ethers.js

Backend
- Node.js & Express (Off-chain logic)

---

🚀 Features

Core Functionality
- Auto-increment NFT Token IDs: Ensures unique identifiers.
- Base URI System: Supports IPFS or centralized metadata.
- Secure Minting: Protected by `MINTER_ROLE`.
- Custom Metadata: Optional support via `mintRewardWithURI`.
- Burnable: Users can burn their own tokens.

Access Control
- `DEFAULT_ADMIN_ROLE`: Full contract admin.
- `MINTER_ROLE`: Backend wallet only.
- `PAUSER_ROLE`: Emergency pause functionality.

---

📦 Contract Overview

```text
/contracts
    └── TreasureFiRewards.sol
/hardhat
    └── hardhat.config.js
/backend
    └── package.json
/frontend
    └── package.json
```

---

🧠 How It Works

User Action: User completes a financial goal in the Treasure-Fi app.

Verification: Backend verifies the achievement off-chain (database check).

Minting: The Backend wallet (holding `MINTER_ROLE`) calls the smart contract:
- `mintReward(to)` OR
- `mintRewardWithURI(to, customTokenURI)`

On-Chain: The NFT is minted to the user's wallet address.

Display: The Frontend resolves metadata using `baseURI + tokenId.`

---

🛠️ Functions

Minting
- `mintReward(address to)`: Mint NFT using default baseURI.
- `mintRewardWithURI(address to, string customTokenURI)`: Mint with custom URI.

Admin
- `setBaseURI(string newBase)`
- `pause() / unpause()`
- `grantMinter(address) / revokeMinter(address)`

User
- `burn(uint256 tokenId)`

---

🚀 Local Development Guide (How to Run the Project)

Start the local blockchain(hardhat node)
Run the following command inside the /hardhat folder : 
- `npx hardhat node`

This command launches a local Ethereum blockchain along with several test accounts for development.


Deploy the smart contract to Localhost
Still inside the /hardhat folder, run:
- `npx hardhat run scripts/deploy.js --network localhost`

This will:
- Compile the smart contract
- Deploy it to the Hardhat local blockchain
- Output the contract address in your terminal


Start the Backend Server
Move to the /backend folder and run:
- `npm run dev`

This starts the backend API server, which handles communication between the application and the smart contract.


Start the NFT minting worker
Still inside the /backend folder, run:
- `npm run worker`

This worker is responsible for:
- Processing queued events
- Checking completed financial goals
- Calling mintReward() or mintRewardWithURI()
- Minting NFTs on the blockchain


Start Frontend (The App)
1. Go to the `/frontend` folder.
2. Create a `.env.local` file and paste the Contract Address from Step 2:
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddressHere




