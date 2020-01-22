import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { DATA } from '../data';
import { Post } from '../components/Post';

export const BookedScreen = ({navigation}) => {
    const openPostHandler = post => {
        navigation.navigate('Post', { 
            postId: post.id,
            date: post.date,
            booked: post.booked
        });
    }
    
    return (
        <View style={styles.wrapper}>
            <FlatList 
                data={DATA.filter(post => post.booked)} 
                keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => <Post post={item} onOpen={openPostHandler} />}
            />
        </View>
    );
}

BookedScreen.navigationOptions = {
    headerTitle: "Избранные",
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item 
                title="Toggle Drawer" 
                iconName="ios-menu"
                onPress={() => console.log('Press menu')} 
            />
        </HeaderButtons>
    )
}

const styles  = StyleSheet.create({
    wrapper: {
        padding: 10
    }
});
