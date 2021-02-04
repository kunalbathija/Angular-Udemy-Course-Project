import { EventEmitter, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

import * as SLActions from "../shopping-list/store/shopping-list.action";
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";


@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];

    // private recipes: Recipe[] = [
    //     new Recipe('Mushroom','Mushroom in gravy','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872',
    //     [
    //         new Ingredient('Mushroom',1),
    //         new Ingredient('Peas',15),
    //     ]),
    //     new Recipe('Mushroom Masala','Mushroom in gravy with masala','https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg',
    //     [
    //         new Ingredient('Mushroom',1),
    //         new Ingredient('Peas',15),
    //         new Ingredient('Masala',5)
    //     ])
    // ];

    constructor(private slService: ShoppingListService,
        private store: Store<fromShoppingList.AppState>){}

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        //this.slService.addIngredients(ingredients);
        this.store.dispatch(new SLActions.AddIngredients(ingredients))
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}