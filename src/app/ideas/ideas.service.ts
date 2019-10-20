import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

import { environment } from '../../environments/environment'
import { Idea } from './idea.model'

const BACKEND_URL = environment.apiUrl + '/ideas/'

@Injectable({ providedIn: 'root' })
export class IdeasService {
  private ideas: Idea[] = []
  private ideasUpdated = new Subject<{ ideas: Idea[]; ideaCount: number }>()

  constructor(private http: HttpClient, private router: Router) {}

  getIdeas(ideasPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${ideasPerPage}&page=${currentPage}`
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
                description: idea.description,
                category: idea.category,
                imagePath: idea.imagePath,
                creator: idea.creator,
                associated_hackathon: idea.associated_hackathon,
                demo_link: idea.demo_link,
                badge: idea.badge,
                stack_materials: idea.stack_materials,
                labels: idea.labels,
                meta_tags: idea.meta_tags,
                id: idea._id,
                team_members: idea.team_members
              }
            }),
            maxIdeas: ideaData.maxIdeas
          }
        })
      )
      .subscribe(transformedIdeaData => {
        this.ideas = transformedIdeaData.ideas
        this.ideasUpdated.next({
          ideas: [...this.ideas],
          ideaCount: transformedIdeaData.maxIdeas
        })
      })
  }

  getIdeaUpdateListener() {
    return this.ideasUpdated.asObservable()
  }

  getIdea(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      description: string;
      category: string;
      imagePath: string;
      creator: string;
      associated_hackathon: string;
      demo_link: string;
      badge: string;
      stack_materials: string[];
      labels: string[];
      meta_tags: string[];
      team_members: string[];
    }>(BACKEND_URL + id)
  }
  addIdea(title: string, description: string,
    category: string, image: File, associated_hackathon: string,
    demo_link: string, badge: string, stack_materials: string[],
    labels: string[], meta_tags: string[], team_members: string[]) {
    const ideaData = new FormData()
    ideaData.append('title', title)
    ideaData.append('description', description)
    ideaData.append('category', category)
    ideaData.append('image', image, title)
    ideaData.append('associated_hackathon', associated_hackathon)
    ideaData.append('demo_link', demo_link)
    ideaData.append('badge', badge)
    ideaData.append('stack_materials', stack_materials.toString())
    ideaData.append('labels', labels.toString())
    ideaData.append('meta_tags', meta_tags.toString())
    ideaData.append('team_members', team_members.toString())
    this.http
      .post<{ message: string; idea: Idea }>(
        BACKEND_URL,
        ideaData
      )
      .subscribe(responseData => {
        this.router.navigate(['/'])
      })
  }

  updateIdea(id: string, title: string,
    description: string, image: File | string,
    category: string, associated_hackathon: string,
    demo_link: string, badge: string,
    stack_materials: string[], labels: string[], meta_tags: string[], team_members: string[]) {
    let ideaData: Idea | FormData
    if (typeof image === 'object') {
      ideaData = new FormData()
      ideaData.append('id', id)
      ideaData.append('title', title)
      ideaData.append('description', description)
      ideaData.append('category', category)
      ideaData.append('image', image, title)
      ideaData.append('associated_hackathon', associated_hackathon)
      ideaData.append('demo_link', demo_link)
      ideaData.append('badge', badge)
      ideaData.append('stack_materials', stack_materials.toString())
      ideaData.append('labels', labels.toString())
      ideaData.append('meta_tags', meta_tags.toString())
      ideaData.append('team_members', team_members.toString())
    } else {
      ideaData = {
        id: id,
        title: title,
        description: description,
        category: category,
        imagePath: image,
        creator: null,
        associated_hackathon: associated_hackathon,
        demo_link: demo_link,
        badge: badge,
        stack_materials: stack_materials,
        labels: labels,
        meta_tags: meta_tags,
        team_members: team_members
      }
    }
    this.http
      .put(BACKEND_URL + id, ideaData)
      .subscribe(response => {
        this.router.navigate(['/'])
      })
  }

  deleteIdea(ideaId: string) {
    return this.http.delete(BACKEND_URL + ideaId)
  }
}
