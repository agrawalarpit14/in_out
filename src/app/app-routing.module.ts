import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { IdeaListComponent } from './ideas/idea-list/idea-list.component'
import { IdeaCreateComponent } from './ideas/idea-create/idea-create.component'
import { AuthGuard } from './auth/auth.guard'
import { AboutComponent } from './about/about.component'
import { IdeaDetailsComponent } from './ideas/idea-details/idea-details.component'
import { BidsComponent } from './bids/bids.component'
import { OffersComponent } from './offers/offers.component'
import { BountyComponent } from './bounty/bounty.component'
import { BountyCreateComponent } from './bounty-create/bounty-create.component'

const routes: Routes = [
  { path: '', component: IdeaListComponent },
  { path: 'create', component: IdeaCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:ideaId', component: IdeaCreateComponent, canActivate: [AuthGuard] },
  { path: 'view/:ideaId', component: IdeaDetailsComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'about', component: AboutComponent},
  { path: 'bids', component: BidsComponent},
  { path: 'offers', component: OffersComponent},
  { path: 'bounty', component: BountyComponent},
  { path: 'bounty-create', component: BountyCreateComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
