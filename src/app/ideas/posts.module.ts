import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IdeaCreateComponent } from './idea-create/idea-create.component';
import { IdeaListComponent } from './idea-list/idea-list.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [IdeaCreateComponent, IdeaListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class IdeasModule {}
