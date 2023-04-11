import React from "react";
import SearchSection from "../components /homePageSections/searchSection/SearchSection";
import Header from "../components /Header/Header";
import Popular from "../components /homePageSections/popularSection/Popular";
import Footer from "../components /Footer/Footer";
import "../index.css";
const Home = () => {
  return (
    <div>
      <Header />
      <SearchSection />
      <Popular />
      <Footer />
    </div>
  );
};

export default Home;
