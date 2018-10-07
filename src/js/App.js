import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import RadicalPixels from '../../build/contracts/RadicalPixels.json'
import 'bootstrap/dist/css/bootstrap.css'
import PixelMap from './PixelMap';
import logo from '../../assets/logo.jpg';

require('babel-polyfill')
require('babel-register')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      pixels: [],
      purchased: false,
      loading: true,
      buying: false,
      selectedPixel: 0
    }

    this.purchase = this.purchase.bind(this)

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    
    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.radicalpixels = web3.eth.contract(RadicalPixels)

   
    this.watchEvents = this.watchEvents.bind(this)
  }

  handleSelectionChange(newSelection){
    this.setState({selectedPixel : newSelection});
  }

  componentDidMount() {
    // TODO: Refactor with promise chain

  
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })

      let RadicalInstance = web3.eth.contracts(RadicalPixels)
      
      const radicalInstance = RadicalPixels.at("0xcac59c4c9789c081bce6338ee26d07b4f7c22859");
      
      
      /*
      this.radicalpixels.deployed().then((radicalInstance) => {




        this.radicalInstance = radicalInstance

        this.watchEvents()
        this.radicalInstance.pixelCount().then((pixelCount) => {
          for (var i = 1; i <= pixelCount; i++) {
            this.radicalInstance.pixels(i).then((pixel) => {
              const pixels = [...this.state.pixels]
              pixels.push({
                id: pixel[0],
                owner: pixel[1],
                color: pixel[2],
                opacity: pixel[3],
                price: pixel[4]
              });
              this.setState({ pixels: pixels, loading: false })
            });
          }
        })
      })*/
    })

   const colors = ['red','blue','green','yellow','cyan','purple','maroon','pink','grey'];

   let pixels = [
     {
       'id':'0x12345',
       'price': 5,
       'owner': 'bob',
       'x':0,
       'y':0,
       'colors': colors
     },
     {
      'id':'0x23456',
      'price': 6,
      'owner': 'alice',
      'x':1,
      'y':2,
      'colors': false
     },
     {
      'id':'ox34567',
      'price': 7,
      'owner': '0x0',
      'x':20,
      'y':10,
      'colors': colors
     }
    ]
   this.setState({pixels: pixels});

  }

  watchEvents() {
    // TODO: trigger event when sale is confirmed, not when component renders
    this.radicalInstance.soldEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ buying: false })
    })
  }

  async purchase() {

    alert("purchase initiated");

    const x = this.pixels[pixelIndex].x;
    const y = this.pixels[pixelIndex].y;

    this.setState({ buying: true });

    const pixelData = await this.radicalPixels.pixelByCoordinate(x, y);

    console.log(pixelData.seller);

    /*
    this.radicalInstance.purchase(pixelId, { from: this.state.account }).then((result) =>
      this.setState({ purchased: true })
    )*/
  }

  render() {
    return (
      <div>
        
        <div style={{
          'position': 'fixed',
          'z-index': '100',
          'top': '0px',
          'left:': '0px',
          'width': '100%',
          'height': '60px',
          'backgroundColor':'white',
          'box-shadow:': '0 5px 15px rgba(0,0,0,0.3)',
          '-webkit-box-shadow': '0 5px 15px rgba(0,0,0,0.3)'}}>
          <img src={logo} style={{'width': '40px', 'height': '40px', 'margin': '10px 10px 0px 10px','float':'left'}}/>
          <h2 style={{'margin-top': '10px'}}>Radical Pixels</h2>
        </div>

       
        <div style={{
          'position': 'fixed', 
          'z-index': '-1',
          'top': '60px', 
          'right': '0px',
          'width': '300px',
          'height': '100%',
          'backgroundColor': '#1d2d3c'}}>
          <h5 style={{'color':'white', 'margin-top': '10px', 'margin-left': '10px'}}>Pixel: {this.state.selectedPixel}</h5>
          <h5 style={{'color':'white', 'margin-top': '10px', 'margin-left': '10px'}}>Owner: {this.state.selectedPixel}</h5>
          <h5 style={{'color':'white', 'margin-top': '10px', 'margin-left': '10px'}}>Price: 100TH</h5>
          
          <input type='button' onsubmit={this.purchase} value='test'/> 

           <input class="form-control rounded-0" id="inputPassword2" placeholder="0.2 ETH"
            style={{
              'position': 'absolute',
              'bottom': '140px',
              'left': '20px',
              'width': '270px',
              'height': '40px',
            }}
           />

          <button class="btn-success" onclick={this.purchase} style={{
            'position': 'absolute',
            'bottom': '80px',
            'left': '20px',
            'width': '270px',
            'height': '40px',
            'cursor': 'pointer',
            'enabled': false
          }}>PURCHASE PIXEL</button>
        </div>


        {/* this.state.loading || this.state.buying
          ? <p class='text-center'>Loading...</p>
          : <Content
              account={this.state.account}
              candidates={this.state.candidates}
              hasVoted={this.state.hasVoted}
              castVote={this.castVote} />
        */}
          
        {/*
        <div class='row' style={{'margin-left': '10px'}}>
          <PixelMap pixels = {this.state.pixels}/>
        </div>
        */}

        <div style={{
          'position': 'fixed', 
          'top': '60px',
          'left': '0px',
          'bottom': '0px',
          'right': '300px',
          'overflow': 'scroll'
          }}>
          <PixelMap pixels = {this.state.pixels} owner={'0x0'} onSelectionChange={this.handleSelectionChange}/>
        </div>

      </div>
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
