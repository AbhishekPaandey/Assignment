import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {tap, catchError} from 'rxjs/operators'
import {User} from './user'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  editFlag:boolean
  id:any
  userArray:User
  
  private userUrl='http://localhost:3000/user/'
  constructor(private http:HttpClient) { }

  
  getUser():Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
            // .pipe(
            //   tap(data=>console.log("user data ",JSON.stringify( data))
            //   ),
            //   catchError(this.handleError)
            // )
  }
  private handleError(err:HttpErrorResponse){
    let errorMessage='';
    if(err.error instanceof ErrorEvent){
      errorMessage=`An error occured : ${err.error.message}`
    } else{
      errorMessage=`Server returned code : ${err.status} ,erorr message is : ${err.message}`
    }
    console.error(errorMessage);
    return throwError(errorMessage)
    
  }

  postUser(user:User):Observable<User[]>{
    console.log("api is being hitted");
    
      return this.http.post<User[]>(this.userUrl,user)
             .pipe(
               tap(data=>console.log("response ",JSON.stringify(data))
               )
             )
  }
  deleteUser(id:number):Observable<User[]>{
   return this.http.delete<User[]>(this.userUrl+id)
    .pipe(
      tap(data=>console.log("response ",JSON.stringify(data))
      )
    )
  }

  getByUserId(id:number):Observable<User[]>{
    return this.http.get<User[]>(this.userUrl+id)
    .pipe(
      tap(data=>console.log("response ",JSON.stringify(data))
      )
    )
  }
  updateUser(user:any,id:number):Observable<User[]>{
    return this.http.put<any>(this.userUrl+id,user)
    .pipe(
      tap(data=>console.log("response ",JSON.stringify(data))
      )
    )
  }

}
