import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {Favorite} from './models/favorite';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  data: Object[];
  favorites: Favorite[] = [];
  url = 'https://s3.eu-west-2.amazonaws.com/alfresco-adf-app-test/favorites.json';

  constructor(private http: Http) {
    this.getJson(this.url).subscribe(res => {
        this.data = res.json();

        for (const entry of this.data['list']['entries']) {
          const target = entry['entry']['target'];
          if (target['file']) {
            this.favorites.push(new Favorite(target['file']['name'], 'file'));
          } else {
            this.favorites.push(new Favorite(target['folder']['name'], 'folder'));
          }
        }
    });
  }

  public getJson(url: string): Observable<any> {
    return this.http.get(url);
  }
}
