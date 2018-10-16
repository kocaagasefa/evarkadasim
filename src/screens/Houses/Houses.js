import React,{Component} from 'react';
import {
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {getHouses} from '../../store/actions/';
import HouseListItem from '../../components/HouseListItem/HouseListItem';

class Houses extends Component {

    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    onNavigatorEvent = event => {
        if(event.type==="NavBarButtonPress"){
            if(event.id==="sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side:"left"
                });
            }
            else if(event.id==="newHouse"){
                this.props.navigator.push({
                    screen:"evarkadasim.ShareHouse",
                    title:"Evini Paylaş"
                })
            }
        }
    }

    
    componentDidMount(){
        this.props.getHouses();
    }
    onItemPressedHandler = house => {
        this.props.navigator.push({
            screen:"evarkadasim.HouseDetail",
            title:"Detaylar",
            passProps:{
                house
            }
        })
    }
    renderHouseListItem = house => (
        <HouseListItem
            house= {house}
            itemPressed={this.onItemPressedHandler} />)
    

    render(){
        if (this.props.isLoading)
        return <ActivityIndicator size="large" />
        return (
            <View>
                <FlatList 
                    data={this.props.houses}
                    renderItem = {item=>this.renderHouseListItem(item.item)}
                />
                
            </View>
        )

    }
}
const mapStateToProps = state => {
    return {
        houses:state.houses.houses,
        isLoading:state.ui.isLoading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getHouses : () => dispatch(getHouses())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Houses);