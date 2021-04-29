const axios = require("axios");

// if(!process.env.PORT) {
//   require("../Secrets");
// }


async function getRecipefromMealDB(id) {
  intId = parseInt(id);
  const URL = `www.themealdb.com/api/json/v1/1/lookup.php?i=${intId}`;
  
  const fallBackUrl = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&page=1&query=${name}`;

  const res = await axios.get(URL);
  const recipes = res.data.meals;
  if (recipes.length === 0) {
    return fallBackUrl;
  }

  return recipes[0];
}
module.exports = {
  getRecipe: getRecipefromMealDB,
};
