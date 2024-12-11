import './global.css'
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MotiView, MotiText} from 'moti';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export default function App() {
  const [showInputs, setShowInputs] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpEnabled, setIsSignUpEnabled] = useState(false);

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.2, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInputs(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showInputs) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showInputs]);

  useEffect(() => {
    setIsSignUpEnabled(email.length > 0 && password.length > 0);
  }, [email, password]);

  return (
    <LinearGradient
        className="flex-1 items-center justify-start bg-dark h-full flex"
        colors={['#8007d9', '#333']} // Gradient não usa Tailwind diretamente
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View className="mt-24 items-center">
          <MotiView
            from={{translateY: -100, opacity: 0}}
            animate={{translateY: 0, opacity: 1}}
            transition={{type: 'timing', duration: 1000}}>
            <Animated.View style={animatedStyle}>
              <MotiText className="text-2xl text-light">
                🚀 Aw3s0m3 Pr0j3ct 🚀
              </MotiText>
            </Animated.View>
          </MotiView>
        </View>
        <View className="flex-1 items-center justify-center w-full -top-20">
          {showInputs && (
            <>
              <MotiView
                from={{translateX: -100, opacity: 0}}
                animate={{translateX: 0, opacity: 1}}
                transition={{type: 'timing', duration: 1500}}
                className={`w-4/5 my-2 rounded-xl bg-light ${
                  isSignUpEnabled ? 'border-2 border-accent' : 'border border-muted'
                }`}>
                <TextInput
                  placeholder="📧 Email"
                  className="h-12 px-3 text-dark"
                  placeholderTextColor="#333"
                  value={email}
                  onChangeText={setEmail}
                />
              </MotiView>
              <MotiView
                from={{translateX: 100, opacity: 0}}
                animate={{translateX: 0, opacity: 1}}
                transition={{type: 'timing', duration: 1500}}
                className={`w-4/5 my-2 rounded-xl bg-light ${
                  isSignUpEnabled ? 'border-2 border-accent' : 'border border-muted'
                }`}>
                <TextInput
                  placeholder="🔒 Password"
                  className="h-12 px-3 text-dark"
                  placeholderTextColor="#333"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </MotiView>
            </>
          )}
          {showButtons && (
            <MotiView
              from={{translateY: 100, opacity: 0}}
              animate={{translateY: 0, opacity: 1}}
              transition={{type: 'timing', duration: 1500}}
              className="flex-row justify-between w-4/5 mt-5">
              <TouchableOpacity
                className={`flex-1 mx-1 rounded-lg border-2 ${
                  isSignUpEnabled
                    ? 'bg-primary border-light'
                    : 'bg-muted border-muted'
                }`}
                disabled={!isSignUpEnabled}>
                <View className="h-12 items-center justify-center">
                  <Text className="text-lg text-light">Sign Up ✍️</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 mx-1 bg-primary rounded-lg border-2 border-light">
                <View className="h-12 items-center justify-center">
                  <Text className="text-lg text-light">Sign In 🔑</Text>
                </View>
              </TouchableOpacity>
            </MotiView>
          )}
        </View>
      </LinearGradient>

  );
}
