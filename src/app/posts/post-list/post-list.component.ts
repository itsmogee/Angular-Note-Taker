import { Component } from '@angular/core';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  standalone: true,
  imports: [MatExpansionModule, MatAccordion],
})
export class PostListComponent {
  posts = [
    { title: 'First Post', content: "This is the first post's content" },
    { title: 'Second Post', content: "This is the second post's content" },
    { title: 'Third Post', content: "This is the third post's content" },
  ];
}
