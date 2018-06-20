import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import {connect} from 'react-redux';

import {shareHouse,updateHouse} from '../../store/actions';

class ShareHouse extends Component {
    state={
        formElements:{
            title:{
                isValid:false,
                validityRules:{

                },
                value:""
            },
            description:{
                isValid:false,
                validityRules:{

                },
                value:""
            }
        }
    }
    componentDidMount(){
        console.log(this.props.house);
        if(this.props.house){
            this.setState(
                prevState=>{
                    return {
                        ...prevState,
                        formElements:{
                            ...prevState.formElements,
                            title:{
                                ...prevState.formElements.title,
                                value:this.props.house.title
                            },
                            description:{
                                ...prevState.formElements.description,
                                value:this.props.house.description
                            }
                        }
                    }
                }
            )
        }
    }
    onTextChangedHandler = (text,key) => {
        this.setState(prevState=>{
            return {
                ...prevState,
                formElements:{
                    ...prevState.formElements,
                    [key]:{
                        ...prevState.formElements[key],
                        value:text
                    }
                }
            }
        })
    }
    onSubmitHandler = () => {
        const house= {
            title:this.state.formElements.title.value,
            description:this.state.formElements.description.value
        }
        this.props.house?
        this.props.update(this.props.house.key,house):this.props.share(house);
        this.props.navigator.popToRoot();
    }

    render() {
        return (
            <View>
                <Text>Share Home Screen </Text>
                <TextInput onChangeText= {text=>this.onTextChangedHandler(text,"title")} placeholder="Başlık" value={this.state.formElements.title.value}/>
                <TextInput onChangeText= {text=>this.onTextChangedHandler(text,"description")} placeholder="Açıklama" value={this.state.formElements.description.value}/>
                <Button title="Paylaş" onPress={this.onSubmitHandler} />
            </View>
        );
    }
}

const mapStateToProps= state => {
    return {
        isLoading:state.ui.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        share:house=>dispatch(shareHouse(house)),
        update: (ref,newHouse) => dispatch(updateHouse(ref,newHouse))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShareHouse);