import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
export const SavedRecipe = () => {
  const userID = useGetUserID();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSavedRecipe();
  }, []);

  return (
    <div className="item">
      <div className="h2c">
        <h2>Saved Recipes</h2>
      </div>
      <ul>
        <div className="items">
          {savedRecipes.map((recipe) => (
            <li style={{ listStyleType: "none" }}>
              <div className="soo">
                <div className="card" style={{ width: "18rem;" }}>
                  <img
                    className="card-img-top"
                    src={recipe.imageUrl}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.name}</h5>
                    <p className="card-text">{recipe.instructions}</p>
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
