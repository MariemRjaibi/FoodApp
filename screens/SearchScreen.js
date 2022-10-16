import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

export default function SearchScreen() {
  const recipeList = recipes.map((data, i) => {
    return <RecipeCard key={i} recipe={data} />;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What do you want to eat today?</Text>
      <Text style={styles.subtitle}>Our daily healthy meal plans</Text>
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
  },
  subtitle: {
    fontWeight: '500',
    color: '#C6C6C6',
    marginLeft: 20,
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
