// example
// src/
// ├── WalletConnectUri.tsx  # Add the file here
// ├── wagmiConfig.ts        # Add the Wagmi config here
// └── App.tsx               # Main app file where you can use WalletConnectUri


/**
 * WalletConnectUri component listens for the WalletConnect URI and sends it to the console
 * and also posts the URI to an iframe via postMessage. This component automatically triggers
 * the WalletConnect connection without displaying the QR code UI.
 *
 * Usage: Simply render this component in your app to automatically log the WalletConnect URI
 * and post it to an iframe for further use.
 */


import { Connector, useConnect } from "wagmi";
import { useEffect } from "react";

/**
 * WalletConnectUri component listens for the WalletConnect URI and sends it to the console
 * and also posts the URI to an iframe via postMessage. This component automatically triggers
 * the WalletConnect connection without displaying the QR code UI.
 *
 * Usage: Simply render this component in your app to automatically log the WalletConnect URI
 * and post it to an iframe for further use.
 */
export function WalletConnectUri() {
  const { connect, connectors } = useConnect();

  /**
   * Get the WalletConnect connector from the list of available connectors.
   * This assumes that the connector has been properly set up in the Wagmi client configuration.
   */
  const walletConnectConnector = connectors.find(
    ({ id }) => id === "walletConnect"
  );

  useEffect(() => {
    /**
     * listenForWalletConnectUri - Asynchronously listens for the WalletConnect URI and sends
     * it to both the console and an iframe via the postMessage API.
     *
     * @param {Connector} walletConnectConnector - The WalletConnect connector instance.
     */
    const listenForWalletConnectUri = async (
      walletConnectConnector: Connector
    ) => {
      try {
        // Retrieve the provider from the WalletConnect connector
        const provider = await walletConnectConnector.getProvider();

        // Listen for the 'display_uri' event to capture the WalletConnect URI
        provider.on("display_uri", (uri: string) => {
          console.log("WalletConnect URI:", uri);

          // Send the URI to an iframe using postMessage
          if (window && window.parent) {
            window.parent.postMessage({ type: "walletconnect_uri", uri }, "*");
          }
        });

        // Manually trigger the WalletConnect connection process
        await provider.connect(); // or `provider.enable()` depending on your use case
      } catch (error) {
        console.error("Error setting up WalletConnect:", error);
      }
    };

    // If the WalletConnect connector is available, initiate the listener
    if (walletConnectConnector) {
      listenForWalletConnectUri(walletConnectConnector);
    } else {
      console.error("WalletConnect connector not found");
    }
  }, [walletConnectConnector]);

  return null; // This component renders nothing, as it only handles background functionality
}
