import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { IdeaListComponent } from './ideas/idea-list/idea-list.component'
import { IdeaCreateComponent } from './ideas/idea-create/idea-create.component'
import { AuthGuard } from './auth/auth.guard'
import { AboutComponent } from './about/about.component'

const routes: Routes = [
  { path: '', component: IdeaListComponent },
  { path: 'create', component: IdeaCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:ideaId', component: IdeaCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'about', component: AboutComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
