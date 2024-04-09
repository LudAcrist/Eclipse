import { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

export default function App() {
  const moonAnimation = useRef(new Animated.Value(0)).current;
  const backgroundAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animateMoon = () => {
      Animated.timing(moonAnimation, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: false,
      }).start(() => {
        moonAnimation.setValue(0); // Reinicia el valor de la animación al finalizar
        animateMoon(); // Inicia la animación nuevamente
      });
    }

      const animateBG = () => {
        Animated.timing(backgroundAnimation, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: false,
        }).start(() => {
          backgroundAnimation.setValue(0); // Reinicia el valor de la animación al finalizar
          animateBG(); // Inicia la animación nuevamente
        });
    };

    animateMoon(); // Inicia la animación inicialmente
    animateBG();
  }, [moonAnimation, backgroundAnimation]);

  const moonLeft = moonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '90%']
  });

  const moonSize = moonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 78] // Tamaño inicial: 60, tamaño final: 78
  });

  const moonOpacity = moonAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0] // Opacidad inicial: 0, opacidad máxima: 1, opacidad final: 0
  });

  const moonColor = moonAnimation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['#828282', '#616161', '#000000', '#616161', '#828282'] // Colores ajustados para parecer más natural
  });

  // Ajustar el color de fondo según la posición de la luna
  const backgroundColor = backgroundAnimation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['#42A5F5','#1565C0', '#000000', '#1565C0' , '#42A5F5'] 
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.sky}>
        <Text style={styles.skyText}>
          Así se vivió el Eclipse este 2024
        </Text>
      </View>
      <Text style={styles.title}>Eclipse 🌒 - 8/04/24</Text>
      <View style={styles.sun} />
      <Animated.View
        style={[
          styles.moon,
          { left: moonLeft, width: moonSize, height: moonSize, opacity: moonOpacity, backgroundColor: moonColor }
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50 // Añadido para separar el título del borde superior
  },
  sky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skyText: {
    fontSize: 18,
    color: '#FFFFFF', // Texto blanco para contrastar con el fondo
  },
  title: {
    fontSize: 26, // Ajustado el tamaño de la letra
    position: 'absolute',
    top: 50,  // Alineado el título con el borde superior
    color: "white"
  },
  moon: {
    position: 'absolute',
    bottom: '50%',
    borderRadius: 62, 
    zIndex: 1,
  },
  sun: {
    position: 'absolute',
    bottom: '50%',
    width: 79,
    height: 79,
    borderRadius: 38,
    backgroundColor: '#FFEA00',
  },
});
