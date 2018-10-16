import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import { deleteHouse } from '../../store/actions/index';

class HouseDetail extends Component {

    toUpdateScreen = () => {
        this.props.navigator.push({
            screen:"evarkadasim.ShareHouse",
            title:"Evini Güncelle",
            passProps:{
                house:this.props.house
            },
            animated:false
        })
    }
    deleteHouse = () => {
        this.props.delete(this.props.house.key).then(()=>this.props.navigator.popToRoot())
    }
    render(){
        const {title,description,owner} = this.props.house; 
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View >
                    <Text >{description}</Text>
                </View>
                <Button title="SİL" onPress = {this.deleteHouse} />
                <Button title="GÜNCELLE" onPress = {this.toUpdateScreen} />
            </ScrollView>
        );
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        height:40
    },
    title:{
        fontSize:20,
        fontWeight:"bold"
    }
})

const mapDispatchToProps = dispatch => {
    return {
        delete : ref => dispatch(deleteHouse(ref))
    }
}

export default connect(null,mapDispatchToProps)(HouseDetail);