import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Connect = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  if (isConnected)
    return (
      <div className="rounded-lg bg-base-100 px-6 py-3">
        Connected to {ensName ?? address}
      </div>
    );

  return (
    <button onClick={() => connect()} className="btn-primary btn">
      Connect Wallet
    </button>
  );
};

export default Connect;
