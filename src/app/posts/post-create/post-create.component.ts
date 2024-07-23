import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent {
  newPost = 'No Content';
  enteredValue = '';

  onAddPost() {
    this.newPost = this.enteredValue;
  }
}
