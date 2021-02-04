import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

import * as fromShoppingList from './store/shopping-list.reducer';
import * as SLActions from './store/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients!: Observable<{ ingredients: Ingredient[] }>;
  private igChangeSub!: Subscription;

  constructor(private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.slService.getIngredients();
    // this.igChangeSub = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients
    //   }
    // );

    this.loggingService.printLog('Hello from ShoppingListComponent');
  }

  onEditItem(index: number){
    //this.slService.startedEditing.next(index);
    this.store.dispatch(new SLActions.StartEdit(index));
  }

  ngOnDestroy(){
    //this.igChangeSub.unsubscribe();
  }

}
