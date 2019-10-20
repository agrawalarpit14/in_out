import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { BidsService } from './bids.service'

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css']
})
export class BidsComponent implements OnInit {
  constructor(private bidsService: BidsService) {}
  public bidsMade: any
  public bidsRecieved: any
  displayedColumns: string[] = ['Product Name', 'Price', 'Approve', 'Reject']
  resultedColumns: string[] = ['Product Name', 'Price', 'Status', 'Pay' ]
  // form: FormGroup
  public resultedSource
  public dataSource
  public order_id
  public hiddenControl: FormControl = new FormControl('')

  ngOnInit() {
    this.bidsService.getAllBidsByBidder().subscribe(bidsmade => {
        this.bidsMade = bidsmade
        this.dataSource = this.bidsMade.bids
        console.log(this.bidsMade)
    })

    this.order_id = Math.floor(Math.random() * 100000).toString()
    // this.bidsService.getAllBidsByCreator().subscribe(bidsRecieved => {
    //     this.bidsRecieved = bidsRecieved
    //     this.resultedColumns = this.bidsRecieved.bids
    //     console.log(this.bidsRecieved)
    // })
  }

  acceptBid(id) {
    console.log(id)
    this.bidsService.acceptBid(id, { approval: 1 }).subscribe(res => {
        console.log(res)
    })
  }

  removeBid(id) {
    this.bidsService.acceptBid(id, { approval: 2 }).subscribe(res => {
        console.log(res)
    })
  }
  openConfirmation() {
    //
  }
}
// }
