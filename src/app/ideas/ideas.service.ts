import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Idea } from './idea.model';

const BACKEND_URL = environment.apiUrl + '/ideas/';

@Injectable({ providedIn: 'root' })
export class IdeasService {
  private ideas: Idea[] = [];
  private ideasUpdated = new Subject<{ ideas: Idea[]; ideaCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getIdeas(ideasPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${ideasPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; ideas: any; maxIdeas: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(ideaData => {
          return {
            ideas: ideaData.ideas.map(idea => {
              return {
                title: idea.title,
                content: idea.content,
                id: idea._id,
                imagePath: idea.imagePath,
                creator: idea.creator
              };
            }),
            maxIdeas: ideaData.maxIdeas
          };
        })
      )
      .subscribe(transformedIdeaData => {
        this.ideas = transformedIdeaData.ideas;
        this.ideasUpdated.next({
          ideas: [...this.ideas],
          ideaCount: transformedIdeaData.maxIdeas
        });
      });
  }

  getIdeaUpdateListener() {
    return this.ideasUpdated.asObservable();
  }

  getIdea(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addIdea(title: string, content: string, image: File) {
    const ideaData = new FormData();
    ideaData.append('title', title);
    ideaData.append('content', content);
    ideaData.append('image', image, title);
    this.http
      .post<{ message: string; idea: Idea }>(
        BACKEND_URL,
        ideaData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updateIdea(id: string, title: string, content: string, image: File | string) {
    let ideaData: Idea | FormData;
    if (typeof image === 'object') {
      ideaData = new FormData();
      ideaData.append('id', id);
      ideaData.append('title', title);
      ideaData.append('content', content);
      ideaData.append('image', image, title);
    } else {
      ideaData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put(BACKEND_URL + id, ideaData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteIdea(ideaId: string) {
    return this.http.delete(BACKEND_URL + ideaId);
  }
}
