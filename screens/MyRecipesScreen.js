import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';

export default function MyRecipesScreen({ navigation }) {
  const favorites = useSelector((state) => state.favorites.value);

  const recipeList = favorites.map((data, i) => {
    return <RecipeCard key={i} recipe={data} isFavorite />;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The best ones...</Text>
      <ScrollView>
        <View style={styles.cards}>
          {recipeList}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 110,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#655074',
    marginLeft: 20,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    marginBottom: 20,
  },
  cards: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    alignContent: 'space-between',
  },
});
