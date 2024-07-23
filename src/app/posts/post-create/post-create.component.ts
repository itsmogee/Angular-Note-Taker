import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCardActions,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost() {
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent,
    };
    this.postCreated.emit(post);
  }
}
