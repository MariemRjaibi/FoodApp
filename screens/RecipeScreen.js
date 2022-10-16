import { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { favorite, unfavorite, updateServings } from '../reducers/favorites';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function RecipeScreen({ navigation, route: { params: { recipe } } }) {
  const { top } = useSafeAreaInsets();

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);
  const isFavorite = favorites.some(favorite => favorite.id === recipe.id);

  const [servingNb, setServingNb] = useState(recipe.servingNb);

  const incrementServings = () => {
    setServingNb(servingNb + 1);

    if (isFavorite) {
      dispatch(updateServings({ id: recipe.id, servingNb: servingNb + 1 }));
    }
  };

  const decrementServings = () => {
    if (servingNb > 1) {
      setServingNb(servingNb - 1);

      if (isFavorite) {
        dispatch(updateServings({ id: recipe.id, servingNb: servingNb - 1 }));
      }
    }
  };

  const handlePress = () => {
    if (isFavorite) {
      dispatch(unfavorite(recipe.id));
    } else {
      dispatch(favorite({ ...recipe, servingNb }));
    }
  };

  const ingredients = recipe.ingredients.map((ingredient, i) => {
    return (
      <View key={i} style={styles.menuContainer}>
        <View style={styles.ingredientWrapper}>
          <Text style={styles.menuSubtitle}>{ingredient.name}</Text>
          <Text style={styles.menuSubtitle}>{ingredient.amount * servingNb}{ingredient.unit && ` ${ingredient.unit}`}</Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ ...styles.navigateButton, top: top + 10 }}>
        <Ionicons name="ios-arrow-back" size={25} color="#655074" />
      </TouchableOpacity>

      <View style={{ ...styles.imageContainer, height: 260 + top }}>
        <View style={{ ...styles.imageWrapper, backgroundColor: recipe.color }}>
          <Image source={recipe.image} style={{ ...styles.image, marginTop: top }} resizeMode="contain" />
        </View>
      </View>

      <View style={{ ...styles.contentContainer, backgroundColor: recipe.color }}>
        <View style={styles.contentWrapper}>
          <TouchableOpacity style={styles.addButton} onPress={handlePress}>
            <Ionicons
              name={isFavorite ? "bookmark" : "bookmark-outline"}
              size={20}
              color="#ffffff"
            />
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <Ionicons name="ios-speedometer-outline" size={24} color={recipe.color} style={styles.iconContent} />
              <Text style={styles.iconText}>{recipe.level}</Text>
            </View>
            <View>
              <Ionicons name="md-timer-sharp" size={24} color={recipe.color} style={styles.iconContent} />
              <Text style={styles.iconText}>{recipe.time}</Text>
            </View>
            <View>
              <Ionicons name="star-outline" size={20} color={recipe.color} style={styles.iconContent} />
              <Text style={styles.iconText}>{recipe.rating}</Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{recipe.name}</Text>
            <Text style={styles.contentText}>{recipe.longDesc}</Text>
          </View>

          <View style={{ ...styles.menuContainer, marginBottom: 10 }}>
            <View>
              <Text style={styles.menuTitle}>
                Ingredients
              </Text>
              <Text style={styles.menuSubtitle}>
                How many servings?
              </Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button} onPress={decrementServings}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{servingNb}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={incrementServings}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {ingredients}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '70%',
  },
  imageContainer: {
    backgroundColor: 'white',
    width: '100%',
    position: 'relative',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 120,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  contentContainer: {
    height: '65%',
    width: '100%',
  },
  contentWrapper: {
    borderTopRightRadius: 120,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    padding: 30,
    position: 'relative',
    paddingTop: 55,
  },
  content: {
    width: '100%',
    display: 'flex',
    marginBottom: 20,
  },
  title: {
    color: '#46494c',
    fontSize: 36,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  contentText: {
    color: '#4e5155',
    fontSize: 12,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25,
    paddingRight: 10,
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  iconContent: {
    textAlign: 'center',
  },
  iconText: {
    fontWeight: 'bold',
    color: '#46494c',
    textAlign: 'center'
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 3,
  },
  menuTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#46494c'
  },
  menuSubtitle: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#8a8e93',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '2px solid rgba(0, 0, 0, 0.05)',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#655074',
  },
  button: {
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0, 0, 0, 0.01)',
    borderBottomWidth: 1,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  navigateButton: {
    position: 'absolute',
    left: 15,
    zIndex: 2,
  },
  addButton: {
    position: 'absolute',
    top: -15,
    right: 25,
    borderRadius: 50,
    backgroundColor: '#655074',
    padding: 20,
  },
});
