import { Component } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-metrics',
  imports: [],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.css'
})
export class MetricsComponent {

  average: string = "-";
  median: string = "-";

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.lobby$.subscribe((lobby) => {
      if (lobby.revealed) {
        const votes = Object.values(lobby.players).map((player: any) => player.vote);
        this.average = this.socketService.calculateAverage(votes);
        this.median = this.socketService.calculateMedian(votes);
      } else {
        this.average = "-";
        this.median = "-";
      }
    });
  }
}
