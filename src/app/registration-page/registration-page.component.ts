import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  pageForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ) { }

  ngOnInit(): void {
    // Элементы управления для формы с помощью FormBuilder
    this.pageForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required], this.validationService.userValidator.bind(this.validationService)],
      password: ['', Validators.compose([Validators.required, this.validationService.passwordValidator()])],
    });
  }

  // Геттер возвращает элементы управления формы
  get pageFormControl() {
    return this.pageForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.pageForm.valid) {
      alert('Регистрация прошла успешно');
      console.log(this.pageForm.value);
    } else {
      alert('Ошибка!')
    }
  }

}
