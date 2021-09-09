import {ethers} from 'ethers';
import {useEffect, useState} from 'react';

import Image from 'next/image';
import Button from '../components/Button';
import Navbar from '../components/navbar';
import Modal from '../components/modal';
import DinoWeb3 from '../lib/DinoWeb3';
import 'bootstrap/dist/css/bootstrap.min.css';

const faqJSON = require('../src/data/faq.json');
const roadmapJSON = require('../src/data/roadmap.json');
const teamJSON = require('../src/data/team.json');
const guestsJSON = require('../src/data/guests.json');

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
  const [show, setShow] = useState(false);
  const [num_of_dinos, setNumOfDinos] = useState<any>(0);
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
            font-family: Inter;
            font-size: 1.2rem;
            height: 100%;
            background-color: #00242c;
          }
          p,
          li {
            list-style: none;
            font-size: 1rem;
          }
          .secondary-text-color {
            color: #03dac5;
          }
          .trail-text {
            color: #fff;
            font-size: 2rem;
            font-weight: bold;
            z-index: 4;
            top: 30px;
            left: 35px;
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
            max-width: 654px;
            min-height: 515px;
          }

          .mint-button-style {
            background: #03dac5;
            color: #000;
          }

          .modal-body {
            width: 512px;
            height: 562px;
            color: #fff;
            background-color: #00242c;
          }
          @media (max-width: 768px) {
            .header-section-text > p {
              font-size: 18px;
            }
          }
        `}
      </style>
      <Navbar address={truncateAddress(state.address)} />
      <div
        className={`header-section d-flex flex-column justify-content-center align-items-center px-3`}>
        <span className={`header-section-text text-center w-100`}>
          <h1 className={`mb-4 text-capitalize`}>
            Welcome to the Dawn
            <br /> of Time
          </h1>
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
            buttonStyle={`mint-button-style text-uppercase mt-4 px-5`}
            onPress={async () => {
              //Open Modal
              setShow(true);
              // _DinoWeb3.mint();
            }}>
            Mint Your Dino
          </Button>
        </span>
      </div>
      <div
        className={`container mx-auto collection-info-section  d-flex flex-column m-5 px-3`}>
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
        <p className={`text-white fw-lighter`}>
          Oh wait, that was only six different Dinos. What gives? Well Jimmy,
          <br />
          the seventh Dino is an ultra rare species that will emerge from the
          depths on launch day!
        </p>
        <p className={`text-white`}>
          It gets better! We’ve manifested a total of 1600 Dinos per species!
          This includes a whopping total of 400 of our top secret Dinos!
        </p>
        <p className={`text-white fw-lighter`}>Are you not impressed?</p>
        <p className={`text-white`}>
          With more than 100 possible traits and well over 300 million
          combinations, there’s plenty of Dino fun to go around! So why not pick
          up a few eggs and find your forever Dinos on this blockchain adventure
          with us!
        </p>
      </div>
      <div
        className={`container mx-auto dino-trail-section  d-flex flex-column m-5 px-3`}>
        <h2 className={`text-capitalize text-white`}>Dino Trail</h2>
        <h4 className={`text-capitalize secondary-text-color`}>Roadmap</h4>
        <p className={`text-white`}>
          With 10,000 unique Dinos available to the public, there’s plenty of
          room for variety. Unlike some projects who boast an individual
          character, Dawn of the Dinos will showcase seven different species!
          The collective includes fan favorites like the:
        </p>

        {roadmapJSON.map((item: any, index: number) => {
          return (
            <div
              className={`my-4 text-white d-inline-flex flex-row justify-content-between align-items-center w-100`}>
              <span className={'position-relative'}>
                <p className={'position-absolute trail-text'}>{index + 1}</p>
                <Image
                  className={`col position-position`}
                  height={'100px'}
                  width={'100px'}
                  layout='fixed'
                  src={'/img/foot.png'}
                />
              </span>
              <p className={'col-8'}>{item.track}</p>
            </div>
          );
        })}
      </div>

      <div
        className={`container mx-auto team-section  d-flex flex-column m-5 px-3`}>
        <h2 className={`text-capitalize text-white`}>The Team</h2>
        <div
          className={`d-flex flex-row flex-wrap justify-content-center mt-5`}>
          {teamJSON.map((item: any, index: number) => {
            return (
              <div
                className={`d-flex flex-column justify-content-center align-items-center m-2 mx-md-3`}>
                <div>
                  <Image
                    height={'236px'}
                    width={'236px'}
                    layout='fixed'
                    src={`/img/placeholderimg.png`}
                  />
                </div>
                <div className='text-center'>
                  <p className={`text-white`}>{item.name}</p>
                  <p className={`text-white`}>{item.role}</p>
                  <p className={`text-white`}>{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
        <h3 className={`text-capitalize text-white`}>Guest Starring</h3>
        <div
          className={`d-flex flex-row flex-wrap justify-content-center mt-5`}>
          {guestsJSON.map((item: any, index: number) => {
            return (
              <div
                className={`d-flex flex-column justify-content-center align-items-center m-2 mx-md-3`}>
                <div>
                  <Image
                    height={'236px'}
                    width={'236px'}
                    layout='fixed'
                    src={`/img/placeholderimg.png`}
                  />
                </div>
                <div className='text-center'>
                  <p className={`text-white`}>{item.name}</p>
                  <p className={`text-white`}>{item.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`container mx-auto dinos-section  d-flex flex-column m-5 px-3`}>
        <h2 className={`text-capitalize text-white`}>Dinos</h2>
      </div>
      <div
        className={`container mx-auto faq-section  d-flex flex-column m-5 px-3`}>
        <h2 className={`text-capitalize text-white`}>F.A.Q.</h2>
        {faqJSON.map(({title, content}: {title: string; content: string}) => (
          <div className={`text-capitalize text-white my-3`}>
            {title}
            <p className={`mt-3`}>{content}</p>
          </div>
        ))}
      </div>
      {show && (
        <Modal
          onClose={() => setShow(false)}
          bodyStyle={`rounded d-flex flex-column justify-content-between
            align-itens-center p-5`}>
          <h1>How many Dinos would you like to mint?</h1>
          <div className={`d-flex flex-column`}>
            Number of Dinos: {num_of_dinos}
            <label htmlFor='minter-input'></label>
            <input
              id={`minter-input`}
              type={`range`}
              min={0}
              max={10}
              value={num_of_dinos}
              onChange={(e) => {
                parseInt(e.target.value, 10) >= 0 &&
                  parseInt(e.target.value, 10) <= 10 &&
                  setNumOfDinos(e.target.value);
              }}
            />
            This is the number of Dinos you intend to mint. Maximum of 10 per
            transaction.
          </div>
          <Button
            buttonStyle={`mint-button-style text-uppercase mt-4 px-5`}
            onPress={async () => {
              //Open Modal
              alert('Minting');
              setShow(false);
              // _DinoWeb3.mint(num_of_dinos);
            }}>
            Mint
          </Button>
        </Modal>
      )}
    </div>
  );
}
