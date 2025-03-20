import Linked from "../../assets/link.svg";
import LinkedActive from "../../assets/linkActive.svg";
import Mission from "../../assets/mission.svg";
import MissionActive from "../../assets/missionActive.svg";
import Wind from "../../assets/wind.svg";
import WindActive from "../../assets/windActive.svg";
import Cart from "../../assets/cart-shopping.svg";
import CartActive from "../../assets/cart-shoppingActive.svg";
import Wallet from "../../assets/wallet.svg";
import WalletActive from "../../assets/walletActive.svg";

export const footerTabs = [
  {
    path: "/referal",
    icon: Linked,
    activeIcon: LinkedActive,
    label: "Referal",
  },
  {
    path: "/missions",
    icon: Mission,
    activeIcon: MissionActive,
    label: "Mission",
  },
  {
    path: "/home",
    icon: Wind,
    activeIcon: WindActive,
    label: "Home",
    isCenter: true,
  },
  { path: "/shop", icon: Cart, activeIcon: CartActive, label: "Shop" },
  { path: "/wallet", icon: Wallet, activeIcon: WalletActive, label: "Wallet" },
];
