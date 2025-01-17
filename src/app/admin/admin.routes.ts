import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PostCategoryComponent } from "./components/post-category/post-category.component";

export const ADMIN_ROUTES: Routes = [
    {path: '', component: AdminComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'category', component: PostCategoryComponent}
]