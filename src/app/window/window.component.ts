import { Component, TemplateRef, WritableSignal, signal } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-window',
  standalone: true,
  templateUrl: './window.component.html',
  styleUrl: './window.component.css',
  imports: [NgbDatepickerModule],
})
export class WindowComponent {
  constructor (private modalService: NgbModal) {};
  closeResult: WritableSignal<string> = signal('');

  open(content: TemplateRef<any>) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult.set(`Closed with: ${result}`);
        },
        (reason) => {
          this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
        },
      );
    }

    private getDismissReason(reason: any): string {
      switch (reason) {
        case ModalDismissReasons.ESC:
          return 'by pressing ESC';
        case ModalDismissReasons.BACKDROP_CLICK:
          return 'by clicking on a backdrop';
        default:
          return `with: ${reason}`;
      }
    }
}
