import CommonHero from "../../components/commonHero/CommonHero";
import comm from "../../assets/merchHero.jpg"
import"./merch.scss";
import HomeContact from "../home/sections/homeContact/HomeContact";
import MerchExplorer from "./sections/merchExplorer/MerchExplorer";
const Merch = () => {
  return (
    <>
    <CommonHero
        title='Travel Essentials Store'
        backgroundType='image'
        backgroundSrc={comm}
      />
      <MerchExplorer/>
      <HomeContact/>
    </>
  )
}

export default Merch