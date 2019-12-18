import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toaster-component',
  templateUrl: './toaster-component.component.html',
  styleUrls: ['./toaster-component.component.scss']
})
export class ToasterComponentComponent implements OnInit {

  constructor(private toastr: ToastrService) { }


  ngOnInit() {
  }

  showToaster() {
    this.toastr.success('Success Message from toaster', 'Success', {
      timeOut: 2000
    });
}

}
