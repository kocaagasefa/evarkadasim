import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

class HouseListItem extends Component {

    render () {
        const {title,id,description,ownerData} = this.props.house;
        return (
            <TouchableOpacity onPress={()=>this.props.itemPressed(this.props.house)} >
                <View style = {styles.container} >
                    <Text>{ownerData.email+"-"+title+"-"+description} </Text>
                </View>
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        borderColor:"#eee",
        borderWidth:1,
        padding:5,
        height :50,
        flex:1,
        justifyContent:"center"
    }
});

export default HouseListItem;