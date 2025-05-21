import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ExistingUserComponent } from "./existing-user/existing-user.component";
import { NewUserComponent } from "./new-user/new-user.component";

const routes=[
    {path:'signup',component:ExistingUserComponent},
    {path:'login',component:NewUserComponent},
    { path: '**', redirectTo: 'signup' }
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PaymentRouterModule{}