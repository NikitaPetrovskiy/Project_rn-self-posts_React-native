import React, { useState } from 'react';
import { 
    View, Text, StyleSheet, TextInput, Image, 
    Button, ScrollView, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';  

import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../theme';
import { addPost } from '../store/actions/post';


export const CreateScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const img = 'https://cdn.londonandpartners.com/visit/general-london/areas/river/76709-640x360-houses-of-parliament-and-london-eye-on-thames-from-above-640.jpg';

    const saveHandler = () => {
        const post = {
              date: new Date().toJSON(),
              text,
              img,
              booked: false
        };

        dispatch(addPost(post));
        navigation.navigate('Main');
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss }>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>
                        Создать новый пост
                    </Text>
                    <TextInput 
                        style={styles.textarea}
                        placeholder="Введите текст поста"
                        value={text}
                        onChangeText={setText}
                        multiline 
                    />
                    <Image 
                        style={styles.image}
                        source={{ 
                            uri: img
                        }} 
                    />
                    <Button 
                        title="Добавить пост" 
                        color={THEME.MAIN_COLOR}
                        onPress={saveHandler}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

CreateScreen.navigationOptions = ({navigation}) => ({
    headerTitle: "Создать пост",
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item 
                title="Toggle Drawer" 
                iconName="ios-menu"
                onPress={() => navigation.toggleDrawer()} 
            />
        </HeaderButtons>
    )
});

const styles  = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-regular',
        marginVertical: 10
    },
    textarea: {
        padding: 10,
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10
    }
});
