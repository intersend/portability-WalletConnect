import { createConfig, http } from 'wagmi';
import { mainnet, polygon, sepolia } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';

/**
 * Wagmi Configuration Example
 *
 * This file shows a basic setup for the Wagmi config with WalletConnect as a connector.
 * The key requirement for compatibility with our system is ensuring that the WalletConnect
 * connector is present. Your configuration might look different, but WalletConnect is 
 * essential for user wallet integration.
 * 
 * If you don’t already have WalletConnect as a connector in your app, you need to add it.
 * 
 * You will also need a WalletConnect project ID to use the connector. If you don't have one,
 * you can sign up and generate a project ID at: 
 * WalletConnect Project ID: https://cloud.walletconnect.com/sign-up
 */

export const config = createConfig({
  chains: [mainnet, polygon, sepolia], // Add more chains as needed
  connectors: [
    walletConnect({
      projectId: 'YOUR_PROJECT_ID', // Replace with your WalletConnect project ID
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
  },
});

/**
 * Instructions:
 * 1. If you don't have a WalletConnect project ID, sign up at: 
 *    https://cloud.walletconnect.com/sign-up
 * 2. Replace 'YOUR_PROJECT_ID' with the project ID obtained from WalletConnect.
 * 3. This configuration includes the WalletConnect connector, which is required 
 *    for seamless user wallet integration in our system.
 * 4. You can modify the chains and transports based on your application's requirements.
 */
