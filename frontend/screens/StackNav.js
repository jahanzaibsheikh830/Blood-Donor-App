import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Donors from './Donors'
import Profile from './Profile'

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator tabBarOptions={{
            style: { backgroundColor: "#dc143c" }, activeTintColor: '#ffffff',
            inactiveTintColor: '#fff', indicatorStyle: {
                backgroundColor: '#fff',
                height: '8%',
            },
        }}>
            <Tab.Screen name="Donors" component={Donors} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default MyTabs