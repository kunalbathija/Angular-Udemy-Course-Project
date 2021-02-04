import { Ingredient } from "../../shared/ingredient.model";
import * as SLActions from "./shopping-list.action";

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState {
    shoppingList: State
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
    ],
    editedIngredient: null as unknown as Ingredient,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState,
     action: SLActions.ShoppingListActions){
    switch(action.type) {
        case SLActions.ADD_INGREDIENT:   
            return {
                ...state, //new object with old data
                ingredients: [...state.ingredients, action.payload]
            };
        case SLActions.ADD_INGREDIENTS:   
            return {
                ...state, 
                ingredients: [...state.ingredients, ...action.payload]
            };
        
        case SLActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state, 
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null

            };

        case SLActions.DELETE_INGREDIENT:   
            return {
                ...state, 
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            };

        case SLActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            };

        case SLActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null as unknown as Ingredient,
                editedIngredientIndex: -1
            };

        default:
            return state;

    }
}