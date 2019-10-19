import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { IdeasService } from '../ideas.service';
import { Idea } from '../idea.model';
import { mimeType } from './mime-type.validator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-idea-create',
  templateUrl: './idea-create.component.html',
  styleUrls: ['./idea-create.component.css']
})
export class IdeaCreateComponent implements OnInit, OnDestroy {
  enteredTitle = '';
  enteredContent = '';
  idea: Idea;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private ideaId: string;
  private authStatusSub: Subscription;

  constructor(
    public ideasService: IdeasService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('ideaId')) {
        this.mode = 'edit';
        this.ideaId = paramMap.get('ideaId');
        this.isLoading = true;
        this.ideasService.getIdea(this.ideaId).subscribe(ideaData => {
          this.isLoading = false;
          this.idea = {
            id: ideaData._id,
            title: ideaData.title,
            content: ideaData.content,
            imagePath: ideaData.imagePath,
            creator: ideaData.creator
          };
          this.form.setValue({
            title: this.idea.title,
            content: this.idea.content,
            image: this.idea.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.ideaId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result
    };
    reader.readAsDataURL(file);
  }

  onSaveIdea() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.ideasService.addIdea(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.ideasService.updateIdea(
        this.ideaId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
