import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () => {
  const userID = useGetUserID();

  const [recipes, setRecipe] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipe(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/savedRecipes/id/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipe();
  }, []);
  const saveRecipe = async (recipeID: any) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };
  const isSaved = (recipeId: never) => savedRecipes.includes(recipeId);
  return (
    <div className="item">
      <div className="h2c">
        <h2>Recipes</h2>
      </div>
      <ul>
        <div className="items">
          {recipes.map((recipe) => (
            <li style={{ listStyleType: "none" }}>
              <div className="soo">
                <div className="card" style={{ width: "18rem;" }}>
                  <img
                    className="card-img-top"
                    src={recipe["imageUrl"]}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe["name"]}</h5>
                    <p className="card-text">{recipe["instructions"]}</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => saveRecipe(recipe["_id"])}
                      disabled={isSaved(recipe["_id"])}
                    >
                      {isSaved(recipe["_id"]) ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ height: "15px" }}></div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};
