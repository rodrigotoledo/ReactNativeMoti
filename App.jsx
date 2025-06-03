import './global.css'
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, Linking, Image} from 'react-native';
import { TextInput , ActivityIndicator} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {MotiView, MotiText} from 'moti';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import axios from 'axios';
import { NEWSDATA_KEY } from '@env';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  const [showInputs, setShowInputs] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpEnabled, setIsSignUpEnabled] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(NEWSDATA_KEY);
    if (showButtons) {
      const fetchNews = async () => {
        try {
          setLoading(true);
          const response = await axios.get('https://newsdata.io/api/1/latest', {
            params: {
              apikey: NEWSDATA_KEY,
              q: 'mental health',
            },
          });
          setNews(response.data.results || []);
        } catch (error) {
          console.error('Error fetching news:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchNews();
    }
  }, [showButtons]);

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
  }, [scale]);

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

  const renderItem = ({ item }) => (
    <View className="p-4 m-2 border border-light rounded-md w-full">
      {/* Imagem da Notícia */}
      {item.image_url && (
        <View className="mb-4 rounded-lg overflow-hidden">
          <Image
            source={{ uri: item.image_url }}
            className="w-full h-48"
            resizeMode="cover"
          />
        </View>
      )}

      {/* Título e Descrição */}
      <Text className="text-lg font-bold text-white mb-2">{item.title}</Text>
      <Text className="text-sm text-light mb-2">
        {item.description?.length > 100
          ? `${item.description.substring(0, 100).trim()}...`
          : item.description}
      </Text>

      {/* Fonte e Ícone */}
      <View className="flex-row items-center mb-4">
        {item.source_icon && (
          <Image
            source={{ uri: item.source_icon }}
            className="w-6 h-6 rounded-full mr-2"
          />
        )}
        <Text className="text-xs text-light">{item.source_name}</Text>
      </View>

      {/* Botão para abrir o link */}
      <TouchableOpacity
        onPress={() => Linking.openURL(item.link)}
        className="mt-2 p-2 bg-primary rounded-lg"
      >
        <Text className="text-light text-center">Go to Article</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <PaperProvider>
      <LinearGradient
        className="flex-1 items-center justify-start bg-dark h-full flex"
        colors={['#8007d9', '#333']} // Gradient não usa Tailwind diretamente
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View className="mt-24 items-center w-full">
          <MotiView
            from={{translateY: -100, opacity: 0}}
            animate={{translateY: 0, opacity: 1}}
            transition={{type: 'timing', duration: 1000}}>
            <Animated.View style={animatedStyle}>
              <MotiText className="text-2xl text-light mb-10">
                🚀 Aw3s0m3 Pr0j3ct 🚀
              </MotiText>
            </Animated.View>
          </MotiView>
        </View>
        <View className="flex-1 items-center justify-center w-full">
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
                  label="📧 Email"
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
                  label="🔒 Password"
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

            <View className="flex-1 items-center justify-center w-full">
            {loading ? (
              <ActivityIndicator animating={true} size="large" color="#FFF" />
            ) : (
              <FlatList
                data={news}
                keyExtractor={(item) => item.article_id}
                renderItem={renderItem}
                scrollIndicatorInsets={{ right: 8 }}
                contentContainerStyle={{ paddingRight: 20 }}
                className="flex-1 mt-10 w-full"
              />
            )}
          </View>
        </View>
      </LinearGradient>
    </PaperProvider>
  );
}
