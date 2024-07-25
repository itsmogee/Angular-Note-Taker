import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
  ],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub?: Subscription;
  isLoading = false;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
  }

  onDelete(postId: string | null) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }
}
