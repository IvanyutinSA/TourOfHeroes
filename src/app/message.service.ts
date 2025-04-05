import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  messages$ = this.messagesSubject.asObservable();

  add(message: string) {
    this.messagesSubject.next([...this.messagesSubject.value, message]);
  }

  clear() {
    this.messagesSubject.next([]);
  }
}
