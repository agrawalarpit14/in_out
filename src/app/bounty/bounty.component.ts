import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'
import { BountyService } from './bounty.service'
import { AuthService } from '../auth/auth.service'

@Component({
  templateUrl: './bounty.component.html',
  styleUrls: ['./bounty.component.css']
})
export class BountyComponent implements OnInit, OnDestroy {
  constructor(private bountyService: BountyService, private authService: AuthService) {}
  public bounties: any
  userIsAuthenticated = false
  userId: string
  private authStatusSub: Subscription

  ngOnInit() {
    this.userId = this.authService.getUserId()
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
        this.userId = this.authService.getUserId()
      })
    this.bountyService.get().subscribe(bounties => {
        console.log(bounties)
        this.bounties = bounties.bounties
    })
  }

  onDelete(id) {
      this.bountyService.del(id).subscribe(res => {
          console.log(res)
          this.ngOnInit()
      })
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe()
  }
}
