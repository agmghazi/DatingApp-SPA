import { Component, Input, OnInit } from '@angular/core';

import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { Message } from './../../_models/message';
import { UserService } from './../../_services/user.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
@Input() userId: number;
messages: Message[];

  constructor(private userService: UserService,
    private authService: AuthService, private alertifyt: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

    loadMessages() {
      this.userService.getMessageThread(this.authService.decodedToken.nameid, this.userId).subscribe(messages => {
        this.messages = messages;
      }, error => {
        this.alertifyt.error(error);
      });
    }
}
