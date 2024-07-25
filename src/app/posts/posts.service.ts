import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getPosts() {
    this.http
      .get<{
        message: string;
        posts: [{ _id: string; title: string; content: string }];
      }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        }),
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      `http://localhost:3000/api/posts/${id}`,
    );
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content,
    };
    this.http
      .post<{
        message: string;
        postID: string;
      }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postID;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content,
    };
    this.http
      .put(`http://localhost:3000/api/posts/${id}`, post)
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIdx = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[oldPostIdx] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postID: string | null) {
    this.http
      .delete(`http://localhost:3000/api/posts/${postID}`)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => postID !== post.id);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
