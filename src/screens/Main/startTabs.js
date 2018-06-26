import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs= ()=>{
    Promise.all([
        Icon.getImageSource("md-home",30),
        Icon.getImageSource("md-people",30),
        Icon.getImageSource("md-chatboxes",30),
        Icon.getImageSource("md-person",30),
        Icon.getImageSource("md-menu",30),
        Icon.getImageSource("md-add",30)
    ]).then(sources=>{
        Navigation.startTabBasedApp({
            tabs:[
                {
                    screen:"evarkadasim.Houses",
                    label:"Evler",
                    title:"Ev Bulun",
                    icon:sources[0],
                    navigatorButtons:{
                        leftButtons:[
                            {
                                icon:sources[4],
                                title:"Menu",
                                id:"sideDrawerToggle"
                            }
                        ],
                        rightButtons:[
                            {
                                icon:sources[5],
                                id:"newHouse",
                                title:"new"
                            }
                        ]
                    }
                },
                {
                    screen:"evarkadasim.Roommates",
                    label:"Kişiler",
                    title:"Kişi Bulun",
                    icon:sources[1],
                    navigatorButtons:{
                        leftButtons:[
                            {
                                icon:sources[4],
                                title:"Menu",
                                id:"sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen:"evarkadasim.Messages",
                    label:"Mesajlar",
                    title:"Mesajlar",
                    icon:sources[2],
                    navigatorButtons:{
                        leftButtons:[
                            {
                                icon:sources[4],
                                title:"Menu",
                                id:"sideDrawerToggle"
                            }
                        ]
                    }

                },
                {
                    screen:"evarkadasim.Profile",
                    label:"Profilim",
                    title:"Profilim",
                    icon:sources[3],
                    navigatorButtons:{
                        leftButtons:[
                            {
                                icon:sources[4],
                                title:"Menu",
                                id:"sideDrawerToggle"
                            }
                        ]
                    }
                }
            ],
            tabsStyle:{
                tabBarSelectedButtonColor:"orange",
                forceTitlesDisplay:true
                
            },
            appStyle:{
                tabBarSelectedButtonColor:"orange",
                forceTitlesDisplay:true
                
            },
            drawer:{
                left:{
                    screen:"evarkadasim.SideDrawer"
                }
            },
            animationType:"fade"
        })
    })

}

export default startTabs;