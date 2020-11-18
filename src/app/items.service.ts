import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItemsBasic(){
    return [
      {
        id: 1,
        title: 'Item 1'
      },
      {
        id: 2,
        title: 'Item 2'
      }
    ];
	}

	getItemsFromApi(): Observable<object> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/todos', httpOptions);
	}
}
