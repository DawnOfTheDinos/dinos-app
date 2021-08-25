import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import Button from '../components/Button';
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
  const [state, setState] = useState<IState>({
    address: null,
    num_of_dinos: 0,
    balance: 0,
    show: false,
  });
  let _web3, _signer;
  useEffect(() => {
    async function init() {
      try {
        _web3 = new ethers.providers.Web3Provider(window.ethereum);
        _signer = await _web3.getSigner();

        let address: any = await _signer.getAddress();
        let balance: any = await _web3.getBalance(address);

        await setState({
          ...state,
          address: address,
          balance:
            Math.ceil(ethers.utils.formatUnits(balance, 'ether') * 10000) /
            10000,
        });
      } catch (error) {
        console.log(error);
      }
    }
    init();
    window.ethereum.on('accountsChanged', async (newAccounts) => {
      console.log(newAccounts);
      if (newAccounts > 0) {
        let address: any = await newAccounts[0];

        setState({
          ...state,
          address: address
        });
      } else {
        setState({
          ...state,
          address: null,
        });
      }
    });
  }, []);
  return (
    <div className={`home`}>
      <style global jsx>
        {`
          html,
          body,
          #__next {
            font-family: monospace;
            font-size: 1.2rem;
            height: 100%;
          }
          .home {
            margin: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
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
        `}
      </style>
      <h1>Welcome to the Dinos App BETA</h1>
      {state.address !== null ? (
        <div className={'minting-section'}>
          {' '}
          <p>{truncateAddress(state.address)}</p>
          {state.balance > 0 && <p>Balance: {state.balance}ETH</p>}
          <hr />
          <label htmlFor={'dino-input'} className={`text-capitalize`}>
            How Many Dinos Are We Minting?
          </label>
          <input
            id={'dino-input'}
            className={''}
            type={'number'}
            placeholder={'0'}
            value={state.num_of_dinos}
            onChange={async (e) => {
              e.preventDefault();
              //TODO: Clean Input
              if (
                e !== null &&
                parseInt(e.target.value) >= 0 &&
                parseInt(e.target.value) <= 20
              ) {
                setState({...state, num_of_dinos: parseInt(e.target.value)});
              } else {
                setState({...state, num_of_dinos: 0});
              }
            }}
            min={0}
            max={20}
            spellCheck
          />
          <Button onPress={() => alert('Minting')}>Mint</Button>
        </div>
      ) : (
        <>
          <Button
            onPress={async () => {
              console.log(
                'clicked',
                await _web3.provider.request({method: 'eth_requestAccounts'})
              );
              await _web3.provider.request({method: 'eth_requestAccounts'});
            }}>
            Connect
          </Button>
        </>
      )}
    </div>
  );
}
