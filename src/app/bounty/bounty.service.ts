import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'

import { environment } from '../../environments/environment'

const BACKEND_URL = environment.apiUrl + '/bounty'

@Injectable({ providedIn: 'root' })
export class BountyService {
  constructor(private http: HttpClient, private router: Router) {}

  get () {
    return this.http.get(BACKEND_URL + '/').
    pipe(map((response: any) => response), catchError((error) => { throw error }))
  }

  post (params: any) {
    return this.http.post(BACKEND_URL + '/', params).pipe(map((response: any) => response), catchError((error) => { throw error }))
  }

  del (id: string) {
    return this.http.delete(BACKEND_URL + '/' + id).pipe(map((response: any) => response), catchError((error) => { throw error }))
  }
}
