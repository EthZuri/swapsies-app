import Connect from "components/Connect";
import { type NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";

const stashStyles =
  "flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg text-black w-96 h-96";

const openTradeContainerStyles =
  "flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg text-black w-96 h-48";
const Home: NextPage = () => {
  const { address } = useAccount();

  return (
    <>
      <Head>
        <title>Swapsies</title>
        <meta name="description" content="Simple p2p swaps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex w-full justify-between px-4">
            <div></div>
            <h1 className="text-4xl font-bold text-white">Swapsies</h1>
            <Connect />
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-y-2">
              <div>
                <label htmlFor="creatorAddress" className="label">
                  Creator Address
                  <input
                    name="creatorAddress"
                    type="text"
                    className="input"
                    disabled
                    value={address}
                  />
                </label>
              </div>
              <div className={stashStyles}>left container</div>
              <div className={openTradeContainerStyles}>offered items</div>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-16 rounded-lg bg-white p-2" />
              <input
                type="checkbox"
                disabled
                className="w-16 rounded-lg bg-white p-2"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <div>
                <label htmlFor="receiverAddress" className="label">
                  Receiver Address
                  <input name="receiverAddress" type="text" className="input" />
                </label>
              </div>
              <div className={stashStyles}>right container</div>
              <div className={openTradeContainerStyles}>offered items</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
