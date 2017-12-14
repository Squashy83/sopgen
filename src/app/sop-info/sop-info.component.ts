import { PdfManagerService } from './../_services/pdf-manager.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-sop-info',
    templateUrl: './sop-info.component.html',
    styleUrls: ['./sop-info.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SopInfoComponent implements OnInit {

    sop = {};

    sopForm: FormGroup;

    formErrors = {
        'code': '',
        'title': '',
        'background': '',
        'purpose': '',
        'responsability': ''
    };

    validationMessages = {
        'code': {},
        'title': {},
        'background': {},
        'purpose': {},
        'responsability': {}
    };


    constructor(private http: HttpClient,
        private router: Router,
        private fb: FormBuilder,
        private translate: TranslateService,
        private pdfManager: PdfManagerService) {
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }

    ngOnInit() {
        this.setupValidationMessages();
        if (this.pdfManager.pdfStructure)
            this.buildForm(undefined);
        else this.buildForm('reload');
    }

    buildForm(reload: any) {
        if (reload) {
            this.sopForm = this.fb.group({
                'code': [''],
                'title': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
                'background': ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
                'purpose': ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
                'responsability': ['', [Validators.required]]
            });
        } else {
            this.sopForm = this.fb.group({
                'code': [this.pdfManager.pdfStructure.code],
                'title': [this.pdfManager.pdfStructure.title, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
                'background': [this.pdfManager.pdfStructure.background, [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
                'purpose': [this.pdfManager.pdfStructure.purpose, [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
                'responsability': [this.pdfManager.pdfStructure.responsability, [Validators.required]]
            });
        }
        this.sopForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    setupValidationMessages() {
        this.translate.get('VALIDATION_MESSAGES').subscribe((mes: string) => {
            this.validationMessages.code['required'] = mes['CODE']['REQUIRED'];

            this.validationMessages.title['required'] = mes['TITLE']['REQUIRED'];
            this.validationMessages.title['minlength'] = mes['TITLE']['MIN_LENGTH'];
            this.validationMessages.title['maxlength'] = mes['TITLE']['MAX_LENGTH'];

            this.validationMessages.background['required'] = mes['BACKGROUND']['REQUIRED'];
            this.validationMessages.background['minlength'] = mes['BACKGROUND']['MIN_LENGTH'];
            this.validationMessages.background['maxlength'] = mes['BACKGROUND']['MAX_LENGTH'];

            this.validationMessages.purpose['required'] = mes['PURPOSE']['REQUIRED'];
            this.validationMessages.purpose['minlength'] = mes['PURPOSE']['MIN_LENGTH'];
            this.validationMessages.purpose['maxlength'] = mes['PURPOSE']['MAX_LENGTH'];

            this.validationMessages.responsability['required'] = mes['RESPONSABILITY']['REQUIRED'];
        });
    }

    onValueChanged(data?: any) {
        if (!this.sopForm) { return; }

        const form = this.sopForm;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                this.formErrors[field] = '';
                const control = form.get(field);

                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const chiave in control.errors) {
                        if (control.errors.hasOwnProperty(chiave)) {
                            this.formErrors[field] += messages[chiave] + ' ';
                        }
                    }
                }
            }
        }
    }

    // onCheckForm(): string {
    //     let fieldMessageErrors = null;
    //     if (!this.sopForm) { return; }

    //     const form = this.sopForm;
    //     for (const field in this.formErrors) {
    //         if (this.formErrors.hasOwnProperty(field)) {
    //             this.formErrors[field] = '';
    //             const control = form.get(field);

    //             if (control && !control.valid) {
    //                 const messages = this.validationMessages[field];
    //                 for (const chiave in control.errors) {
    //                     if (control.errors.hasOwnProperty(chiave)) {
    //                         this.formErrors[field] += messages[chiave] + ' ';
    //                     }
    //                 }
    //                 // ASSIGN FIRST ERROR
    //                 if (!fieldMessageErrors) {
    //                     fieldMessageErrors = this.formErrors[field];
    //                 }
    //             }
    //         }
    //     }
    //     return fieldMessageErrors;
    // }

    saveGeneralInfo() {

        if (this.sopForm.valid) {

            const dataToSave = this.sopForm.value;
            if (this.pdfManager.pdfStructure) {
                this.pdfManager.pdfStructure.code = dataToSave.code;
                this.pdfManager.pdfStructure.title = dataToSave.title;
                this.pdfManager.pdfStructure.background = dataToSave.background;
                this.pdfManager.pdfStructure.purpose = dataToSave.purpose;
                this.pdfManager.pdfStructure.responsability = dataToSave.responsability;
            } else {
                let pdf = {
                    'code': dataToSave.code,
                    'title': dataToSave.title,
                    'background': dataToSave.background,
                    'description': dataToSave.description,
                    'purpose': dataToSave.purpose,
                    'responsability': dataToSave.responsability
                };

                this.pdfManager.pdfStructure = pdf;
            }

            this.router.navigate(['/sop-steps']);

            /*this.http.post('/sop', this.sop)
            .subscribe(res => {
              const id = res['_id'];
            }, (err) => {
              console.log(err);
            }
            ); */
        }
        // else {
        //     this.onCheckForm();
        // }
    }

    onSubmit() {
        this.saveGeneralInfo();
    }
}