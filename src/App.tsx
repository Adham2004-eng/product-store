import { Routes, Route } from "react-router-dom";
import DijavoAppBar from "./header/Navbar/Appbar";
import SignupForm from "./Auth/Signup/Component/Signup";
import LoginForm from "./Auth/Login/Component/Login";
import ProductList from "./body/Home/Component/AllProducts";
import MensClothes from "./body/Products/MenProducts";
import WomensClothes from "./body/Products/WomenProducts";
import Jewelery from "./body/Products/Jewelry";
import Electronics from "./body/Products/Electronics";
import ProductDetails from "./body/ProductsDetails/Component/ProductDetails";
import CartUI from "./header/Cart/Components/CartUi";
import Footer from "./Footer";

const App = () => {
  return (
    <>
      <DijavoAppBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/mensclothes" element={<MensClothes />} />
        <Route path="/womensclothes" element={<WomensClothes />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/jewelery" element={<Jewelery />} />
        <Route path="/cart" element={<CartUI />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="*" element={<ProductList />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
