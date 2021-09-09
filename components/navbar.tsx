import Button from './Button';

interface INav {
  address: string | null;
}

interface INavItem {
  Page: string;
}

async function handleEthereum() {
  const {ethereum}: any = window;
  if (ethereum && ethereum.isMetaMask) {
    console.log('Ethereum successfully detected!');
    // Access the decentralized web!
    await ethereum.request({method: 'eth_requestAccounts'});
  } else {
    console.log('Please install MetaMask!');
  }
}
function NavItem(props: INavItem) {
  return <div className={`nav-item d-none d-xl-block`}>{props.Page}</div>;
}

function navbar(props: INav) {
  return (
    <>
      <style jsx>{`
        .navbar {
          color: #fff;
          background-color: #00242c;
          min-height: 75px;
        }
      `}</style>
      <nav className='navbar navbar-expand-lg d-flex flex-row align-items-center px-3'>
        <div
          className={`w-100 d-flex flex-row justify-content-between align-items-center`}>
          <a
            className='text-uppercase h-100 text-decoration-none text-white'
            href='/'>
            Dawn of the dinos
          </a>
          <NavItem Page='About' />
          <NavItem Page='Roadmap' />
          <NavItem Page='Team' />
          <NavItem Page='Dinos' />
          <NavItem Page='Mint Yours' />
          <NavItem Page='FAQ' />
          <NavItem Page='Your Dinos' />
          {props.address == null ? (
            <Button
              buttonStyle={`text-white btn-outline-success`}
              onPress={async () => {
                if (window.ethereum !== undefined) {
                  // eslint-disable-line
                  handleEthereum();
                } else {
                  window.addEventListener(
                    'ethereum#initialized',
                    handleEthereum,
                    {
                      once: true,
                    }
                  );

                  // If the event is not dispatched by the end of the timeout,
                  // the user probably doesn't have MetaMask installed.
                  setTimeout(handleEthereum, 3000); // 3 seconds
                }
              }}>
              Connect
            </Button>
          ) : (
            <div>{props.address}</div>
          )}
        </div>
      </nav>
    </>
  );
}
export default navbar;
