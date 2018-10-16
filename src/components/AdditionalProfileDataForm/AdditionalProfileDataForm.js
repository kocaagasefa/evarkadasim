import React, {Component} from 'react';
import {
    ScrollView
} from 'react-native';

class AdditionalProfileDataForm extends Component {
    state={
        formElements:{
            name:{
                value:null,
                isValid:false,
                validationRules:{
                    minLength:2
                }
            },
            gender:{
                value:null,
                isValid:false,
                validationRules:{
                    required:true
                }
            },
            age:{
                value:null,
                isValid:false,
                validationRules:{
                    required:true
                }
            },
            job:{
                value:null,
                isValid:false,
                validationRules:{

                }
            },
            cigarette:{
                value:null,
                isValid:false,
                validationRules:{

                }
            },
            alcohol:{
                value:null,
                isValid:false,
                validationRules:{

                }
            }
        }
    }
    render(){
        return (
            <ScrollView>
                

            </ScrollView>
        )
    }
}

export default AdditionalProfileDataForm;