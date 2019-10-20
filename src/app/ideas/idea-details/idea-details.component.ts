import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'

import { IdeasService } from '../ideas.service'
import { Idea } from '../idea.model'
import { AuthService } from '../../auth/auth.service'
import { BidsService } from 'src/app/bids/bids.service'


@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.css']
})
export class IdeaDetailsComponent implements OnInit, OnDestroy {

  ideaId: any
  idea: Idea
  isLoading = false
  totalIdeas = 0
  ideasPerPage = 2
  currentPage = 1
  pageSizeOptions = [1, 2, 5, 10]
  userIsAuthenticated = false
  userId: string
  private ideasSub: Subscription
  private authStatusSub: Subscription
  public priceBar: FormControl = new FormControl('', [Validators.required])
  constructor(
    public ideasService: IdeasService,
    public bidsService: BidsService,
    public route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.userId = this.authService.getUserId()
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.userIsAuthenticated = authStatus
        this.userId = this.authService.getUserId()
        console.log(this.userIsAuthenticated, this.userId)
      })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('ideaId')) {
          this.ideaId = paramMap.get('ideaId')
          // this.isLoading = true
          this.ideasService.getIdea(this.ideaId).subscribe(ideaData => {
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
          console.log(this.idea)
          this.isLoading = false
        })
        } else {
            console.log('Route opened with incorrect rules.')
        //   this.mode = 'create'
        }
      })
    }

    makeOffer(id, title) {
      const bidDetails = {
        ideaId: id,
        title: title,
        price: this.priceBar.value
      }
      this.bidsService.createBid(bidDetails).subscribe(res => {
        console.log(res)
        this.router.navigate(['/bids'])
      })
    }

    ngOnDestroy() {
      this.authStatusSub.unsubscribe()
    }
  }

