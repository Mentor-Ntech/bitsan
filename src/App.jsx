import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Developer from "./pages/developer/Developer";
import Network from "./pages/network/Network";
import NotFound from "./pages/notFound/NotFound";
import Platform from "./pages/platform/Platform";
import Pricing from "./pages/pricing/Pricing";
import Resources from "./pages/resources/Resources";
import Usecase from "./pages/usecase/Usecase";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "./pages/signin/signin";
import Dashboard from "./pages/dashboard/dashb";
import ContextProvider from "./context/context";
import RecievePayment from "./components/dashbCom/recievePayment/recievePayment";
import ViewPaymentLink from "./components/dashbCom/viewPaymentLink/viewPaymentLink";
import Profile from "./components/dashbCom/profile/Profile";
import Transactions from "./components/dashbCom/transactions/transactions";
import PaymentLinks from "./components/dashbCom/paymentLinks/paymentLinks";
import Sending from "./components/dashbCom/sending/Sending";
import CreatePaymentLink from "./components/dashbCom/createPayment/createPayment";
import Products from "./components/dashbCom/products/products";
import CreateProduct from "./components/dashbCom/createProducts/createProdut";
import Settings from "./components/dashbCom/settings/Settings";
import AccountSending from "./components/dashbCom/sending/accoutNumSending";
import AddressSending from "./components/dashbCom/sending/addressSending";
import TopUp from "./components/dashbCom/topup/topup";
import AddressTopUp from "./components/dashbCom/topup/addressTopUp";
import BankTopUp from "./components/dashbCom/topup/bankTopUp";
import ProductView from "./components/dashbCom/productView/productView";
import ProductLinkPayment from "./components/dashbCom/productLinkPayment/productLinkPayment";
import Reciept from "./components/dashbCom/reciept/reciept";

// import PaymentLink from "./components/platform/PaymentLink";

const App = () => {
  return (
    <ContextProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="contact"
              element={
                <>
                  <Navbar />
                  <Contact />
                  <Footer />
                </>
              }
            />
            <Route
              path="developer"
              element={
                <>
                  <Navbar />
                  <Developer />
                  <Footer />
                </>
              }
            />
            <Route
              path="network"
              element={
                <>
                  <Navbar />
                  <Network />
                  <Footer />
                </>
              }
            />
            <Route
              path="platform"
              element={
                <>
                  <Navbar />
                  <Platform />
                  <Footer />
                </>
              }
            />
            <Route
              path="pricing"
              element={
                <>
                  <Navbar />
                  <Pricing />
                  <Footer />
                </>
              }
            />
            <Route
              path="resources"
              element={
                <>
                  <Navbar />
                  <Resources />
                  <Footer />
                </>
              }
            />
            <Route
              path="usecase"
              element={
                <>
                  <Navbar />
                  <Usecase />
                  <Footer />
                </>
              }
            />
            <Route path="signin" element={<SignIn />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="payment_gateway/:id/:title"
              element={<RecievePayment />}
            />
            <Route
              path="dashboard/payment_link_view/:id"
              element={<ViewPaymentLink />}
            />
            <Route path="dashboard/profile" element={<Profile />} />
            <Route path="dashboard/transactions" element={<Transactions />} />
            <Route path="dashboard/payment_links" element={<PaymentLinks />} />
            <Route path="dashboard/payout" element={<Sending />} />
            <Route
              path="dashboard/create_payment_link"
              element={<CreatePaymentLink />}
            />
            <Route path="dashboard/products" element={<Products />} />
            <Route
              path="dashboard/create_product"
              element={<CreateProduct />}
            />
            <Route path="dashboard/settings" element={<Settings />} />
            <Route path="dashboard/bank-payout" element={<AccountSending />} />
            <Route
              path="dashboard/wallet-payout"
              element={<AddressSending />}
            />
            <Route path="dashboard/topup" element={<TopUp />} />
            <Route path="dashboard/address_topup" element={<AddressTopUp />} />
            <Route path="dashboard/bank_topup" element={<BankTopUp />} />
            <Route
              path="dashboard/product_view/:id"
              element={<ProductView />}
            />
            <Route
              path="product_link/:id/:productName"
              element={<ProductLinkPayment />}
            />
            <Route
              path="reciept"
              element={<Reciept />}
            />
          
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <NotFound />
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ContextProvider>
  );
};

export default App;
