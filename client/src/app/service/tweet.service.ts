import { Http, Headers ,Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';


@Injectable()
export class TweetService {
  constructor(
    private _http : Http ,
    private _userService : UserService ){};

  // connect socket.io to get tweets
  io = io( environment.url );



  // emit new msg with tweet event
  SentTweet(tweet){
    this.io.emit('tweet' , tweet);
  };
  


  // get new msg with tweet event
  // from any user
  getTweet():Observable<any>{
    return new Observable( observable => {
      this.io.on('tweet'  , (tweet) => {
        observable.next(tweet);
      });
    });
  };
 


  // get all tweets from api
  getTweets(){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.get(environment.url + "/api/tweets" , {headers : headers})
      .map((res:Response) => res.json())
  }



  // get user data from api
  getUser(){
    return this._userService.getUser();
  }; 

};
