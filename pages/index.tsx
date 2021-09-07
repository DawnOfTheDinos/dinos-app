import {ethers} from 'ethers';

import {useEffect, useState} from 'react';

import Image from 'next/image';
import Button from '../components/Button';
import Navbar from '../components/navbar';
import DinoWeb3 from '../lib/DinoWeb3';
import 'bootstrap/dist/css/bootstrap.min.css';
function truncateAddress(address: string) {
  try {
    return `${address.substring(0, 6).toLowerCase()}...${address
      .substring(38, 42)
      .toLowerCase()}`;
  } catch (error) {
    console.log(`truncateAddress(): ${error}`);
  }
}

interface IState {
  address: string | null;
  num_of_dinos: number;
  balance: number;
  show: boolean;
}

export default function _index() {
  let Window: any;
  const [state, setState] = useState<IState>({
    address: null,
    num_of_dinos: 0,
    balance: 0,
    show: false,
  });
  let _web3: any, _signer: any, _DinoWeb3: any;
  useEffect(() => {
    Window = window;
    async function init() {
      try {
        _DinoWeb3 = new DinoWeb3();
        let address: any = await _DinoWeb3.getAddress();
        let balance: any = await _DinoWeb3.getBalance(address);

        await setState({
          ...state,
          address: address,
          balance:
            Math.ceil((await _DinoWeb3.formatUnits(balance, 'ether')) * 10000) /
            10000,
        });
      } catch (error) {
        console.log(error);
      }
    }
    init();
    Window.ethereum.on(
      'accountsChanged',
      async (newAccounts: string[] | number | any) => {
        console.log(newAccounts);
        if (newAccounts > 0) {
          let address: any = await newAccounts[0];

          setState({
            ...state,
            address: address,
          });
        } else {
          setState({
            ...state,
            address: null,
          });
        }
      }
    );
  }, []);
  return (
    <div className={`home h-100`}>
      <style global jsx>
        {`
          html,
          body,
          #__next {
            font-family: monospace;
            font-size: 1.2rem;
            height: 100%;
            background-color: #00242c;
          }

          .minting-section {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            width: 100%;
            min-width: 360px;
            max-width: 640px;
            border: 2px solid #000;
          }
          .header-section {
            color: #fff;
            position: relative;
            max-height: 900px;
            height: 100%;
            background-image: url('/img/headerimg.png');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
          }
          .header-section-text {
            width: 654px;
            height: 515px;
          }
          .mint-button-style {
            background: #03dac5;
            color: #000;
          }
        `}
      </style>
      <Navbar />
      <div
        className={`header-section d-flex flex-column justify-content-center align-items-center`}>
        <span className={`header-section-text text-center`}>
          <h1>Welcome to the Dawn of Time</h1>
          <p>
            Dawn of the Dinos is an Ethereum-based NFT collection of your
            favorite prehistoric creatures. Collecting one or more of these
            10,000 rare Dino eggs grants you access to an exclusive experience —
            one only available to those brave enough to go toe to toe with a
            T-Rex or, perhaps, butt heads with a Pachycephalosaur.
          </p>
          <p>
            Become a part of our outstanding community and earn your way into
            curated aridrops and branded merchandise that the whole family can
            enjoy.
          </p>
          <Button
            buttonStyle={`mint-button-style text-uppercase px-5`}
            onPress={async () => {
              //Open Modal
              alert('Minting');
              // _DinoWeb3.mint();
            }}>
            Mint Your Dino
          </Button>
        </span>
      </div>
      <div className={`collection-info-section  d-flex flex-column m-5`}>
        <h2 className={`text-capitalize text-white`}>The Collection</h2>
        <p className={`text-white`}>
          With 10,000 unique Dinos available to the public, there’s plenty of
          room for variety. Unlike some projects who boast an individual
          character, Dawn of the Dinos will showcase seven different species!
          The collective includes fan favorites like the:
        </p>
        <ul className={`text-white`}>
          <li>Tyrannosaurus Rex</li>
          <li>Triceratops</li>
          <li>Stegosaurus</li>
          <li>Brachiosaurus</li>
          <li>Parasaurolophus</li>
          <li>Pachycephalosaur</li>
        </ul>
        <p className={`text-white`}>
          Oh wait, that was only six different Dinos. What gives? Well Jimmy,
          <br />
          the seventh Dino is an ultra rare species that will emerge from the
          depths on launch day!
        </p>
        <p className={`text-white`}>
          It gets better! We’ve manifested a total of 1600 Dinos per species!
          This includes a whopping total of 400 of our top secret Dinos!
        </p>
        <p className={`text-white`}>Are you not impressed?</p>
        <p className={`text-white`}>
          With more than 100 possible traits and well over 300 million
          combinations, there’s plenty of Dino fun to go around! So why not pick
          up a few eggs and find your forever Dinos on this blockchain adventure
          with us!
        </p>
      </div>
      <div className={`dino-trail-section  d-flex flex-column m-5`}>
        <h2 className={`text-capitalize text-white`}>Dino Trail</h2>
        <h3 className={`text-capitalize text-white`}>Roadmap</h3>
        <p className={`text-white`}>
          With 10,000 unique Dinos available to the public, there’s plenty of
          room for variety. Unlike some projects who boast an individual
          character, Dawn of the Dinos will showcase seven different species!
          The collective includes fan favorites like the:
        </p>
        <ol className={`text-white`}>
          <li className={`my-2`}>
            We’re so happy to see our Dinos find new homes. So, kicking things
            off at 30% sales, we will be setting up a community wallet filled
            with 20 ETH. Later on, at 90% sales, we’ll throw in another 30 ETH!
          </li>
          <li className={`my-2`}>
            Family is important to all of us — so much so, that this project was
            inspired by our very own children! It’s important to include the
            little tykes as often as possible, which is why we’re proud to
            announce that we will be the FIRST ever collection to launch a
            children’s book series alongside our Dinos! The first book will be
            sent to our publishers at 50% sales.
          </li>
          <li className={`my-2`}>
            Right around the corner at 60% sales, get ready to get your Dinos
            on! Quite literally, ON! Merchandise will be put through the
            printers! Everything from a T-shirt to a Hoodie. Gotta have them
            signature Dad hats too! And an ample abundance of STICKERS. Again,
            we’re family friendly. YIPPEE!
          </li>
          <li className={`my-2`}>
            In the event of us all doing something remarkable and giving every
            single Dino a new home, a very special surprise will be announced to
            the happy new owners of cute little Dino eggs. Stay tuned!
          </li>
          <li className={`my-2`}>
            Being incharge of the project and running it to its greatest
            potential is of utmost importance to us. This is why we will be
            adding a few of you into the fray. A select few of the owners will
            be voted into the Dino Delegation! They will focus on one thing and
            one thing only; to ensure the projects growth through the community.
            They will be directly involved in future efforts to increase
            community outreach and will work hand in hand with the original Dawn
            of the Dinos team creating influence and longevity along the way!
          </li>
          <li className={`my-2`}>
            Regardless of how well we do in the long run, community is
            important. We strive to make our community a family worth fighting
            for. We will not only be giving back to the community with multiple
            curated drops and merchandise, but we feel it is our duty to give
            back to humanity. Without the existence of Dinos, we wouldn’t be
            here right now. A healthy donation will be made to help the fight
            against cancer. We will announce our organization of choice post
            launch.
          </li>
        </ol>
      </div>
    </div>
  );
}
