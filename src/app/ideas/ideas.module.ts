import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { IdeaCreateComponent } from './idea-create/idea-create.component'
import { IdeaListComponent } from './idea-list/idea-list.component'
import { AngularMaterialModule } from '../angular-material.module'
import { MatOptionModule, MatSelectModule } from '@angular/material'
import { IdeaDetailsComponent } from './idea-details/idea-details.component'

@NgModule({
  declarations: [IdeaCreateComponent, IdeaListComponent, IdeaDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule
  ]
})
export class IdeasModule {}
