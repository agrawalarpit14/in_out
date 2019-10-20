import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'
import { BidsService } from '../bids/bids.service'

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  constructor(private bidsService: BidsService) {}
  public bidsMade: any
  public bidsRecieved: any
  displayedColumns: string[] = ['Product Name', 'Price', 'Approve', 'Reject']
  resultedColumns: string[] = ['Product Name', 'Status', 'Pay' ]
  public resultedSource
  public dataSource

  ngOnInit() {
    this.bidsService.getAllBidsByCreator().subscribe(bidsRecieved => {
        this.bidsRecieved = bidsRecieved
        this.resultedColumns = this.bidsRecieved.bids
        console.log(this.bidsRecieved)
    })
  }

  acceptBid(id) {
    console.log(id)
    this.bidsService.acceptBid(id, { approval: 1 }).subscribe(res => {
        console.log(res)
        this.ngOnInit()
    })
  }

  removeBid(id) {
    this.bidsService.acceptBid(id, { approval: 2 }).subscribe(res => {
        console.log(res)
        this.ngOnInit()
    })
  }
}
