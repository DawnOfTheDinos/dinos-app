
import Button from '../components/Button';
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
  return <div>{props.Page}</div>;
}

function navbar() {
  return (
    <>
      <style jsx>{`
        .navbar {
          color: #fff;
          background-color: #00242c;
          height: 75px;
        }
      `}</style>
      <nav className='navbar navbar-expand-lg d-flex flex-row align-items-center px-3'>
        <div className={`w-100 d-flex flex-row justify-content-between align-items-center`}>
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
        <Button
        buttonStyle={`text-white btn-outline-success`}
            onPress={async () => {
              
              if (window.ethereum !== undefined) {// eslint-disable-line
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
      
        </div>
      </nav>
    </>
  );
}
export default navbar;
