import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessagesService} from "../messages/messages.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'login',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authSrv = inject(AuthService);
  router = inject(Router);
  messagesSrv = inject(MessagesService);

  fb = inject(FormBuilder);
  form = this.fb.group({
    email: [''],
    password: ['']
  })

  async onLogin() {
    try {
      const {email, password} = this.form.value;
       if (!email || !password) {
         this.messagesSrv.showMessage(
           "Enter an email and password",
           "info"
         )
         return;
       }

       await this.authSrv.login(email, password);
       await this.router.navigate(['/home']);

    }
    catch (err) {
      console.log(err);
      this.messagesSrv.showMessage(
        "Loagin Failed, Please try again later.",
        "error"
      )
    }
  }
}
