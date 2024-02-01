import { SiParsedotly } from 'react-icons/si'
import {RiHandCoinFill} from 'react-icons/ri'
import {} from 'react-icons/fa'

import {BiLoaderCircle} from 'react-icons/bi'
import {HiOutlineArrowsExpand} from 'react-icons/hi'
import {GiCoinflip,GiCash} from 'react-icons/gi'
import {FaCentos} from 'react-icons/fa'
import {BsDashCircleDotted,BsCashCoin} from 'react-icons/bs'
import {FaPlayCircle,FaCoins,FaCashRegister,FaPiggyBank} from 'react-icons/fa'
import {MdOutlineDashboard,MdFeaturedPlayList,MdOutlineProductionQuantityLimits} from 'react-icons/md'
import {HiOutlineUsers} from 'react-icons/hi'
import {SiAuth0} from 'react-icons/si'
import {AiOutlineSetting} from 'react-icons/ai'
import {ImProfile} from 'react-icons/im'


export const links = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Platform',
        path: '/platform'
    },
    {
        name: 'Developer',
        path: '/developer'
    },
    // {
    //     name: 'Network',
    //     path: '/network'
    // },
    // {
    //     name: 'Usecase',
    //     path: '/usecase'
    // },
    {
        name: 'Pricing',
        path: '/pricing'
    },
    // {
    //     name: 'Sign in',
    //     path: '/signin'
    // },
    {
        
        name: 'Contact',
        path: '/contact'
    }
]


export const usecase = [
    {
        id: 1,
        icon: <SiParsedotly/>,
        title: "Fiat and  Crypto payment Solution",
        info: "Partner with Bitsan$ to offer payout service if you are NBFI or DEFI",
        path: "/usecase/111"
    },
    {
        id: 2,
        icon: <RiHandCoinFill/>,
        title: "offer a  business payments services",
        info: "Enable all the region businesses to send payment globally",
        path: "/usecase/222"
    },
    {
        id: 3,
        icon: <FaCoins/>,
        title: "Build international and Local bill payment solution",
        info: "Enable your customers to pay marchants, businesses, schools, hospitals etc. in the receiving country directly from all country",
        path: "/usecase/333"
    },
]


export const bitsans = [

    {
        id: 1,
        icon: <BiLoaderCircle/>,
        title: "Start offering Crypto payment services in everyday",
        desc: 'integrate in our sandbox- Push configuration to production -Go live.'
    },
    {
        id: 2,
        icon: <GiCoinflip/>,
        title: "Save 95% in fixed and monthly costs",
        desc: 'No heavy up-front fees. Low monthly billables'
    },
    {
        id: 3,
        icon: <HiOutlineArrowsExpand/>,
        title: "Scale your business with our flexible API",
        desc: 'Build your application to offer a wide range of crypto  payment solution services to your customers.Build beyond remittance.'
    }

]

export const checkout = [
    {
        id: 1,
        icon: <FaCentos/>,
        title: 'Multi-Coin payments',
        desc: 'Accept up to 10+ cryptocurrencies including BUSD, USDT, DAL and many more you choose'
    },
    {
        id: 2,
        icon: <FaPlayCircle/>,
        title: 'Instant Settlements',
        desc: 'Maintain the running cost of doing business Access your funds instantly or set automatic payouts'
    },
    {
        id: 3,
        icon: <BsDashCircleDotted/>,
        title: 'Truly Borderless',
        desc: 'Access payments whenever you do business.Modern payments for your modern business'
    },
]

export const faqs = [
    {
        id: 1,
        question:"What is Bitsans?",
        answer: "Bitsans is a decentralized payment hub where merchants can receive payments and  Basically, we help you receive payments for goods and services via cryptocurrency and invest your revenue in assets.",
    },
    {
        id: 2,
        question:"Can i register more than one wallet?",
        answer: "Yes, you have the option of registering one or more wallet on the Lazerpay platform.",
    },
    {
        id: 3,
        question:"What are the stablecoin?",
        answer: "Stablecoins are a type of cryptocurrency whose value is attached to an external asset like US dollars, gold, or to exchange-traded commodities. They are different from cryptos like Bitcoin, ETH, or DogeCoin that are “mined” by computers.",
    },
    {
        id: 4,
        question:"Can I store my crypto on your platform?",
        answer: "Yes, you can. Your Bitsans account can be used to store any of or stablecoins for any period of time. You can also invest your funds in our lossless investment pools.",
    },
    {
        id: 5,
        question:"What is Your exchange rate?",
        answer: "Our exchange rate is constantly updated to reflect the market price. We operate with the best rates and ensure it is as fair as possible to all bitsans fans",
    },
    {
        id: 6,
        question:"How do I used bitsans?",
        answer: "Bitsans helps you accept payments in crypto from anywhere in the world through three options: Payment links, Payment Buttons, and Donation Links. <br/> Payment and Donation links can be copied and shared via various mediums while the Payment Button is for websites, startups, and apps who wish to accept payments in crypto from, or for their customers.",
    },
    {
        id: 7,
        question:"How much does Bitsans charge for transactions?",
        answer: "We charge a flat fee of 1% for all transactions. No hidden charges.",
    },
    {
        id: 8,
        question:"Do my clients need to own crypto before they can pay me on Bitsan?",
        answer: "Yes. Your clients need to have a wallet with crypto. When you send a payment link from Lazerpay, they are automatically directed to their wallet of choice from which they can make payment.",
    },
    {
        id: 9,
        question:"Does Bitsan use a native wallet",
        answer: "Yes, Bitsan employs a native wallet on our platform where your earnings can be automatically settled on a cryptocurrency of your choice.",
    },
    {
        id: 10,
        question:"What Blockchain does Bitsan operate on?",
        answer: "Bitsan currently runs on the Binance smartchain, including Solana and Ethereum blockchains.",
    },
    {
        id: 11,
        question:"What is the daily withdrawal limit for crypto payout",
        answer: "Fully verified starter businesses and registered businesses can withdraw up to $10,000 daily.",
    },
    {
        id: 12,
        question:"Can i connect my Bitsan account to any wallet?",
        answer: "Bitsan operates a native wallet for transactions. However, you have the option to add payout addresses of your choice to wallets supported on the Bitsan platform.",
    },
    {
        id: 13,
        question:"What is growth fund",
        answer:"A growth fund is the mutual money pool or investment vehicle that Lazerpay supports qualified small and medium sized businesses with to grow their business. These funds are primarily invested in Lazer tokens.",
    },
    {
        id: 14,
        question:"What is the daily withdrawal limit for fiat payment?",
        answer: "Fully verified individuals and businesses can withdraw up to $100,000 daily.",
    },
]

export const slideItems = [
    {
        title: 'dashboard',
        path: '/dashboard',
        icon: <MdOutlineDashboard/>,
        className: 'nav-text'
    },
    // {
    //     title: 'Users',
    //     path: '/users',
    //     icon: <HiOutlineUsers/>,
    //     className: 'nav-text'
    // },
    {
        title: 'Users',
        path: '/dashboard/users',
        icon: <HiOutlineUsers/>,
        className: 'nav-text'
    },
    // {
    //     title: 'Authentication',
    //     path: '/authentication',
    //     icon: <SiAuth0/>,
    //     className: 'nav-text'
    // },
    {
        title: 'Transactions',
        path: '/dashboard/transactions',
        icon: <MdFeaturedPlayList/>,
        className: 'nav-text'
    },
    {
        title: 'Payment Link',
        path: '/dashboard/payment_links',
        icon: <FaCashRegister/>,
        className: 'nav-text'
    },
    {
        title: 'Product',
        path: '/dashboard/products',
        icon: <MdOutlineProductionQuantityLimits/>,
        className: 'nav-text'
    },
    {
        title: 'Payout',
        path: '/dashboard/payout',
        icon: <BsCashCoin/>,
        className: 'nav-text'
    },
    {
        title: 'Top up',
        path: '/dashboard/topup',
        icon: <FaPiggyBank/>,
        className: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/dashboard/profile',
        icon: <ImProfile/>,
        className: 'nav-text',
    },
    {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: <AiOutlineSetting/>,
        className: 'nav-text'
    }
]

