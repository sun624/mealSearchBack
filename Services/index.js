const axios = require("axios");

// if(!process.env.PORT) {
//   require("../Secrets");
// }

function getUID() {
  let uid = "";
  for (let i = 0; i < 6; i++) {
    const rand = Math.floor(Math.random() * 10);
    uid += rand;
  }

  return uid;
}

async function getImgfromMealDB(name) {
const URL=`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
;
const { meals } = data;

  const fallBackUrl =
    `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&page=1&query=${name}`;

  const res = await axios.get(URL);
  const recipes = res.data.meals;
  if (recipes.length === 0) {
    return fallBackUrl;
  }
  const rand = Math.floor(Math.random() * recipes.length);
  return recipes[rand].strMealThumb;
}
module.exports = {
  getUID,
  getPhoto: getImgfromMealDB,
};
