import {Component, inject} from "@angular/core";
import {MessagesService} from "./messages.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  imports: [
    NgClass
  ]
})
export class MessagesComponent {

  messageSrv = inject(MessagesService);

  message = this.messageSrv.message;

  onClose() {
    this.messageSrv.clear();
  }
}
