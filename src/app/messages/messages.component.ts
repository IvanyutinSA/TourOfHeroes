import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  constructor(public messageService: MessageService) {}

}
