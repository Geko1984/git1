import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../classes/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  title = 'Users';
  users: User[] = [];
  @Output('updateUser') updateUser = new EventEmitter<User>();

  constructor(private userService: UserService) {


  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      response=>this.users=response['data']
  );
  }

  onDeleteUser(user: User) {
    const deleteUser=confirm('Vuoi davvero cancellare l\'utente ' + user.name + ' '+ user.lastname);
    if(deleteUser){
    this.userService.deleteUser(user).subscribe(
      response => {
          const idx=this.users.indexOf(user);
          this.users.splice(idx,1);
          alert(response['message']);

      }
    );
  }
    }

  onSelectUser(user: User) {
    const userCopy = Object.assign({}, user);
    this.updateUser.emit(userCopy);
  }
}
