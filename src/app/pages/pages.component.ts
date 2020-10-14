import { Component, OnInit } from '@angular/core';
//
import { SettingService } from '../services/setting.service';

declare function  customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

   public year= new Date().getFullYear();
   //
  constructor(private settingService:SettingService) { }

  ngOnInit(): void {
    customInitFunction();
  }

}
