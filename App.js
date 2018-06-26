import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux'
import AuthScreen from './src/screens/Auth/Auth';
import HousesScreen from './src/screens/Houses/Houses';
import SignUpScreen from './src/screens/SignUp/SignUp';
import RoommatesScreen from './src/screens/Roommates/Roommates';
import MessagesScreen from './src/screens/Messages/Messages';
import ProfileScreen from './src/screens/Profile/Profile';
import ShareHouseScreen from './src/screens/ShareHouse/ShareHouse';
import HouseDetailScreen from './src/screens/HouseDetail/HouseDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import configureStore from './src/store/configureStore';

const store = configureStore();
Navigation.registerComponent("evarkadasim.Auth",()=>AuthScreen,store,Provider)
Navigation.registerComponent("evarkadasim.SignUp",()=>SignUpScreen,store,Provider)
Navigation.registerComponent("evarkadasim.Houses",()=>HousesScreen,store,Provider)
Navigation.registerComponent("evarkadasim.Roommates",()=>RoommatesScreen,store,Provider)
Navigation.registerComponent("evarkadasim.Messages",()=>MessagesScreen,store,Provider)
Navigation.registerComponent("evarkadasim.Profile",()=>ProfileScreen,store,Provider)
Navigation.registerComponent("evarkadasim.ShareHouse",()=>ShareHouseScreen,store,Provider)
Navigation.registerComponent("evarkadasim.HouseDetail",()=>HouseDetailScreen,store,Provider)
Navigation.registerComponent("evarkadasim.SideDrawer",()=>SideDrawer,store,Provider)

Navigation.startSingleScreenApp({
  screen:{
    screen:"evarkadasim.Auth",
    title:"Giriş Yap"
  },
  animationType:"fade"
})