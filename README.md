# Fastyd
Fastyd is a Superapp that greatly improves Check-out processes on e-commerce employing Rapyd’s Checkout toolkit and APIs, while incorporating Web3 and blockchain capabilities and transactions.


# Introduction and Problem

The main problem that we will be addressing according to the challenge is as follows:
We find that close to 70% of shopping carts in online businesses are abandoned leaving 
Near to $260 billion worth of lost orders which are recoverable solely through a better checkout flow & design. Which would translate in a 35.26% increase in conversion rates for online businesses.

<img src="https://i.ibb.co/KLyGqDb/shopincartab.png">

Regarding the problem we found after some research that these are the most important reasons for checkout and cart abandonment.

There are several reasons that we cannot tackle directly because they depend more directly on the seller such as delivery times, website crashes and Return policies. 

<img src="https://baymard.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcart-abandonment-stats.95d62027.jpeg&w=3840&q=75">

But, we can Tackle for our solution several of the most important ones such as: 

- Reducing extra costs (1)
- The requisite of creating an account (2)
- Trust issues with credit card information (4)
- Calculating payment costs (6)
- And increasing payment methods (penultimate one)

With these we can solve more than 80% of the problems related to Checking-out and increase the conversion rate with a better checkout flow.


While at the same time innovating on the fintech sector with our expertise on Web3 and decentralized computing. 

# System's Architecture

<img src="https://i.ibb.co/vmf1MfK/scheme-drawio-4.png">

- The main services we are using is Rapyd, ChainLink, Moralis, IPFS and Polygon.
- Rapyd Services:
  - Rapyd Wallet: 
    - Creacion de company y personal wallets para las tranferencias en el checkout.
    - Obtener las transacciones y balances por cuenta para desplegarlas en la app.
    - Creacion de la pagina de verificacion de identidad para cumplir el KYC.
  - Rapyd Collect:
    - Creacion de una pagina de checkout para poder transferir dinero de la ewallet a una tarjeta externa.
  - Rapys Issuing:
    - Poder obtener una tarjeta virtual para acceder a nuestros fondos de ewallet.
- Polygon is our main blockchain, where thanks to its low fees we can provide the following services.
  - Decentralized Chat.
  - Transfer tokens and NFT's
 - Chainlink, thanks to its data feeds, provides us with the possibility of consuming them directly within a smart contract, in this case we use a contract deployed in Polygon Mainnet as a bridge to provide our dapp with the prices of BTC, BNB, USDC, MATIC, LINK and ETH.
- Moralis provides us with a very efficient API to obtain data from our NFT's and Token balances in our account.
- The Swap is the only section where we coordinate Rapyd and Polygon services to be able to exchange MATIC to Fiat money.

# Solution

This is the Demo of our solution.

Marketplace URL: https://main.d16nkc9yw8s622.amplifyapp.com/

Checkout test Credentials:
- User: hexagon@chainlink.com
- Pass: toortoor

We will begin by showing you Rapyd’s backend and the balance we have at that moment on it.

We will demonstrate our improved Checkout via an old marketplace we designed a couple months ago.

<img src="https://i.ibb.co/wg33ScF/image.png">

Here go through a  normal buying process in which you fill First the shipping information. After that we go straight away to choosing a Payment method which is way faster than most other options currently in the market. Let’s choose Fastyd. 

<img src="https://i.ibb.co/tB0Mzg3/image.png">

As you can see a prompt opens, we log in and we can choose two forms of payment, which is Fiat, USD or credit and debit card in this case, or Crypto payments with ETH or MATIC. Let’s pay with US dollars at this moment through our Rapyd ewallet. 

<img src="https://i.ibb.co/Jjxd9ZX/image.png">

Immediately we get confirmation and the details for it. And we can also get to see how that balance changes on our Rapyd backend. This offers a much faster, elegant and simpler checkout experience for the buyer.

# Application

That was on the cash out portion but we have a mobile application that you use to speed up every process. Let’s see how we get to that fast checkout. 

In the following image you can see...
For our traditional cash out Ramp and KYC services we are using Rapyd’s Wallet identity Verification Object. Additionally we used the Wallet-Wallet Transaction Object, Rapyd Collect and Rapyd Issuing APIs for the other services we provide.

<img src="https://i.ibb.co/zFy6Jsx/screens1.png">

Once inside the platform you will see our Chainlink-based price feed as the first screen (third phone on the image above).

Already within our Dapp we can see our balances and transactions of Fiat and Crypto.

Finally, in the last button you can complete the KYC through Rapyd  to verify your identity.


## Swap functionality

In the swap section we can make an exchange between our Fiat account and our crypto account, we only have to select if we want to convert Crypto to Dollar or Dollar to Crypto, in this case we will convert Crypto to Dollar. Once the transaction is signed and the operation is finished in the home section we will be able to see how we have already received our money in our Fiat account and deducted it from our Crypto account.

<img src="https://i.ibb.co/jRQ6sd6/Screens2-1.png">

## Cash out

In our Cash out section we will have 2 options, generate a virtual debit card where we can use our Fiat money or make an electronic transfer to another debit card, either visa or mastercard.

<img src="https://i.ibb.co/fnL0Q2d/Screens3.png">

## Messenger Demo

For our messenger every transaction or message is wallet signed in the background on Blockchain.

<img src="https://i.ibb.co/wgL4Cjm/New-Project-5.png">

At the same time we integrate a chat section, where we can talk to any address on the same network, first we put the address with which we want to talk and we can start sending messages, in this case it is possible to send messages, send attached money or even send an NFT.

## Real Showcase

This is now a Real demo of our solution.

You can now use our Application without any problem on a real cell phone, as you can see here we are already using it and running it with all its functions and features active. On the phone you can see our balance which is X dollars, now we will be buying an article on the same site as the first demo and show you how the experience feels and how everything is shown at the end with the new balance on the Fastyd app. 

<img src="./Gif/real.gif">

# Whats Next for Fastyd

For now we think we have a great improvement over incumbents in the checkout space, if we compare it to other solutions in the payments ecosystem such as Bolt or Paypal we think we have a much more agile and faster process thanks to Rapyd's APIs. On that same front we think going mobile is the way to move forward as there is a huge population, including Latin America and other developing regions that have access to a Cellphone with internet connection, but are not banked. But, of course this represent a huge market that will keep on growing for the coming years and it is imperative to access it. Regarding our current development we would like to incorporate even more payment options and work around our design a little bit more to make it more intuitive, or include documentation and a FAQ that explain how to do everything inside the application. Furthermore we would like to expand and try more marketplaces to test the application for a possible alpha or beta test in the coming months.


# References

https://baymard.com/lists/cart-abandonment-rate

https://www.statista.com/statistics/477804/online-shopping-cart-abandonment-rate-worldwide/

https://www.drip.com/blog/cart-abandonment-statistics





