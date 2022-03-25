import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Player } from 'player';
import { PlayerService } from 'player.service';

@Component({
  selector: 'app-player-data',
  templateUrl: './player-data.component.html',
  styleUrls: ['./player-data.component.css']
})
export class PlayerDataComponent implements OnInit {
  
  //Array to store the player objects.
  players:Player[]=[];

  //Player object to be used in forms.
  player:Player={
    p_Jno:0,
    p_Name:"",
    p_Age:0,
    p_Category:""
  };
  
  //Other required variables.
  msg:string="";
  u_msg:string="";
  d_msg:string="";
  e_msg:string="";

  update_id:number=0;
  delete_id:number=0;

  //Injecting Player service inside this component.
  constructor(private obj:PlayerService)
  {
  }

  ngOnInit(): void {
  }
  
  get_api():void
  {
    this.obj.getAllUsers().subscribe(data=>{
      this.players=data;
        console.log(this.players);
    });
  }

  post_api(data:any):void
  {
    this.obj.createUser(data).subscribe(data=>{
    this.msg="Successfully created "+data.p_Name;
    //Logging the response received from web api.
    console.log(data);
    })
  }

  put_api(id:number,data:any):void
  {
    this.obj.updateUser(id,data).subscribe(data=>{
      this.u_msg="Successfully updated player with jersey "+id;
      console.log(data);
    })
   

  }

  delete_api(id:number):void
  {
    this.obj.deleteUser(id).subscribe(data=>{
      this.d_msg="Successfully deleted player with jersey "+id;
      console.log(data);
    })
    
  }

  error_api():void
  {
  
    this.obj.register().subscribe((data)=>{
    console.log(data);
    },
    (error)=>{
    this.e_msg=error;
    }
    );
  }

  }
