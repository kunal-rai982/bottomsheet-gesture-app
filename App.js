/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {SceneMap, TabView} from 'react-native-tab-view';

const App = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);
  // ref
  const bottomSheetModalRef = useRef(null);
  const [bottomSheetToggle, setBottomSheetToggle] = useState(0);

  const handlePresentModalPress = () => {
    // console.log(bottomSheetModalRef.current);
    bottomSheetModalRef.current?.snapToIndex(1);
  };
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setBottomSheetToggle(index);
  }, []);

  const FirstRoute = () => (
    <BottomSheetScrollView
      bounces={false}
      scrollEnabled={bottomSheetToggle === 1 ? true : false}
      style={styles.contentContainer}>
      {/* <PanGestureHandler onGestureEvent={ec => handleGesture(ec.nativeEvent.x)}> */}
      <View>
        <Text>
          What did you love about this place? What is a must do/have/eat/or see?
          the secret off-menu cocktail or best table?
        </Text>
        {[2, 3, 3, 2, 2, 2, 3, 2, 3, 2, 5]?.map((e, i) => {
          return (
            <View key={i + Math.random()}>
              <Text>Add a comment</Text>
              <Text>
                What did you love about this place? What is a must
                do/have/eat/or see? the secret off-menu cocktail or best table?
              </Text>
              <Text>Add a comment</Text>
              <Text>
                What did you love about this place? What is a must
                do/have/eat/or see? the secret off-menu cocktail or best table?
              </Text>
              <Text>Add a comment</Text>
              <Text>
                What did you love about this place? What is a must
                do/have/eat/or see? the secret off-menu cocktail or best table?
              </Text>
              <Text>Add a comment</Text>
              <Text>
                What did you love about this place? What is a must
                do/have/eat/or see? the secret off-menu cocktail or best table?
              </Text>
              <Text>Add a comment</Text>
              <Text>
                What did you love about this place? What is a must
                do/have/eat/or see? the secret off-menu cocktail or best table?
              </Text>
            </View>
          );
        })}
      </View>
      {/* </PanGestureHandler> */}
    </BottomSheetScrollView>
  );
  const handleGesture = evt => {
    const {nativeEvent} = evt;
    console.log('first', nativeEvent.velocityX);
    if (nativeEvent.velocityX > 0) {
      // console.log('Swipe right');
    } else {
      // console.log('Swipe left');
    }
  };

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#673ab7'}} />
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  // renders
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <Button
              onPress={handlePresentModalPress}
              title="Present Modal"
              color="black"
            />

            <BottomSheet
              ref={bottomSheetModalRef}
              handleIndicatorStyle={{height: 0}}
              index={1}
              snapPoints={['40%', '90%']}
              onChange={handleSheetChanges}>
              <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
                onSwipeStart={eve => console.log('ss', eve)}
              />
            </BottomSheet>
          </View>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'pink',
  },
});

export default App;
