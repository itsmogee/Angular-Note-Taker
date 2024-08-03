import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  standalone: true,
  imports: [
    RouterLink,
    MatExpansionModule,
    MatAccordion,
    NgFor,
    NgIf,
    MatButtonModule,
    MatProgressSpinner,
    MatPaginator,
  ],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub?: Subscription;
  isLoading = false;
  totalPosts = 0; // Total amount of posts we have
  postsPerPage = 1;
  currPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userID: string;
  private authStatusSub: Subscription;

  UserisAuthenticated = false;
  postsService = inject(PostsService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currPage);
    this.userID = this.authService.getUserID();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
        this.isLoading = false;
      });
    this.UserisAuthenticated = this.authService.getIsAuth();

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.UserisAuthenticated = isAuthenticated;
        this.userID = this.authService.getUserID();
      });
  }

  onDelete(postId: string | null) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currPage);
    });
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
    this.authStatusSub?.unsubscribe();
  }

  onChangedPage(event: PageEvent) {
    this.isLoading = true;
    this.currPage = event.pageIndex + 1;
    this.postsPerPage = event.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currPage);
  }
}
