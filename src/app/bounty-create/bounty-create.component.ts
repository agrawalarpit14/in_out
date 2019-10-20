import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { BountyService} from './../bounty/bounty.service'
import { Router } from '@angular/router'

@Component({
  templateUrl: './bounty-create.component.html',
  styleUrls: ['./bounty-create.component.css']
})
export class BountyCreateComponent implements OnInit {
    public titleControl: FormControl = new FormControl('', [Validators.required])
    public priceControl: FormControl = new FormControl('', [Validators.required])
    public descriptionControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(80)])

  constructor(private bountyService: BountyService, private router: Router) {}

  ngOnInit() {
    //
  }

  saveBounty() {
    const bounty = {
        title: this.titleControl.value,
        price: this.priceControl.value,
        description: this.descriptionControl.value
    }
    this.bountyService.post(bounty).subscribe(res => {
        console.log(res)
        this.router.navigate(['/bounty'])
    })
  }
}
