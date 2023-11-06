import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'order', component: OrderComponent }, // Add this line
  { path: '', component: ProductListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
