import { Observable } from 'rxjs';

export interface ApiService {
  sendMessage(data: User): Observable<HelloMessage>;
}

export interface User {
  name: string;
}

export interface HelloMessage {
  message: string;
}
