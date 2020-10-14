import { Component, OnInit } from '@angular/core';
//
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [
  ]
})
export class AccountSettingComponent implements OnInit {
 
  constructor(private settingService:SettingService) { }

  ngOnInit(): void {

  this.settingService.checkCurrentTheme();
    
  }

  changeTeme( teme:string ){

    this.settingService.changeTeme(teme);

  }

}
