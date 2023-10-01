import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://open.er-api.com/v6/latest/gel")
     .subscribe((data:any) => {
      for(let i in data.rates) {
        this.allCurrencies.push(i)
        this.selectValue = this.allCurrencies[0]
        this.targetValue = this.allCurrencies[1]
      }
     })
  }

  allCurrencies:any[] = []
  selectValue:string = ""
  targetValue:string = ""
  convertedValue:any = ""
  amount:string = ""

  convert() {
    this.http.get(`https://open.er-api.com/v6/latest/${this.selectValue}`)
     .subscribe((data:any) => {
      console.log(data.rates)
      this.convertedValue = Number(this.amount) * data.rates[`${this.targetValue}`]
      console.log(this.convertedValue)
     })
  }
  title = 'currency-conventer';

  swap() {
    const helper = this.selectValue
    this.selectValue = this.targetValue
    this.targetValue = helper
    this.convertedValue = ""
  }
}
