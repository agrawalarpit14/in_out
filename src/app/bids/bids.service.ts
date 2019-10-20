import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'

import { environment } from '../../environments/environment'

const BACKEND_URL = environment.apiUrl + '/bid'

@Injectable({ providedIn: 'root' })
export class BidsService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllBidsByCreator () {
    return this.http.get(BACKEND_URL + '/getAllBidsByCreatorId').
    pipe(map((response: any) => response), catchError((error) => { throw error }))
  }

  getAllBidsByBidder () {
    return this.http.get(BACKEND_URL + '/getAllBidsByBidderId').
    pipe(map((response: any) => response), catchError((error) => { throw error }))
  }

  createBid (params: any) {
    return this.http.post(BACKEND_URL + '/', params).pipe(map((response: any) => response), catchError((error) => { throw error }))
  }

  acceptBid (id: string, params: any) {
    return this.http.put(BACKEND_URL + '/' + id, params).pipe(map((response: any) => response.data), catchError((error) => { throw error }))
  }
}
