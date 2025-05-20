import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  mine: boolean = false;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.lobby$.subscribe((lobby) => {

    });
  }

}
