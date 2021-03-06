/*** ANGULAR IMPORTS ***/
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
/*** APP IMPORTS ***/
import { Project } from 'config/interfaces';
import { ProjectsService } from 'services/projects.service';

@Component({
  selector: 'app-project.project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {
  project_id: number;
  project: Project;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.getParam();
    this.getProject();
  }

  getParam(): void {
    this.activatedRoute.params.subscribe(params => {
      this.project_id = params.id;
    });
  }

  getProject(): void {
    this.projectsService.getProject(this.project_id)
      .subscribe(
        data => this.project = data,
        (error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            console.log('An error occurred:', error.error.message);
          } else {
            switch (error.status) {
              case 404: {
                console.log('There is no project with given id');
              } break;
              default: {
                console.log('We encountered an unknown error');
              }
            }
          }
        }
      );
  }
}
