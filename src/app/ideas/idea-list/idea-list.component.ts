import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { Idea } from '../idea.model';
import { IdeasService } from '../ideas.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.css']
})
export class IdeaListComponent implements OnInit, OnDestroy {
  // ideas = [
  //   { title: "First Idea", content: "This is the first idea's content" },
  //   { title: "Second Idea", content: "This is the second idea's content" },
  //   { title: "Third Idea", content: "This is the third idea's content" }
  // ];
  ideas: Idea[] = [];
  isLoading = false;
  totalIdeas = 0;
  ideasPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private ideasSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public ideasService: IdeasService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.ideasService.getIdeas(this.ideasPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.ideasSub = this.ideasService
      .getIdeaUpdateListener()
      .subscribe((ideaData: { ideas: Idea[]; ideaCount: number }) => {
        this.isLoading = false;
        this.totalIdeas = ideaData.ideaCount;
        this.ideas = ideaData.ideas;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.ideasPerPage = pageData.pageSize;
    this.ideasService.getIdeas(this.ideasPerPage, this.currentPage);
  }

  onDelete(ideaId: string) {
    this.isLoading = true;
    this.ideasService.deleteIdea(ideaId).subscribe(() => {
      this.ideasService.getIdeas(this.ideasPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.ideasSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
