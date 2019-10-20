import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Subscription } from 'rxjs'

import { IdeasService } from '../ideas.service'
import { Idea } from '../idea.model'
import { mimeType } from './mime-type.validator'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-idea-create',
  templateUrl: './idea-create.component.html',
  styleUrls: ['./idea-create.component.css']
})
export class IdeaCreateComponent implements OnInit, OnDestroy {
  enteredTitle = ''
  enteredContent = ''
  idea: Idea
  isLoading = false
  form: FormGroup
  imagePreview: string
  private mode = 'create'
  private ideaId: string
  private authStatusSub: Subscription

  constructor(
    public ideasService: IdeasService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false
      })
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl(''),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      associated_hackathon: new FormControl(''),
      demo_link: new FormControl('', { validators: [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')] }),
      badge: new FormControl(''),
      stack_materials: new FormControl(''),
      labels: new FormControl(''),
      meta_tags: new FormControl(''),
      team_members: new FormControl('')
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('ideaId')) {
        this.mode = 'edit'
        this.ideaId = paramMap.get('ideaId')
        this.isLoading = true
        this.ideasService.getIdea(this.ideaId).subscribe(ideaData => {
          this.isLoading = false
          this.idea = {
            id: ideaData._id,
            title: ideaData.title,
            description: ideaData.description,
            category: ideaData.category,
            imagePath: ideaData.imagePath,
            creator: ideaData.creator,
            associated_hackathon: ideaData.associated_hackathon,
            demo_link: ideaData.demo_link,
            badge: ideaData.badge,
            stack_materials: ideaData.stack_materials,
            labels: ideaData.labels,
            meta_tags: ideaData.meta_tags,
            team_members: ideaData.team_members
          }
          this.form.setValue({
            title: this.idea.title,
            description: this.idea.description,
            category: ideaData.category,
            image: this.idea.imagePath,
            associated_hackathon: ideaData.associated_hackathon,
            demo_link: ideaData.demo_link,
            badge: ideaData.badge,
            stack_materials: ideaData.stack_materials,
            labels: ideaData.labels,
            meta_tags: ideaData.meta_tags,
            team_members: ideaData.team_members
          })
        })
      } else {
        this.mode = 'create'
        this.ideaId = null
      }
    })
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({ image: file })
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = <string>reader.result
    }
    reader.readAsDataURL(file)
  }

  onSaveIdea() {
    if (this.form.invalid) {
      return
    }
    this.isLoading = true
    if (this.mode === 'create') {
      this.ideasService.addIdea(
        this.form.value.title,
        this.form.value.description,
        this.form.value.category,
        this.form.value.image,
        this.form.value.associated_hackathon,
        this.form.value.demo_link,
        this.form.value.badge,
        this.form.value.stack_materials,
        this.form.value.labels,
        this.form.value.meta_tags,
        this.form.value.team_members
      )
    } else {
      this.ideasService.updateIdea(
        this.ideaId,
        this.form.value.title,
        this.form.value.description,
        this.form.value.category,
        this.form.value.image,
        this.form.value.associated_hackathon,
        this.form.value.demo_link,
        this.form.value.badge,
        this.form.value.stack_materials,
        this.form.value.labels,
        this.form.value.meta_tags,
        this.form.value.team_members
      )
    }
    this.form.reset()
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe()
  }
}
