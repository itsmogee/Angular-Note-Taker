import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  NgForm,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { NgIf } from '@angular/common';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCardActions,
    NgIf,
    MatProgressSpinner,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postID: string;
  post: Post;
  isLoading = false;
  form: FormGroup;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postID')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.isLoading = true;
        this.postsService.getPost(this.postID).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
      } else {
        this.mode = 'create';
        this.postID = null;
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost(
        this.postID,
        this.form.value.title,
        this.form.value.content,
      );
    }
    this.form.reset();
  }
}
