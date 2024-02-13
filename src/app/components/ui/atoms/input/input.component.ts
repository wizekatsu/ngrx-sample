import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input({ required: false })
  label = ''
  
  @Input({required:true})
  value = ''
  
  @Input({required:false})
  errors: string[] = []
  
  @Output()
  input = new EventEmitter<string>()
  
  onChangeInput(event: InputEvent): void{
    this.input.emit(event.data ?? '')
  }
}
