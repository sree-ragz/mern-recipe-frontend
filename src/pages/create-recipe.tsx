import { FormEvent, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookie, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
  };
  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/recipes",
        recipe,
        { headers: { authorization: cookie.access_token } }
      );
      console.log(response.data);
      alert("successfully added recipe");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="formroot">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Recipe Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="eg.shawarma"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ingredients</label>
          <div className="button">
            <button
              type="button"
              className="btn btn-secondary btn-lg btn-block"
              onClick={addIngredient}
            >
              Add Incredient
            </button>
          </div>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              type="text"
              name="ingredient"
              key={index}
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <input
            type="textarea"
            className="form-control"
            name="instructions"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image Url</label>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Cooking Time</label>
          <input
            type="text"
            className="form-control"
            name="cookingTime"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
