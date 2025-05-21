// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  socket: Socket;
  lobby$ = new BehaviorSubject<any>({players: Array<Object>, revealed: false});
  public socketId: string | undefined;

  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => { 
      this.socketId = this.socket.id;
     });
    this.socket.on('lobbyUpdate', (data) => this.lobby$.next(data));
  }

  join(name: string) {
    localStorage.setItem('playerName', name);
    this.socket.emit('join', name);
  }

  vote(value: string) {
    this.socket.emit('vote', value);
  }

  reveal() {
    this.socket.emit('reveal');
  }

  reset() {
    this.socket.emit('reset');
  }

  getSelfId() {
    if (!this.socketId) {
      console.error('Socket ID is undefined');
      return '';
    }
    return this.socketId;
  }

  getSelfName() {
    // Check if socketId is defined and lobby$ has a value
    if (!this.socketId) {
      console.error('Socket ID is undefined');
      return localStorage.getItem('playerName') || '';
    }
    const backendName = this.lobby$.getValue()?.players[this.socketId]?.name || '';
    const frontendName = localStorage.getItem('playerName') || '';
    if (backendName == '') {
      console.log("BN empty");
      return frontendName;
    } else if (frontendName == '') {
      console.log("FN empty");
      localStorage.setItem('playerName', backendName);
      return backendName;
    } else if(backendName == frontendName) {
      console.log("BN == FN");
      return frontendName;
    } else {
      console.log("ELSE");
      return frontendName;
    }
  }

  calculateAverage(votes: string[]): string {
    let total = 0;
    votes.forEach((vote) => {
      if (vote !== "?" && vote !== "∞" && vote !== "☕️" && vote !== "Keine" && vote !== "-" && vote !== null) {
        total += parseInt(vote);
        console.log("Total: ", total);
      }
    });
    if (total == 0) {
      return "-";
    }
    return Math.round(total / votes.length).toString();
  }

  calculateMedian(votes: string[]): string {
    let newVotes: number[] = [];
    votes.forEach((vote) => {
      if (vote !== "?" && vote !== "∞" && vote !== "☕️" && vote !== "Keine" && vote !== "-" && vote !== null) {
        newVotes.push(parseInt(vote));
      }
    });
    newVotes.sort((a, b) => a - b);
    if (newVotes.length == 0) {
      return "-";
    }
    return newVotes[Math.round(newVotes.length / 2) - 1].toString();
  }
}